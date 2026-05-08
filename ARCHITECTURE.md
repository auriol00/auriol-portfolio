# Architecture & Design Decisions

Technical documentation for contributors and maintainers. Covers the architecture, design decisions, and known issues that were identified and fixed.

---

## Core Architecture

### Config + Translations Split

The portfolio separates **structure** from **text**:

| Layer | File | Contains |
|---|---|---|
| Structure | `src/config/portfolio.config.ts` | Images, URLs, skills, colors, social links, section order |
| Text | `messages/en.json`, `de.json`, `fr.json` | Everything visitors read — titles, descriptions, labels, taglines |

Components merge both at render time. For example, `Timeline.tsx` loops over `portfolioConfig.timeline` for structural data (id, image, tags) and calls `t(`items.${item.id}.title`)` for the translated text.

**Why the split?** A single config file can't support multiple languages. Moving all translatable text to JSON files enables full i18n while keeping the config focused on data that doesn't change between languages (images, URLs, numbers, colors).

### Internationalization (Client-Side LocaleProvider)

Language switching is handled entirely on the client via React context — no URL routing, no middleware, no page reload.

**How it works:**

1. **`LocaleProvider`** (`src/components/LocaleProvider.tsx`) — React context that holds the current locale and all translation messages. All three JSON files (`en.json`, `de.json`, `fr.json`) are imported at build time.
2. **`useTranslations(namespace?)`** — drop-in hook that reads from the context. Supports `t("key")` for strings and `t.raw("key")` for raw values (arrays, objects).
3. **`useLocale()`** / **`useSetLocale()`** — read or change the current locale. Changing locale updates React state, which re-renders all consumers instantly.
4. **Persistence** — the selected locale is saved to `localStorage`. On next visit, the saved preference is restored. The `lang` attribute on `<html>` is updated to match.

**Locale switcher:** A button in the Navbar shows the current locale code with a globe icon and chevron. Clicking opens a dropdown with flags, language names, and a checkmark on the active language. Selecting a language calls `setLocale()` — pure state change, no navigation.

**Why client-side instead of URL-based routing?**

We originally used `next-intl` with URL-based routing (`/en`, `/de`, `/fr`). This caused three problems:
1. **Page flash on locale switch** — changing the `[locale]` URL segment triggered a route change, causing components to unmount/remount with a visible white flash.
2. **Theme hydration conflict** — the route change reset `data-theme` on `<html>`, briefly showing light theme before `useEffect` restored dark mode.
3. **React 19 script warnings** — attempts to fix the flash with inline `<script>` tags in `<head>` triggered React 19's "scripts inside React components are never executed" warning and hydration mismatches.

Client-side state eliminates all three issues. The trade-off (no locale in URL, no per-language SEO) is acceptable for a single-page portfolio.

### Theme System

The theme pipeline has three stages:

1. **Config** (`portfolio.config.ts`) — defines color values for `primary`, `secondary`, `light.*`, and `dark.*`
2. **Layout** (`layout.tsx`) — `generateThemeStyles()` converts config colors into CSS custom properties (e.g. `var(--primary)`) and injects them via a `<style>` tag in `<head>`. This is static HTML, not client JS, which avoids hydration mismatches.
3. **ThemeProvider** (`ThemeProvider.tsx`) — toggles the `data-theme` attribute on `<html>` between `"light"` and `"dark"`, which activates the corresponding CSS variable set.

**Why not React Context for theme?** Theme changes only need to flip a CSS attribute — all components already react to CSS variable changes automatically. A `CustomEvent("theme-change")` on `document` syncs React state across all `useTheme()` consumers without context provider overhead.

### Single-Page Layout

`page.tsx` renders all sections in a vertical stack. The navbar uses anchor links (`#hero`, `#about`, etc.) for smooth scroll navigation. This is intentional — a portfolio is a single narrative, not a multi-page app.

---

## Component Architecture

### Section Components

Each major section (`Hero`, `About`, `Skills`, `Timeline`, `Portfolio`, `Contact`, `Footer`) follows the same pattern:

- Reads structural data from `portfolioConfig` (images, URLs, tags)
- Reads text from `useTranslations()` (titles, descriptions, labels)
- Uses `SectionHeader` for consistent heading blocks
- Uses semantic `<section id="...">` for anchor linking

### Shared Primitives

| Component | Purpose | Used by |
|---|---|---|
| `Carousel` | Image slider with auto-advance, arrows, dots, progress bar | About, Portfolio |
| `Modal` | Overlay for expanded content (ESC/backdrop/X close) | Hero (CV), Portfolio (video, description), Timeline (description) |
| `Tag` | Pill label with `neutral` or `brand` variant | Timeline, Portfolio |
| `SectionHeader` | Subtitle + title + optional description block | All sections |
| `SocialIcons` | Social links with cascading icon fallback | Hero, Footer |
| `ReadMoreButton` | "Read more" trigger for truncated text | Timeline, Portfolio |
| `TextCarousel` | Rotating text with slide animation | Footer (taglines) |
| `LocaleProvider` | React context for i18n — holds locale state and messages | All components |

