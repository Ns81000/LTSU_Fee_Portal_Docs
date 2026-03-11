<div align="center">

# LTSU Fee Portal -- Documentation Site

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Pages](https://img.shields.io/badge/Pages-12-C9A84C?style=for-the-badge)](#documentation-pages)

**Comprehensive technical documentation for the LTSU Fee Management System**

Built for **Lamrin Tech Skills University Punjab**

---

</div>

## About

A fully static, responsive, 12-page documentation website covering every aspect of the LTSU Fee Portal -- from architecture and database schema to security practices and API references. Supports **light and dark themes** with a single click.

## Documentation Pages

| # | Page | Description |
|---|------|-------------|
| 01 | **Overview** | Project introduction, tech stack, and feature summary |
| 02 | **Architecture** | System design, component hierarchy, and data flow |
| 03 | **Database Schema** | All 10 Supabase tables, relationships, triggers, and indexes |
| 04 | **Authentication** | Supabase Auth integration, role-based access, and session handling |
| 05 | **Admin Panel** | User management, bulk operations, and activity logging |
| 06 | **Dashboard** | Role-specific views, statistics, and data visualisation |
| 07 | **Student Form** | Fee submission workflow, validation, and receipt generation |
| 08 | **Email System** | EmailJS integration, templates, and notification triggers |
| 09 | **Security** | RLS policies, input sanitisation, and rate limiting |
| 10 | **Deployment** | Vercel hosting, environment variables, and CI/CD |
| 11 | **Components** | Reusable UI components and design patterns |
| 12 | **API Reference** | Supabase client methods, queries, and mutations |

## Features

- **Fully Responsive** -- Adapts seamlessly from 360px phones to ultrawide monitors
- **Dark / Light Mode** -- Toggle between themes; preference saved to localStorage
- **Markdown Export** -- Download any single page as `.md` or all 12 pages as a ZIP
- **Fast & Lightweight** -- Zero frameworks, pure HTML/CSS/JS with Google Fonts
- **Accessible Navigation** -- Keyboard-friendly sidebar with mobile hamburger menu

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5, semantic elements |
| Styling | CSS3 custom properties, CSS Grid, Flexbox |
| Scripting | Vanilla JavaScript (ES5-compatible) |
| Fonts | Playfair Display, DM Sans, JetBrains Mono |
| ZIP Export | JSZip 3.10 via CDN |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Ns81000/LTSU_Fee_Portal_Docs.git

# Open in browser -- no build step required
start index.html
```

Or serve locally with any static server:

```bash
npx serve .
```

## Project Repository

The main LTSU Fee Portal application lives here:

[![GitHub](https://img.shields.io/badge/LTSU_Fee_Portal-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ns81000/LTSU_Fee_Portal.git)

## Project Structure

```
ltsu-fee-portal-docs/
  css/
    style.css          # Global styles, dark mode, responsive breakpoints
  js/
    script.js          # Theme toggle, sidebar, markdown/ZIP export
  index.html           # Overview page
  architecture.html    # Architecture page
  database.html        # Database Schema page
  authentication.html  # Authentication page
  admin.html           # Admin Panel page
  dashboard.html       # Dashboard page
  student-form.html    # Student Form page
  email.html           # Email System page
  security.html        # Security page
  deployment.html      # Deployment page
  components.html      # Components page
  api.html             # API Reference page
```

---

<div align="center">

**Lamrin Tech Skills University Punjab**

Built with care for the LTSU Fee Portal project.

</div>
