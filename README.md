<div align="center">

# Open Source Portfolio

**A fully configurable, multilingual portfolio platform for developers, students, and creatives.**
Fork it. Edit two files. Deploy. Done.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![Portfolio Preview](public/images/preview.png)

</div>

---

## Table of Contents

- [What is this?](#what-is-this)
- [Features](#features)
- [Sections](#sections)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Configuration Guide](#configuration-guide)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Reporting Issues](#reporting-issues)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## What is this?

A portfolio platform built so that **anyone** — student, developer, designer — can have a professional, multilingual portfolio without touching component code.

Two files control everything:

| File | What it does |
|---|---|
| `src/config/portfolio.config.ts` | Structure — images, URLs, skills, colors, social links |
| `messages/en.json`, `de.json`, `fr.json` | Text — everything visitors read, in each language |

---

## Features

- **Multilingual (DE / EN / FR)** — locale switcher in navbar, instant client-side switching (no page reload)
- **Dark / Light Mode** — smooth transition, respects system preference
- **Linux Terminal Hero** — animated typing effect with your real name
- **Image Carousels** — multiple images per project or About section
- **Video Modal** — embed YouTube or Vimeo videos per project
- **Skills with logos** — powered by [Simple Icons](https://simpleicons.org) CDN
- **Contact Form** — sends directly to your email via EmailJS (no backend needed)
- **Smooth scroll navigation** — anchor links with animated scrolling
- **Fully responsive** — mobile-first, hamburger menu on small screens
- **CV protection modal** — visitors are redirected to contact form instead of a public download
- **Reusable components** — `Modal`, `Carousel`, `Tag`, `SectionHeader`, `SocialIcons`, `ReadMoreButton`

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Terminal animation, profile image, social icons, CV button |
| **About** | Image carousel, bio text, contact & hire buttons |
| **Skills** | Categorized skills with logos, star rating and percentage |
| **Timeline** | Work & education history with cards, images and links |
| **Portfolio** | Projects with image carousel, GitHub, Live Demo and Video links |
| **Contact** | Form that sends directly to your email via EmailJS |
| **Footer** | Logo, rotating taglines, social icons, phone & email |

---

## Tech Stack

- **[Next.js 16](https://nextjs.org)** — React framework with App Router
- **[TypeScript](https://www.typescriptlang.org)** — Type safety throughout
- **[Tailwind CSS 4](https://tailwindcss.com)** — Utility-first styling
- **Client-side i18n** — Custom `LocaleProvider` with instant language switching (DE / EN / FR)
- **[EmailJS](https://emailjs.com)** — Contact form without a backend
- **[React Icons](https://react-icons.github.io/react-icons)** — Icon library
- **[Simple Icons CDN](https://simpleicons.org)** — Technology logos for skills

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm v9 or higher

```bash
node -v
npm -v
```

### 1. Fork & Clone

```bash
# Fork this repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/auriol-portfolio.git
cd auriol-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and add your [EmailJS](https://emailjs.com) credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Don't have EmailJS?** See the [Configuration Guide](CONFIGURATION.md#setting-up-emailjs).

### 4. Configure Your Portfolio

Two files to edit:

```bash
# 1. Structure (images, URLs, skills, colors)
code src/config/portfolio.config.ts

# 2. Text content (all visible text, in each language)
code messages/en.json
code messages/de.json
code messages/fr.json
```

> For detailed configuration instructions, see the **[Configuration Guide](CONFIGURATION.md)**.

### 5. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — your portfolio is live locally!

---

## Configuration Guide

All configuration documentation has been moved to **[CONFIGURATION.md](CONFIGURATION.md)** for clarity. It covers:

- Personal info, social links, navbar
- Adding timeline entries and projects
- Skills, theme colors, contact form
- Internationalization (i18n) and adding new languages
- Setting up EmailJS

---

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) > **New Project** > import your repo
3. Add your environment variables (from `.env.local`) in the Vercel dashboard
4. Click **Deploy** — your portfolio is live in seconds!

### Other Platforms

```bash
npm run build
npm start
```

Works on **Netlify**, **Railway**, **Render**, or any Node.js hosting.

---

## Project Structure

```
auriol-portfolio/
|
|-- messages/
|   |-- en.json              <- English text (all visible content)
|   |-- de.json              <- German text
|   |-- fr.json              <- French text
|
|-- src/
|   |-- app/
|   |   |-- page.tsx         <- assembles all sections
|   |   |-- layout.tsx       <- root layout, theme injection, providers
|   |   |-- globals.css      <- global styles, CSS variables, utility classes
|   |
|   |-- components/
|   |   |-- Navbar.tsx       <- fixed nav, locale switcher, dark mode toggle, hamburger
|   |   |-- Hero.tsx         <- terminal animation + profile image
|   |   |-- About.tsx        <- image carousel + bio
|   |   |-- Skills.tsx       <- categorized skills with logos & stars
|   |   |-- Timeline.tsx     <- work/education cards
|   |   |-- Portfolio.tsx    <- project cards with carousel & video modal
|   |   |-- Contact.tsx      <- EmailJS contact form
|   |   |-- Footer.tsx       <- tagline carousel, social icons
|   |   |-- Modal.tsx        <- reusable modal (videos, descriptions)
|   |   |-- Carousel.tsx     <- image carousel with auto-advance & dots
|   |   |-- TextCarousel.tsx <- animated text rotation (footer taglines)
|   |   |-- Tag.tsx          <- pill tag component
|   |   |-- SectionHeader.tsx<- reusable section title block
|   |   |-- SocialIcons.tsx  <- dynamic social icons from config
|   |   |-- ReadMoreButton.tsx <- "Read more" trigger
|   |   |-- ThemeProvider.tsx<- dark/light mode state management
|   |   |-- LocaleProvider.tsx <- i18n context (locale state + translations)
|   |
|   |-- config/
|       |-- portfolio.config.ts <- structure: images, URLs, skills, colors
|
|-- public/
|   |-- images/              <- your photos (profile, about, projects, timeline)
|   |-- cv/                  <- your CV as PDF
|   |-- logos/               <- custom skill logos (optional)
|
|-- CONFIGURATION.md         <- detailed configuration & i18n guide
|-- .env.local               <- your EmailJS keys (never commit this!)
|-- .env.example             <- template for env variables
|-- next.config.ts           <- Next.js config + image domains
```

---

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit: `git commit -m "Add: your feature description"`
5. Push: `git push origin feature/your-feature-name`
6. Open a Pull Request

Please keep PRs focused — one feature or fix per PR.

---

## Reporting Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/auriol00/auriol-portfolio/issues) and describe:
- What you expected to happen
- What actually happened
- Steps to reproduce

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this project for personal or commercial use.

---

## Acknowledgements

Built with love using:
- [Next.js](https://nextjs.org) by Vercel
- [Tailwind CSS](https://tailwindcss.com)
- [Simple Icons](https://simpleicons.org)
- [React Icons](https://react-icons.github.io/react-icons)
- [EmailJS](https://emailjs.com)

---

<div align="center">

Made with love by [Auriol](https://github.com/auriol00)

If this project helped you, give it a star!

</div>