### Icon Resolution Strategy

Two independent cascading fallback chains exist:

**SocialIcons** (runtime, via `onError`):
1. Simple Icons CDN by `name` (`cdn.simpleicons.org/{name}/white`)
2. Custom `logo` URL from config
3. Hide completely if both fail

**Skills** (declarative, via conditional rendering):
1. Custom `logo` path from config (highest priority)
2. Simple Icons CDN by `icon` name
3. First 2 letters of skill name as text placeholder

**Why two different approaches?** Social icons need runtime fallback because CDN availability can't be predicted at build time. Skills use a simpler conditional chain because the `icon` field is explicit — the user chose it.

---

## Design Decisions

### Zigzag Layout (Portfolio)

Projects alternate image-left / image-right using `direction: rtl` on even-indexed items. This avoids duplicating the grid markup for reversed order — only the CSS reading direction changes, and the content column resets to `direction: ltr`.

### Terminal Animation (Hero)

The terminal types commands character-by-character using recursive `setTimeout`, not `setInterval`. This allows variable timing between different phases (typing at 120ms, pauses at 6000ms, etc.). After the sequence completes, a "clear" command resets the terminal and the loop restarts.

All pending timeouts are tracked in a `timers[]` array and cleared on component unmount to prevent memory leaks. The effect depends on `role` and `hobbies` translation strings — when the locale changes, the terminal restarts with the new language.

### Carousel Timer Reset

Manual navigation (arrows, dots) resets the auto-advance timer by bumping a `resetKey` state variable that's included in the `useEffect` dependency array. This prevents the common bug where clicking an arrow is immediately followed by an auto-advance, causing a disorienting double-slide.

### CSS Variable Injection

Theme colors are injected as a `<style>` block in `<head>` via `dangerouslySetInnerHTML`. This is intentional — the colors come from a trusted config file (not user input), and injecting them server-side avoids a flash of unstyled content (FOUC) that would occur with client-side JS.

### Contact Form (EmailJS)

The contact form uses EmailJS to send emails directly from the browser without a backend. The form follows a state machine pattern (`idle > sending > success | error`). On error, a `mailto:` fallback link is shown so the visitor can still reach the portfolio owner.

### Translation Key Convention

Timeline and project items use their `id` as the translation key: `t(`items.${item.id}.title`)`. This means config IDs must match JSON keys. The convention is sequential integers starting at 1.

Video titles stay in the config (not translated) because they're typically proper names or titles of specific recordings.

### Client-Side Locale Switching

The locale switcher uses `setLocale()` (React state) instead of URL-based routing. This means:
- Switching is instant — no network request, no route change, no flash
- Scroll position is preserved perfectly
- The terminal animation restarts cleanly because `useEffect` depends on the translated `role` and `hobbies` strings

The dropdown design shows flags, full language names, and a checkmark on the active language — more informative than a plain globe icon with two-letter codes.

---

## Adding Content — Checklist

### New Timeline Entry

1. Add to `portfolio.config.ts` > `timeline`:
   ```typescript
   { id: 3, companyUrl: "...", image: "...", tags: [...] }
   ```
2. Add to `messages/en.json` > `timeline.items`:
   ```json
   "3": { "type": "...", "title": "...", "company": "...", "date": "...", "description": "..." }
   ```
3. Repeat step 2 for `de.json` and `fr.json`

### New Project

1. Add to `portfolio.config.ts` > `projects`:
   ```typescript
   { id: 3, images: [...], tags: [...], github: "...", live: "...", videos: [] }
   ```
2. Add to `messages/en.json` > `portfolio.items`:
   ```json
   "3": { "type": "...", "title": "...", "description": "..." }
   ```
3. Repeat step 2 for `de.json` and `fr.json`

### New Language

1. Copy `messages/en.json` to `messages/xx.json` and translate
2. Import the new file in `src/components/LocaleProvider.tsx` and add it to `allMessages`
3. Add the language to the `languages` array in `src/components/Navbar.tsx` (code, flag, label)

---

## Issues Fixed

### 1. Hardcoded Colors

**Problem:** Several components had hex colors hardcoded in inline styles. These would not update when a user changed the theme colors in the config.

**Fix:** Replaced with CSS variables (`var(--primary)`, `var(--foreground-secondary)`, `var(--border)`) or `portfolioConfig.theme.primary` where CSS variables aren't available (e.g. in the Hero terminal's `innerHTML`).

**Files:** `Carousel.tsx`, `Hero.tsx`, `Timeline.tsx`

### 2. Memory Leak in Hero Terminal

**Problem:** The terminal animation used recursive `setTimeout` calls, but the cleanup function only cleared the initial timeout. On fast navigation or React strict mode, old timeouts would continue firing after unmount.

**Fix:** All `setTimeout` calls now go through a `schedule()` helper that pushes timer IDs into a `timers[]` array. The cleanup function iterates and clears all of them.

**File:** `Hero.tsx`

### 3. useTheme Desynchronization

**Problem:** Each component calling `useTheme()` got its own independent `useState`. Toggling the theme in one component wouldn't update others.

