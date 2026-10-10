# Abhishek Dahal - Personal Portfolio

A clean, lightweight, accessible personal portfolio website built with **[Eleventy (11ty)](https://www.11ty.dev/)** and plain CSS, configured for automated static deployment via **GitHub Actions** to **GitHub Pages**.

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites & Installation](#prerequisites--installation)
3. [Running Locally](#running-locally)
4. [Editing Personal Information & Background](#editing-personal-information--background)
5. [Managing Projects](#managing-projects)
   - [How to Add a New Project](#how-to-add-a-new-project)
   - [Copyable Example Markdown File](#copyable-example-markdown-file)
   - [Adding or Replacing Project Images](#adding-or-replacing-project-images)
   - [Presenting Confidential Projects](#presenting-confidential-projects)
   - [Hiding or Removing a Project](#hiding-or-removing-a-project)
6. [Building & Previewing for Production](#building--previewing-for-production)
7. [GitHub Pages Deployment & Base Path Configuration](#github-pages-deployment--base-path-configuration)
   - [Personal Root Site (`username.github.io`)](#1-personal-root-site-usernamegithubio)
   - [Project Repository (`username.github.io/repository-name/`)](#2-project-repository-usernamegithubiorepository-name)
   - [Automated Workflow Details](#automated-workflow-details)
8. [Troubleshooting & Broken Link Prevention](#troubleshooting--broken-link-prevention)
9. [Project File Structure](#project-file-structure)

---

## Features

- **Zero Heavy Frameworks:** Built with native HTML, Nunjucks, and vanilla CSS. Fast load times and tiny bundle footprint.
- **Content Decoupled from Code:** All biography details, skills, experience, and contact links live in `src/_data/site.json`. Projects are individual Markdown files in `src/projects/`.
- **Responsive & Accessible:** Fluid layouts, semantic HTML5 tags, high-contrast readable typography, keyboard navigation, and `prefers-color-scheme` dark mode support.
- **Fail-Safe Images:** If a thumbnail image is missing, the card displays a clean fallback rather than a broken image icon.
- **GitHub Pages Subpath Ready:** Powered by Eleventy's `HtmlBasePlugin` and configurable `PATH_PREFIX`, ensuring internal navigation, CSS, and images resolve correctly whether hosted at the domain root or under a subfolder.

---

## Prerequisites & Installation

### Prerequisites
- **Node.js** (v18, v20, or newer recommended). Verify with:
  ```bash
  node -v
  npm -v
  ```
- **Git**

### Installation
Clone your repository and install the minimal developer dependencies:

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
npm install
```

---

## Running Locally

To start the local development server with live reload:

```bash
npm run dev
```

By default, Eleventy serves the site locally at:
```
http://localhost:8080/
```

Any edits you make to templates in `src/`, markdown files in `src/projects/`, stylesheets in `src/assets/css/`, or data in `src/_data/site.json` will trigger an automatic browser reload.

---

## Editing Personal Information & Background

**You do not need to edit HTML templates to change your personal details.**

Open `src/_data/site.json`:

```json
{
  "name": "Abhishek Dahal",
  "title": "Web Developer & Digital Solutions Specialist",
  "author": {
    "name": "Abhishek Dahal",
    "email": "abhishekdahal464@gmail.com",
    "phone": "07833498993",
    "location": "London, UK (Open to relocate)",
    "linkedIn": "https://linkedin.com/in/abhishekdahal464/",
    "github": "https://github.com/abhishekdahal464"
  },
  "intro": {
    "lead": "I build, maintain, and optimize practical, reliable web experiences.",
    "sub": "..."
  }
}
```

- **Contact links:** Update `"email"`, `"linkedIn"`, or `"github"`.
- **Intro text:** Update the `"lead"` and `"sub"` fields under `"intro"`.
- **Skills list:** Edit the `"skills"` array. Categories and individual skill badges will update across both the homepage and about page automatically.
- **Work experience & education:** Edit the `"experience"` and `"education"` arrays.

---

## Managing Projects

### How to Add a New Project

1. Create a new `.md` file inside `src/projects/` (e.g. `src/projects/my-new-website.md`).
2. Add front matter headers at the top of the file enclosed between `---` lines.
3. Write your case study content in standard Markdown below the header.
4. Save the file. Eleventy will automatically generate:
   - A card on the `/projects/` page.
   - An entry in the homepage "Featured Projects" list (if `featured: true`).
   - A dedicated detail page at `/projects/my-new-website/`.

### Copyable Example Markdown File

```markdown
---
title: "Modern Non-Profit Website & Donation Flow"
description: "Redesign of community organization portal with accessible navigation, donor forms, and performance optimization."
date: 2025-02-15
featured: true
order: 1
role: "Frontend Developer"
status: "Completed"
confidential: false
thumbnail: "/assets/images/projects/non-profit-preview.jpg"
thumbnailAlt: "Screenshot of the non-profit organization homepage"
technologies:
  - "WordPress"
  - "PHP"
  - "SCSS"
  - "JavaScript"
  - "Figma"
liveUrl: "https://example.org"
sourceUrl: "https://github.com/your-username/nonprofit-theme"
---

### Project Overview
A comprehensive overview describing what the project is, who it was for, and the general scope of work.

### Context & Problem
Describe the original challenge, legacy bottlenecks, or user needs that prompted the project.

### My Role & Responsibilities
- Built responsive page layouts from Figma mockups.
- Implemented accessible keyboard navigation and WCAG AA color contrast.
- Configured hosting and DNS cutover on Linode with zero downtime.

### Approach & Implementation
Explain the technical architecture, custom plugins or theme structure, and how you ensured cross-browser compatibility.

### Outcome & Impact
Highlight the tangible results: faster page speeds, positive stakeholder feedback, or simplified content workflows.
```

### Adding or Replacing Project Images

1. Place your image file (PNG, JPG, WebP, or SVG) in:
   ```
   src/assets/images/projects/
   ```
2. In your project Markdown front matter, reference it with an absolute root path:
   ```yaml
   thumbnail: "/assets/images/projects/my-image.webp"
   thumbnailAlt: "Short description for screen readers"
   ```
3. Recommended aspect ratio is **16:10** or **16:9** (e.g. 800x500px or 1200x750px) for optimal display on card grids and detail pages.

> **Image Fallback Note:** If an image cannot be found or the `thumbnail` property is omitted, the card automatically displays a clean fallback badge rather than a broken image link.

### Presenting Confidential Projects

If a client project is non-public or subject to NDA:
1. Set `confidential: true` in the front matter.
2. Omit `liveUrl` and `sourceUrl` (or leave them blank).
3. The card and detail page will display a distinct **Confidential** badge and omit any external links, while still highlighting your technical role, responsibilities, and sanitised screenshots.

### Hiding or Removing a Project

- **To remove completely:** Delete the `.md` file from `src/projects/`.
- **To unfeature from Homepage:** Change `featured: true` to `featured: false`. It will still appear on the main `/projects/` archive.
- **To draft / hide temporarily:** In Eleventy, you can add `eleventyExcludeFromCollections: true` to the front matter or set `permalink: false`.

---

## Building & Previewing for Production

To run a static production build:

```bash
npm run build
```

This compiles all pages and copies assets into the `_site/` directory.

To preview the build with Eleventy's local web server:

```bash
npm run serve
```

---

## GitHub Pages Deployment & Base Path Configuration

This project includes a production-ready GitHub Actions workflow in [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml).

### 1. Personal Root Site (`username.github.io`)
If your GitHub repository is named `<username>.github.io`:
- GitHub Pages publishes your site directly at the root: `https://<username>.github.io/`.
- The workflow automatically detects that the repository name matches `<username>.github.io` and builds with `PATH_PREFIX="/"`.
- No configuration needed!

### 2. Project Repository (`username.github.io/repository-name/`)
If your GitHub repository has any other name (such as `personal-portfolio`):
- GitHub Pages publishes the site under a subfolder: `https://<username>.github.io/<repository-name>/`.
- The GitHub Actions workflow in `.github/workflows/deploy.yml` automatically extracts the repository name and sets:
  ```bash
  export PATH_PREFIX="/<repository-name>/"
  ```
- Eleventy's built-in `HtmlBasePlugin` automatically adjusts all internal links, navigation menus, CSS stylesheets, images, and project pages so nothing breaks!

### 3. Enabling GitHub Pages in Your Repository Settings
1. Go to your repository on GitHub.
2. Click **Settings** &rarr; **Pages** (under "Code and automation").
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. Push your code to the `main` branch:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```
5. Click the **Actions** tab in GitHub to watch your automated deployment succeed. Your live site URL will be displayed in the workflow summary.

---

## Troubleshooting & Broken Link Prevention

| Issue | Cause | Fix |
|---|---|---|
| **Styles or images fail to load on GitHub Pages** | Site deployed under a subpath without `PATH_PREFIX` | Ensure you selected **GitHub Actions** under repository Settings &rarr; Pages. The included workflow handles `PATH_PREFIX` automatically. |
| **Doubled URL prefix (`/repo/repo/`)** | Manually adding the repo name inside template paths | Always use root paths like `href="/projects/"` or `src="/assets/..."`. Eleventy's `HtmlBasePlugin` handles the prefixing for you. |
| **Card image shows fallback** | Typo in image path or image file missing in `src/assets/images/projects/` | Check that your image file exists in `src/assets/images/projects/` and the filename in front matter matches exact casing. |
| **Project does not show on Homepage** | `featured: true` is missing in front matter | Add `featured: true` to the project's Markdown header. |

---

## Project File Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages deployment workflow
├── src/
│   ├── _data/
│   │   └── site.json           # Central site data, biography, skills & links
│   ├── _includes/
│   │   ├── components/
│   │   │   ├── footer.njk      # Reusable footer with social links & copyright
│   │   │   ├── header.njk      # Reusable header with responsive navigation
│   │   │   └── project-card.njk# Project card with tags, links & fallback image
│   │   └── layouts/
│   │       ├── base.njk        # HTML5 layout shell, metadata, CSS & script tags
│   │       ├── page.njk        # Page layout for text-focused pages
│   │       └── project.njk     # Project case study detail template
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css       # Clean, accessible responsive styles (Plain CSS)
│   │   ├── images/
│   │   │   └── projects/       # Project thumbnails and case study media
│   │   └── js/
│   │       └── main.js         # Minimal accessible mobile menu toggle
│   ├── projects/
│   │   ├── projects.json       # Directory data (sets layout & permalink)
│   │   ├── cloud-infrastructure-management.md # Sample confidential project
│   │   ├── corporate-webflow-site.md          # Sample Webflow project
│   │   └── ecommerce-store-redesign.md        # Sample WooCommerce project
│   ├── about.njk               # About page (bio, skills, experience, education)
│   ├── contact.njk             # Contact page (email, LinkedIn, GitHub)
│   ├── index.njk               # Homepage (intro, featured projects, highlights)
│   └── projects.njk            # Projects archive grid
├── .gitignore                  # Ignores _site/, node_modules/, etc.
├── eleventy.config.js          # Eleventy 3 config with HtmlBasePlugin & filters
├── package.json                # npm scripts (dev, build, serve)
└── README.md                   # Full documentation
```
