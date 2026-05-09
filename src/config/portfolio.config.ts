// ╔══════════════════════════════════════════════════════════════════╗
// ║  PORTFOLIO CONFIGURATION                                       ║
// ║                                                                ║
// ║  Two files to edit:                                            ║
// ║    1. THIS FILE — structure (images, URLs, skills, colors)     ║
// ║    2. messages/*.json — all visible text (DE / EN / FR)        ║
// ║                                                                ║
// ║  When you add a new timeline entry or project here, also add   ║
// ║  its text in each messages/<lang>.json under the matching id.  ║
// ║                                                                ║
// ║  Images go in the /public folder.                              ║
// ╚══════════════════════════════════════════════════════════════════╝

type Video = { title: string; url: string; duration: string };

const portfolioConfig = {

  // ============================================
  // 0. LANGUAGE
  // ============================================
  // defaultLocale → The language your config content is written in.
  //                 Must match one of: "de", "en", "fr"
  //                 This controls which language visitors see by default.
  defaultLocale: "en" as const,

  // ============================================
  // 1. PERSONAL INFO
  // ============================================
  // name         → Displayed in the header, footer and terminal (same across languages)
  // profileImage → Path relative to /public (e.g. "/images/profile.jpg")
  // cv           → Path to the resume PDF in /public (e.g. "/cv/my-cv.pdf")
  //
  // TRANSLATABLE FIELDS → edit in messages/*.json under "hero":
  //   "hero": {
  //     "role": "Developer · Designer · Student",
  //     "hobbies": "Cycling · Coding · Music · Travel",
  //     "profileImageAlt": "Your Name - Developer & Student",
  //     "bio": "Short description for SEO meta tags."
  //   }
  //
  // Also edit "footer.taglines" in messages/*.json:
  //   "footer": { "taglines": ["Quote 1", "Quote 2", "Quote 3"] }

  name: "Auriol Sopning Tiotsop",
  profileImage: "/images/profile.png",
  cv: "/cv/auriol-sopning-tiotsop-cv.pdf",

  // ============================================
  // 2. SOCIAL LINKS
  // ============================================
  // name → Icon name from Simple Icons (https://simpleicons.org)
  //         Examples: "github", "linkedin", "x", "instagram", "facebook",
  //                   "youtube", "tiktok", "dribbble", "behance"
  // url  → Your profile link. Leave empty ("") to hide the icon.
  // logo → Custom icon URL (optional). Used as fallback if Simple Icons fails.
  //         Leave empty ("") to use Simple Icons.
  //
  // Add a new platform? Just append a new object to the array:
  //   { name: "youtube", url: "https://youtube.com/@yourchannel", logo: "" },

  social: [
    { name: "github", url: "https://github.com/auriol00", logo: "" },
    { name: "linkedin", url: "https://www.linkedin.com/in/auriol-sopning-tiotsop-1a94a5319/", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg" },
  ],

  // ============================================
  // 3. NAVBAR
  // ============================================
  // sections → Which sections to show in the nav, and in what order.
  //            Labels come from the translation files (messages/*.json → "nav").
  //
  // Change order? Just rearrange the strings.
  // Remove a section? Delete it from the array.
  //
  // TRANSLATABLE LABELS → edit in messages/*.json under "nav":
  //   "nav": {
  //     "hero": "Profile",
  //     "about": "About",
  //     "skills": "Skills",
  //     "timeline": "Resume",
  //     "portfolio": "Portfolio",
  //     "contact": "Contact"
  //   }

  navbar: {
    sections: ["hero", "about", "skills", "timeline", "portfolio", "contact"],
  },

  // ============================================
  // 4. ABOUT ME
  // ============================================
  // images → Array of images (carousel). At least 1 image.
  //          Place images in /public/images/.
  //
  // TRANSLATABLE FIELDS → edit in messages/*.json under "about":
  //   "about": {
  //     "subtitle": "Who am I",
  //     "title": "About me",
  //     "cta": "Contact me",
  //     "hire": "Hire me",
  //     "alt": "Photo of you",
  //     "text": "Your about-me paragraph goes here..."
  //   }

  about: {
    images: [
      "/images/about-1.png", // local — place your own image in /public/images/
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80", // online — laptop with code
    ],
  },

  // ============================================
  // 5. SKILLS
  // ============================================
  // Organized in categories. Each category has an ID, a label and items.
  //
  // Add a new category:
  //   { id: "my-category", label: "My Area", items: [...] }
  //
  // Per skill:
  //   name    → Name of the skill
  //   stars   → Rating 1-5 (1 = beginner, 5 = expert)
  //   percent → Percentage 0-100 (displayed as a number)
  //   icon    → Simple Icons name (https://simpleicons.org), e.g. "react", "python"
  //             Leave empty ("") if no icon is available — the first 2 letters
  //             of the name will be used as a placeholder.
  //   logo    → Path to a custom logo in /public (e.g. "/images/skills/my-logo.png")
  //             Takes priority over icon. Leave empty ("") to use icon.

  skills: {
    categories: [
      {
        id: "frontend",
        label: "Frontend",
        items: [
          { name: "Angular", stars: 3, percent: 60, icon: "angular", logo: "" },
          { name: "React", stars: 3, percent: 60, icon: "react", logo: "" },
          { name: "HTML/CSS", stars: 4, percent: 85, icon: "html5", logo: "" },
          { name: "JavaScript", stars: 4, percent: 80, icon: "javascript", logo: "" },
          { name: "TypeScript", stars: 4, percent: 80, icon: "typescript", logo: "" },
        ],
      },
      {
        id: "backend",
        label: "Backend",
        items: [
          { name: "Node.js", stars: 3, percent: 45, icon: "nodedotjs", logo: "" },
          { name: "FastAPI", stars: 4, percent: 75, icon: "fastapi", logo: "" },
          { name: "Python", stars: 4, percent: 75, icon: "python", logo: "" },
          { name: "Java", stars: 3, percent: 45, icon: "openjdk", logo: "" },
          { name: "C/C++", stars: 4, percent: 75, icon: "cplusplus", logo: "" },
        ],
      },
      {
        id: "databases",
        label: "Databases",
        items: [
          { name: "PostgreSQL", stars: 4, percent: 75, icon: "postgresql", logo: "" },
          { name: "MongoDB", stars: 4, percent: 70, icon: "mongodb", logo: "" },
          { name: "Firebase", stars: 3, percent: 50, icon: "firebase", logo: "" },
        ],
      },
      {
        id: "devops",
        label: "DevOps & Tools",
        items: [
          { name: "Git", stars: 4, percent: 80, icon: "git", logo: "" },
          { name: "Docker", stars: 3, percent: 60, icon: "docker", logo: "" },
          { name: "Linux", stars: 4, percent: 75, icon: "linux", logo: "" },
          { name: "Azure", stars: 3, percent: 55, icon: "microsoftazure", logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftazure.svg" },
          { name: "Figma", stars: 4, percent: 80, icon: "figma", logo: "" },
        ],
      },
    ],
  },

  // ============================================
  // 6. RESUME (Timeline)
  // ============================================
  // Each entry is a card in the timeline section.
  //
  //   id          → Sequential number (displayed as a badge). Must match key in translations.
  //   companyUrl  → Link to the company (optional — leave empty "" for no link)
  //   image       → Image for the card in /public (e.g. "/images/timeline/job.jpg")
  //   tags        → Array of keywords (e.g. ["React", "Node.js"])
  //
  // TRANSLATABLE FIELDS → for each entry, add to messages/*.json under "timeline.items.<id>":
  //   "timeline": {
  //     "subtitle": "My journey",
  //     "title": "Resume",
  //     "items": {
  //       "1": {
  //         "type": "Education",
  //         "title": "Bachelor in Computer Science",
  //         "company": "Your University",
  //         "date": "2021 – present",
  //         "description": "Describe your studies and achievements."
  //       },
  //       "2": { ... }   ← add a new key matching the id below
  //     }
  //   }

  timeline: [
    {
      id: 1,
      companyUrl: "https://www.hs-worms.de",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      tags: ["Linux", "Shell", "RegExp", "Teaching"],
    },
    {
      id: 2,
      companyUrl: "https://www.hacker-school.de",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
      tags: ["Python", "HTML/CSS", "MakeCode", "Volunteering"],
    },
    {
      id: 3,
      companyUrl: "https://www.hs-worms.de",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      tags: ["Software Engineering", "Cloud Computing", "Networks", "IT Security"],
    },
    {
      id: 4,
      companyUrl: "",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
      tags: ["Abitur", "GPA 1.5"],
    },
  ],

  // ============================================
  // 7. PORTFOLIO PROJECTS
  // ============================================
  // Each project is displayed as a large block with image and description.
  //
  //   id      → Sequential number. Must match key in translations.
  //   images  → Array of screenshots (carousel). At least 1 image.
  //   tags    → Technologies as keywords
  //   github  → Link to GitHub repo (optional — leave empty "")
  //   live    → Link to live demo (optional — leave empty "")
  //   videos  → Array of videos (optional — empty array [] if none)
  //             Each video: { title: "Title", url: "YouTube/Vimeo URL", duration: "3:42" }
  //
  // TRANSLATABLE FIELDS → for each project, add to messages/*.json under "portfolio.items.<id>":
  //   "portfolio": {
  //     "subtitle": "My work",
  //     "title": "Portfolio",
  //     ...
  //     "items": {
  //       "1": {
  //         "type": "Web App",
  //         "title": "My Project",
  //         "description": "What does it do? What problem does it solve?"
  //       },
  //       "2": { ... }   ← add a new key matching the id below
  //     }
  //   }

  projects: [
    {
      id: 1,
      images: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      ],
      tags: ["Python", "FastAPI", "PostgreSQL", "React", "Docker", "Keycloak"],
      github: "https://github.com/auriol00/Fullstack_Projekt",
      live: "https://wormshub.it.hs-worms.de",
      videos: [
        { title: "Rick Astley - Never Gonna Give You Up", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: "3:33" },
        { title: "Toto - Africa", url: "https://www.youtube.com/watch?v=FTQbiNvZqaY", duration: "4:35" },
        { title: "a-ha - Take On Me", url: "https://www.youtube.com/watch?v=djV11Xbc914", duration: "3:48" },
      ],
    },
    {
      id: 2,
      images: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      ],
      tags: ["Node.js", "Azure AD", "OAuth 2.0", "JWT", "RBAC"],
      github: "https://github.com/auriol00/API-sicherheit-Projekt",
      live: "",
      videos: [] as Video[],
    },
    {
      id: 3,
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      ],
      tags: ["Angular", "Node.js", "Express", "MongoDB", "REST API"],
      github: "https://github.com/auriol00/Fullstack_Projekt",
      live: "",
      videos: [] as Video[],
    },
    {
      id: 4,
      images: [
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      ],
      tags: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore"],
      github: "https://github.com/auriol00/EMA_projekt-Flutter-",
      live: "",
      videos: [] as Video[],
    },
    {
      id: 5,
      images: [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      ],
      tags: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/auriol00/Mintopia.github.io",
      live: "https://auriol00.github.io/Mintopia.github.io/",
      videos: [
        { title: "Queen - Bohemian Rhapsody", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ", duration: "5:55" },
      ],
    },
    {
      id: 6,
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      ],
      tags: ["Python", "PostgreSQL", "Docker", "Airflow", "ETL"],
      github: "https://github.com/auriol00/Data_Engineering_ETL",
      live: "",
      videos: [] as Video[],
    },
  ],

  // ============================================
  // 8. CONTACT
  // ============================================
  // email → Displayed in the footer and as fallback in the contact form
  // phone → Displayed in the footer (optional — leave empty "")
  //
  // TRANSLATABLE LABELS → edit in messages/*.json under "contact":
  //   "contact": {
  //     "subtitle": "Get in touch",
  //     "title": "Contact",
  //     "name": "Name",
  //     "email": "Email address",
  //     "message": "Message",
  //     "send": "Send message",
  //     "sending": "Sending...",
  //     "successTitle": "Message sent!",
  //     "successText": "I'll get back to you as soon as possible.",
  //     "newMessage": "Write a new message",
  //     "errorText": "Something went wrong. Please try again or email me directly at"
  //   }

  contact: {
    email: "sopninga@gmail.com",
    phone: "+49 176 36768625",
  },

  // ============================================
  // 9. COLORS / THEME
  // ============================================
  // primary   → Accent color (buttons, links, highlights)
  // secondary → Secondary color (tags, social icons, alternative buttons)
  //
  // light / dark → Colors for each mode.
  // The user can switch between light and dark mode (toggle in the navbar).
  //
  //   background          → Main page background
  //   backgroundSecondary → Background for alternating sections
  //   foreground          → Main text color
  //   foregroundSecondary → Secondary text color (subtitles, labels, descriptions)
  //   border              → Border color for cards, inputs, dividers
  //   card                → Background for cards (timeline, skills, modal)
  //
  // Tip: Use a tool like https://coolors.co to find matching color palettes.

  theme: {
    primary: "#E07B39",
    secondary: "#1E3A5F",

    light: {
      background: "#ffffff",
      backgroundSecondary: "#f9fafb",
      foreground: "#1E3A5F",
      foregroundSecondary: "#6b7280",
      border: "#e5e7eb",
      card: "#ffffff",
    },

    dark: {
      background: "#0F2035",
      backgroundSecondary: "#0F2035",
      foreground: "#F1F5F9",
      foregroundSecondary: "#94A3B8",
      border: "#2A4A6F",
      card: "#1E3A5F",
    },
  },
};

export default portfolioConfig;
export type PortfolioConfig = typeof portfolioConfig;
