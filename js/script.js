/* ===== LTSU Fee Portal Documentation — Main Script ===== */

/* --- Theme initialisation (runs before IIFE to prevent flash) --- */
(function initTheme() {
  var saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  /* Light mode is the default — no automatic dark mode detection */
})();

(function () {
  'use strict';

  /* --- Theme toggle --- */
  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', toggleTheme);
  });

  /* Listen for OS theme changes */
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  /* --- Mobile Sidebar Toggle --- */
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const hamburger = document.querySelector('.hamburger');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });

  /* --- Active nav highlight --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  sidebarLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- Smooth anchor scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', this.getAttribute('href'));
      }
    });
  });

  /* --- Markdown generation from page content --- */
  function htmlToMarkdown(container) {
    var md = '';
    var nodes = container.querySelectorAll('h1, h2, h3, h4, p, ul, ol, pre, table, .callout, .flow-diagram');

    nodes.forEach(function (node) {
      if (node.closest('.toc') || node.closest('.download-bar')) return;

      var tag = node.tagName.toLowerCase();

      if (tag === 'h1') {
        md += '# ' + node.textContent.trim() + '\n\n';
      } else if (tag === 'h2') {
        md += '## ' + node.textContent.trim() + '\n\n';
      } else if (tag === 'h3') {
        md += '### ' + node.textContent.trim() + '\n\n';
      } else if (tag === 'h4') {
        md += '#### ' + node.textContent.trim() + '\n\n';
      } else if (tag === 'p') {
        var text = node.innerHTML;
        text = text.replace(/<code>(.*?)<\/code>/g, '`$1`');
        text = text.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
        text = text.replace(/<em>(.*?)<\/em>/g, '*$1*');
        text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)');
        text = text.replace(/<[^>]+>/g, '');
        md += text.trim() + '\n\n';
      } else if (tag === 'ul') {
        node.querySelectorAll(':scope > li').forEach(function (li) {
          var liText = li.innerHTML;
          liText = liText.replace(/<code>(.*?)<\/code>/g, '`$1`');
          liText = liText.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
          liText = liText.replace(/<[^>]+>/g, '');
          md += '- ' + liText.trim() + '\n';
        });
        md += '\n';
      } else if (tag === 'ol') {
        var idx = 1;
        node.querySelectorAll(':scope > li').forEach(function (li) {
          var liText = li.innerHTML;
          liText = liText.replace(/<code>(.*?)<\/code>/g, '`$1`');
          liText = liText.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
          liText = liText.replace(/<[^>]+>/g, '');
          md += idx + '. ' + liText.trim() + '\n';
          idx++;
        });
        md += '\n';
      } else if (tag === 'pre') {
        var code = node.querySelector('code');
        var text = code ? code.textContent : node.textContent;
        md += '```\n' + text.trim() + '\n```\n\n';
      } else if (tag === 'table') {
        var rows = node.querySelectorAll('tr');
        rows.forEach(function (row, ri) {
          var cells = row.querySelectorAll('th, td');
          var line = '|';
          cells.forEach(function (cell) {
            line += ' ' + cell.textContent.trim() + ' |';
          });
          md += line + '\n';
          if (ri === 0) {
            var sep = '|';
            cells.forEach(function () {
              sep += ' --- |';
            });
            md += sep + '\n';
          }
        });
        md += '\n';
      } else if (node.classList.contains('callout')) {
        var titleEl = node.querySelector('.callout-title');
        var titleText = titleEl ? titleEl.textContent.trim() : 'Note';
        var bodyText = '';
        node.querySelectorAll('p').forEach(function (p) {
          if (!p.classList.contains('callout-title')) {
            bodyText += p.textContent.trim() + ' ';
          }
        });
        md += '> **' + titleText + ':** ' + bodyText.trim() + '\n\n';
      } else if (node.classList.contains('flow-diagram')) {
        var steps = node.querySelectorAll('.flow-step');
        var parts = [];
        steps.forEach(function (s) { parts.push(s.textContent.trim()); });
        md += parts.join(' -> ') + '\n\n';
      }
    });

    return md;
  }

  /* --- Download single page as Markdown --- */
  window.downloadMarkdown = function () {
    var content = document.querySelector('.content-wrapper');
    if (!content) return;

    var pageTitle = document.querySelector('.page-header h1');
    var filename = (pageTitle ? pageTitle.textContent.trim().replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() : 'documentation') + '.md';

    var md = htmlToMarkdown(content);
    var blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /* --- Download ALL documentation as ZIP (uses JSZip) --- */
  window.downloadAllDocs = function () {
    var btn = document.querySelector('.btn-download-all');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Generating ZIP...';
    }

    var pages = [
      { url: 'index.html', name: '01-overview.md' },
      { url: 'architecture.html', name: '02-architecture.md' },
      { url: 'database.html', name: '03-database-schema.md' },
      { url: 'authentication.html', name: '04-authentication.md' },
      { url: 'admin.html', name: '05-admin-panel.md' },
      { url: 'dashboard.html', name: '06-dashboard.md' },
      { url: 'student-form.html', name: '07-student-form.md' },
      { url: 'email.html', name: '08-email-system.md' },
      { url: 'security.html', name: '09-security.md' },
      { url: 'deployment.html', name: '10-deployment.md' },
      { url: 'components.html', name: '11-components.md' },
      { url: 'api.html', name: '12-api-reference.md' }
    ];

    var zip = new JSZip();
    var folder = zip.folder('LTSU-Fee-Portal-Documentation');
    var completed = 0;

    pages.forEach(function (page) {
      fetch(page.url)
        .then(function (res) { return res.text(); })
        .then(function (html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, 'text/html');
          var content = doc.querySelector('.content-wrapper');
          if (content) {
            folder.file(page.name, htmlToMarkdown(content));
          }
          completed++;
          if (completed === pages.length) {
            zip.generateAsync({ type: 'blob' }).then(function (blob) {
              var url = URL.createObjectURL(blob);
              var a = document.createElement('a');
              a.href = url;
              a.download = 'LTSU-Fee-Portal-Documentation.zip';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download All (ZIP)';
              }
            });
          }
        })
        .catch(function () {
          completed++;
        });
    });
  };
})();
