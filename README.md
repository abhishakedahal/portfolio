# Abhishek Dahal - Personal Portfolio

This is my personal portfolio website, designed using **Google Stitch** and built with **[Eleventy (11ty)](https://www.11ty.dev/)** and plain CSS. Configured for automated deployment to **GitHub Pages** via **GitHub Actions**.

---

## Visual Direction & Architecture

- **Editorial Warm Minimalism:** Archival warm off-white canvas (`#FCF9F6`), near-black typography (`#1C1C1A`), hairline rules (`#E6E2DA`), and a restrained cobalt blue accent (`#1A56DB`).
- **Typography:** Architectural pairing of **Newsreader** (editorial serif headlines) and **Inter** (clean functional sans-serif for body, labels, and metadata).
- **True Single-Page Website:** Smooth anchor navigation between `#work`, `#about`, `#experience`, and `#contact`. No separate subpages.
- **Repeatable Data-Driven Projects:** Project cards in the `#work` grid are generated automatically from structured Markdown files in `src/projects/`.
- **Zero Heavy Frameworks:** Pure semantic HTML and Plain CSS with no React, Vue, Tailwind or bulky runtime dependencies.

---

## Table of Contents

1. [Local Development](#local-development)
2. [Updating Content](#updating-content)
   - [Personal Information, Bio & Links](#1-personal-information-bio--links)
   - [Managing Projects](#2-managing-projects)
   - [Adding Project Images](#3-adding-project-images)
3. [Building for Production](#building-for-production)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Project File Structure](#project-file-structure)

---

## Local Development

### Prerequisites
- Node.js (v18, v20, or newer).

### Start the Live Development Server
```bash
npm run dev
```

The site will be available at:
```
http://localhost:8080/
```

Edits to Markdown files, `site.json`, or CSS will immediately trigger a live browser reload.

---

## Updating Content

### 1. Personal Information, Bio & Links

All site-wide copy, skills, and work experience can be edited in a single place without modifying HTML or CSS:

Open `src/_data/site.json`:
- **Wordmark & Title:** `"wordmark"`, `"title"`, `"siteTitle"`
- **Hero Copy:** `"hero.eyebrow"`, `"hero.headline"`, `"hero.lead"`, `"hero.status"`
- **About Text:** `"about.text"`
- **Skills Matrix:** Edit categories and comma-separated items in the `"skills"` array.
- **Experience:** Edit the `"experience"` array (company, role, description).
- **Contact Channels:** `"author.email"`, `"author.linkedIn"`, `"author.github"`

### 2. Managing Projects

Projects live in `src/projects/` as structured Markdown files:
- `01-business-websites.md`
- `02-ecommerce.md`
- `03-content-publishing.md`
- `04-technical-implementation.md`

#### Example Project File:
```markdown
---
title: "Business websites"
description: "Building and maintaining business websites, improving layouts, content and responsive behaviour."
previewUrl: "business-platform.preview"
order: 1
thumbnail: "/assets/images/projects/project-business.png"
thumbnailAlt: "Business website mockup displayed inside browser window"
technologies:
  - "WordPress"
  - "CSS"
liveUrl: "#contact"
liveUrlLabel: "Live Preview ↗"
sourceUrl: "https://github.com/abhishakedahal"
sourceUrlLabel: "Source Code ↗"
---
```

- **Order:** Controls position in the grid (`order: 1` first).
- **Preview URL:** Monospace address text shown in the browser frame bar (e.g. `business-platform.preview`).
- **Links:** Specify `liveUrl`, `sourceUrl`, `caseUrl`, or `archUrl`. Optional links are hidden automatically if omitted.

### 3. Adding Project Images

1. Add your screenshot image (PNG, JPG, SVG, or WebP) into:
   ```
   src/assets/images/projects/
   ```
2. Reference the path in your project's front matter:
   ```yaml
   thumbnail: "/assets/images/projects/my-screenshot.png"
   thumbnailAlt: "Description of screenshot"
   ```
3. If an image is missing or cannot load, the card renders a clean fallback layout automatically.

---

## Building for Production

Compile the production static site into `_site/`:

```bash
npm run build
```

To preview the compiled site locally:

```bash
npm run serve
```

---

## GitHub Pages Deployment

Deployment is completely automated with GitHub Actions ([`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml)).

### Automated Subpath Resolution
Whether hosted at root (`https://username.github.io/`) or as a project repository (`https://username.github.io/portfolio/`), the workflow automatically detects your repository name and sets `PATH_PREFIX`. Eleventy's `HtmlBasePlugin` ensures all asset paths, anchor links, and stylesheets resolve seamlessly.

To deploy:
1. Push your changes to the `main` branch.
2. In GitHub under **Settings** &rarr; **Pages**, make sure the **Source** is set to **GitHub Actions**.

---

## Project File Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages automated deployment workflow
├── src/
│   ├── _data/
│   │   └── site.json           # Central site data, skills, copy & contact channels
│   ├── _includes/
│   │   ├── components/
│   │   │   ├── footer.njk      # Minimal footer with copyright & anchor links
│   │   │   ├── header.njk      # Sticky header with anchor navigation & wordmark
│   │   │   └── project-card.njk# Editorial card with browser mock frame & tags
│   │   └── layouts/
│   │       └── base.njk        # HTML5 layout shell, fonts, SEO & styling
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css       # Warm Editorial Minimalism styling (Plain CSS)
│   │   ├── images/
│   │   │   └── projects/       # High-resolution project mockups & assets
│   │   │       ├── project-business.png
│   │   │       ├── project-ecommerce.png
│   │   │       ├── project-content.png
│   │   │       └── project-infra.png
│   │   └── js/
│   │       └── main.js         # Smooth anchor handling & light interactions
│   ├── projects/
│   │   ├── projects.json       # Configures projects collection without extra pages
│   │   ├── 01-business-websites.md
│   │   ├── 02-ecommerce.md
│   │   ├── 03-content-publishing.md
│   │   └── 04-technical-implementation.md
│   └── index.njk               # The single-page website with all sections
├── eleventy.config.js          # Eleventy 3 config with HtmlBasePlugin & filters
├── package.json                # npm scripts (dev, build, serve)
└── README.md                   # Documentation
```