**Fix:** `useTheme()` now listens for a `CustomEvent("theme-change")` dispatched on `document`. When any consumer calls `toggleTheme()`, all consumers update simultaneously.

**File:** `ThemeProvider.tsx`

### 4. Carousel Double-Slide

**Problem:** Clicking an arrow or dot would change the slide, but the auto-advance interval was still counting from the original tick, causing two slides to change in rapid succession.

**Fix:** A `resetKey` state variable is included in the `useEffect` dependency array. Manual navigation bumps `resetKey`, which tears down and recreates the interval.

**File:** `Carousel.tsx`

### 5. Hardcoded German UI Strings

**Problem:** Text like "Schreib mir", "Mehr lesen" was hardcoded in component files. Users who wanted a different language had to hunt through every component.

**Fix:** All UI text and content moved to `messages/*.json` translation files. Components use `useTranslations()` hooks from `LocaleProvider`.

**Files:** All components, `messages/*.json`

### 6. German Console Error

**Problem:** `console.error("EmailJS Fehler:", error)` — a German string in runtime code.

**Fix:** Changed to `console.error("EmailJS error:", error)`.

**File:** `Contact.tsx`

### 7. Locale Switch Caused Page Reload / Flash

**Problem:** The original i18n setup used `next-intl` with URL-based locale routing (`/en`, `/de`, `/fr`). Switching languages called `router.replace(pathname, { locale })`, which changed the URL's `[locale]` segment. This triggered a full route change — components unmounted and remounted, causing a visible page flash. Attempts to mitigate with `useTransition` and `scroll: false` reduced the scroll-to-top issue but didn't eliminate the white flash.

**Fix:** Replaced URL-based routing with a client-side `LocaleProvider` (React context). All three message files are imported at build time. Switching locale updates React state — no navigation, no unmounting, no flash. The `next-intl` dependency, `[locale]` dynamic segment, middleware/proxy, and `src/i18n/` directory were all removed.

**Files:** `LocaleProvider.tsx` (new), `Navbar.tsx`, `layout.tsx`, `next.config.ts`, all components (import change)

### 8. Theme Flash on Locale Switch (Dark Mode)

**Problem:** When locale switching triggered a route change (issue #7), the `ThemeProvider` component would unmount and remount. During the brief gap before `useEffect` restored `data-theme="dark"` on `<html>`, CSS fell back to the `:root` (light theme) variables, causing a white flash — even when the user had dark mode active.

**Fix:** Resolved by fixing issue #7 (client-side locale switching). Since components no longer unmount during locale changes, `data-theme` is never removed from `<html>`, and the theme stays consistent.

**Files:** Same as issue #7

### 9. React 19 Inline Script Warnings

**Problem:** To prevent the theme flash (issue #8), we tried injecting an inline `<script>` in `<head>` that would set `data-theme` from `localStorage` before React hydration. React 19 rejected this with two errors:
1. "Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client."
2. Hydration mismatch: server rendered `<html>` without `data-theme`, script added `data-theme="dark"` before hydration → attribute mismatch.

Using `next/script` with `strategy="beforeInteractive"` produced the same warnings. `suppressHydrationWarning` on `<html>` fixed the mismatch warning but not the script execution warning.

**Fix:** Abandoned the inline script approach. The root cause (route-change-on-locale-switch) was fixed by moving to client-side locale switching (issue #7), which eliminated the need for the script entirely. The `ThemeProvider` sets `data-theme` via `useEffect` on mount, and since there's no route change on locale switch, the attribute is never lost.

### 10. Turbopack Cache Corruption

**Problem:** After significant structural changes (renaming/deleting files, moving directories), the Turbopack dev server crashed with `FATAL: An unexpected Turbopack error occurred` and a panic log. This happened twice during the i18n refactoring.

**Fix:** Delete the `.next` directory and restart the dev server:
```bash
rm -rf .next
npm run dev
```

This is a known Turbopack issue — not a code problem. It tends to happen after large file structure changes (moving `page.tsx` between directories, renaming `middleware.ts` to `proxy.ts`, deleting the `[locale]` directory).

### 11. Next.js 16 Middleware Deprecation

**Problem:** Next.js 16 deprecated the `middleware.ts` file convention, showing the warning: "The 'middleware' file convention is deprecated. Please use 'proxy' instead."

**Fix:** Initially renamed `middleware.ts` to `proxy.ts`. Ultimately resolved by removing middleware entirely — client-side locale switching doesn't need server-side language detection.

**File:** `src/middleware.ts` (deleted)

### 12. Terminal Not Clearing on Locale Switch

**Problem:** When the user switched language, the `role` and `hobbies` strings changed, which triggered the Hero terminal's `useEffect` cleanup and re-run. The cleanup cancelled all pending timeouts, but did not clear the terminal's `innerHTML`. The new animation started typing from line 0 on top of the old output — producing duplicated, overlapping text.

**Fix:** Added `if (bodyRef.current) bodyRef.current.innerHTML = "";` to the `useEffect` cleanup function. Now when the locale changes, the terminal wipes its content before the new animation begins.

**File:** `Hero.tsx`
