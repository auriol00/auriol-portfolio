# Configuration Guide

Everything in your portfolio is controlled by two types of files — no component code to touch.

| File | What it does |
|---|---|
| `src/config/portfolio.config.ts` | Structure — images, URLs, skills, colors, social links |
| `messages/en.json`, `de.json`, `fr.json` | Text — everything visitors read, in each language |

---

## Table of Contents

- [How it works](#how-it-works)
- [Setting the Default Language](#setting-the-default-language)
- [Personal Info](#personal-info)
- [About Me](#about-me)
- [Social Links](#social-links)
- [Navbar Sections](#navbar-sections)
- [Adding a New Timeline Entry](#adding-a-new-timeline-entry)
- [Adding a New Project](#adding-a-new-project)
- [Skills](#skills)
- [Colors / Theme](#colors--theme)
- [Contact Form Labels](#contact-form-labels)
- [Hero / CV Modal](#hero--cv-modal)
- [Internationalization (i18n)](#internationalization-i18n)
- [Adding a New Language](#adding-a-new-language)
- [Setting Up EmailJS](#setting-up-emailjs)

---

## How it works

The portfolio separates **structure** (config file) from **text** (translation files):

```
portfolio.config.ts          messages/en.json
====================         ====================
name: "Jane Doe"             "hero": {
profileImage: "/img/me.jpg"    "role": "Developer · Designer",
social: [...]                  "hobbies": "Coding · Music",
                               "bio": "I build things..."
timeline: [                  },
  { id: 1,                  "timeline": {
    image: "/img/uni.jpg",     "items": {
    companyUrl: "...",           "1": {
    tags: ["React"] }              "title": "CS Degree",
]                                  "company": "MIT",
                                   "date": "2021 – present",
projects: [                        "description": "..."
  { id: 1,                      }
    images: [...],             }
    tags: [...],             },
    github: "..." }          "portfolio": {
]                              "items": {
                                 "1": {
theme: {                           "title": "My App",
  primary: "#E07B39",              "description": "..."
  ...                            }
}                              }
                             }
```

The `id` in config matches the key in the JSON. When you add timeline entry `id: 3` in config, add its text under `"timeline.items.3"` in each JSON file.

---

## Setting the Default Language

```typescript
// portfolio.config.ts
defaultLocale: "en" as const, // "de", "en", or "fr"
```

This controls which language visitors see when they first visit your site.

---

## Personal Info

**Config** (same across all languages):
```typescript
name: "Your Name",
profileImage: "/images/profile.png",
cv: "/cv/your-name-cv.pdf",
```

**Translation files** (`messages/en.json` > `hero`):
```json
{
  "hero": {
    "role": "Developer · Designer · Student",
    "hobbies": "Cycling · Coding · Music · Travel",
    "profileImageAlt": "Your Name - Developer & Student",
    "bio": "Short description for SEO meta tags."
  }
}
```

---

**Footer taglines** (`messages/en.json` > `footer`):
```json
{
  "footer": {
    "phone": "Phone",
    "email": "E-Mail",
    "taglines": [
      "Your first motto or quote",
      "Another inspiring saying"
    ]
  }
}
```

---

## About Me

**Config** (images only):
```typescript
about: {
  images: [
    "/images/about-1.jpg",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
  ],
},
```

**Translation files** (`messages/en.json` > `about`):
```json
{
  "about": {
    "subtitle": "Who am I",
    "title": "About me",
    "cta": "Contact me",
    "hire": "Hire me",
    "alt": "Photo of you",
    "text": "Your about-me paragraph goes here. Who are you? What do you do?"
  }
}
```

---

## Social Links

Uses [Simple Icons](https://simpleicons.org) names. Leave `url` empty to hide the icon.
Use `logo` for a custom icon URL if Simple Icons doesn't have it.

```typescript
social: [
  { name: "github", url: "https://github.com/your-username", logo: "" },
  { name: "linkedin", url: "https://linkedin.com/in/you", logo: "" },
  { name: "x", url: "", logo: "" }, // empty url = hidden
],
```

---

## Navbar Sections

```typescript
navbar: {
  sections: ["hero", "about", "skills", "timeline", "portfolio", "contact"],
},
```

Labels come from `messages/*.json` > `nav`:

```json
{
  "nav": {
    "hero": "Profile",
    "about": "About",
    "skills": "Skills",
    "timeline": "Resume",
    "portfolio": "Portfolio",
    "contact": "Contact"
  }
}
```

Reorder or remove sections by editing the array.

---

## Adding a New Timeline Entry

**Step 1** — Add structure to config:
```typescript
// portfolio.config.ts > timeline
{
  id: 2,
  companyUrl: "https://company.com",
  image: "/images/timeline/job.jpg",
  tags: ["React", "Node.js"],
},
```

**Step 2** — Add text to each translation file:
```json
// messages/en.json > timeline.items
"2": {
  "type": "Internship",
  "title": "Frontend Developer",
  "company": "Tech Corp",
  "date": "2023 – 2024",
  "description": "Built dashboards and design systems..."
}
```

```json
// messages/de.json > timeline.items
"2": {
  "type": "Praktikum",
  "title": "Frontend-Entwickler",
  "company": "Tech Corp",
  "date": "2023 – 2024",
  "description": "Dashboards und Design-Systeme entwickelt..."
}
```

Repeat for `messages/fr.json`.

---

## Adding a New Project

**Step 1** — Add structure to config:
```typescript
// portfolio.config.ts > projects
{
  id: 3,
  images: ["/images/projects/project-3.jpg"],
  tags: ["React Native", "Firebase"],
  github: "https://github.com/username/project",
  live: "https://myproject.app",
  videos: [] as Video[],
},
```

**Step 2** — Add text to each translation file:
```json
// messages/en.json > portfolio.items
"3": {
  "type": "Mobile App",
  "title": "My New Project",
  "description": "What does it do? What problem does it solve?"
}
```

Repeat for `de.json` and `fr.json`.

---

## Skills

Skills stay in the config (technical names don't need translation):
```typescript
{ name: "React", stars: 4, percent: 80, icon: "react", logo: "" },
```
Find icon names at [simpleicons.org](https://simpleicons.org). For custom logos, place the file in `/public/logos/` and use the path in `logo`.

The section header labels are in the translation files (`messages/en.json` > `skills`):
```json
{
  "skills": {
    "subtitle": "What I can do",
    "title": "Skills & Tech Stack",
    "description": "1 star = beginner · 5 stars = expert",
    "all": "All"
  }
}
```

---

## Colors / Theme

Edit only `theme` in `portfolio.config.ts`. No CSS files to touch:
```typescript
theme: {
  primary: "#E07B39",   // accent color (buttons, links)
  secondary: "#1E3A5F", // secondary color (tags, icons)
  light: {
    background: "#ffffff",
    // ...
  },
  dark: {
    background: "#0F2035",
    // ...
  },
},
```

---

## Contact Form Labels

The contact email and phone stay in config (same across languages):
```typescript
contact: {
  email: "your-email@example.com",
  phone: "+1 234 567890",
},
```

All form labels, button text, and status messages are in the translation files (`messages/en.json` > `contact`):
```json
{
  "contact": {
    "subtitle": "Get in touch",
    "title": "Contact",
    "name": "Name",
    "email": "Email address",
    "message": "Message",
    "send": "Send message",
    "sending": "Sending...",
    "successTitle": "Message sent!",
    "successText": "I'll get back to you as soon as possible.",
    "newMessage": "Write a new message",
    "errorText": "Something went wrong. Please try again or email me directly at"
  }
}
```

---

## Hero / CV Modal

The CV modal text and button labels are in the translation files (`messages/en.json` > `hero`):
```json
{
  "hero": {
    "cvButton": "Download CV",
    "cvModalTitle": "Request resume",
    "cvModalText": "My resume contains personal data and is not shared publicly...",
    "cvModalCta": "Go to contact form"
  }
}
```

> Note: `role`, `hobbies`, `profileImageAlt`, and `bio` also live under `hero` — see [Personal Info](#personal-info).

---

## Internationalization (i18n)

The portfolio supports **German (DE)**, **English (EN)**, and **French (FR)** out of the box.

### How it works

- **Client-side switching**: Language changes instantly via React state — no page reload, no URL change
- **Locale switcher**: Globe button in the navbar opens a dropdown with flags, language names, and a checkmark
- **Persistence**: Selected language is saved to `localStorage` and restored on next visit
- **Powered by `LocaleProvider`** (`src/components/LocaleProvider.tsx`) — a lightweight React context that holds all translation messages

All three JSON files are imported at build time. When the user switches language, React re-renders all components with the new text. No network request, no navigation.

### Translation files

```
messages/
  en.json   <- English
  de.json   <- German
  fr.json   <- French
```

Each file has the same structure. All visible text — section titles, button labels, project descriptions, timeline entries, taglines — lives here.

### Adding a new language

1. Create `messages/xx.json` (copy `en.json` and translate)
2. Import the new file in `src/components/LocaleProvider.tsx` and add it to `allMessages`:
   ```typescript
   import xx from "../../messages/xx.json";
   const allMessages: Record<Locale, Messages> = { en, de, fr, xx };
   ```
3. Add `"xx"` to the `Locale` type and `locales` array in `LocaleProvider.tsx`
4. Add the language to the `languages` array in `src/components/Navbar.tsx`:
   ```typescript
   { code: "xx", flag: "🇪🇸", label: "Español" },
   ```

---

## Setting Up EmailJS

The contact form sends emails directly from the browser — no backend required.

1. Create a free account at [emailjs.com](https://emailjs.com)
2. Go to **Email Services** > **Add New Service** > choose **Gmail**
3. Connect your Gmail account and click **Create Service** — copy the **Service ID**
4. Go to **Email Templates** > **Create New Template**
   - Use these variables in your template: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Save and copy the **Template ID**
5. Go to **Account** > copy your **Public Key**
6. Paste all three values into your `.env.local` file
