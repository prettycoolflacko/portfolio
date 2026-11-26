# Retro Neo-Brutalist Bento Portfolio — Implementation Plan

## 1. Project Overview
Build a single-page-first, retro neo-brutalist Bento Grid developer portfolio featuring crisp black structural dividers, zero-blur hard offset shadows, subtle paper-grain texture, extruded display typography, and tactile micro-interactions.

### Core Tech Stack
- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (tactile button press, infinite marquee, modal transitions)
- **Icons**: `lucide-react` + `simple-icons` (or custom crisp SVGs for the tool badges)
- **Package Manager / Runtime**: Bun (or npm/pnpm)
- **Deployment Target**: Standalone Next.js build (Docker-ready or Vercel)

---

## 2. Design System & Tokens

### Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--bg-cream` | `#F5F0E6` | Primary canvas, hero cell, neutral cards |
| `--ink-black` | `#111111` | Borders (2px–3px), text, hard offset shadows |
| `--accent-red` | `#D94B43` | Headline highlight, service card, starburst icon |
| `--accent-blue` | `#8FD3E8` | Headline highlight, service cards, starburst icon |
| `--accent-yellow` | `#F5DB82` | CTA button, status pill, marquee banner, service card |
| `--accent-peach` | `#F4B3A4` | Scalloped tool badges, View More button, service card |

### Typography (Google Fonts via `next/font/google`)
- **Display Headings**: `Archivo Black` or `Syne` (800) — All caps, tight tracking.
- **UI / Labels / Buttons**: `Space Grotesk` (700) — All caps, wide tracking (`0.04em`).
- **Body / Code Details**: `JetBrains Mono` (500) — Optional for project modals & tech tags.

### Key Custom CSS Utilities (`globals.css`)
- **Extruded Retro Text (`.text-extruded`)**:
  - `-webkit-text-stroke: 2px #111111;`
  - `text-shadow: 3px 3px 0px #111111;`
  - `paint-order: stroke fill;` (ensures stroke stays cleanly outside the fill)
- **Hard Offset Shadows**:
  - `.brutal-shadow`: `box-shadow: 4px 4px 0px #111111;`
  - `.brutal-shadow-sm`: `box-shadow: 2.5px 2.5px 0px #111111;`
  - Active/Click State: `transform: translate(2px, 2px); box-shadow: 1px 1px 0px #111111;`
- **Subtle Vintage Paper Grain**:
  - Fixed pseudo-element overlay using inline SVG `<feTurbulence>` noise at `3%–4%` opacity (`pointer-events: none`).

---

## 3. Bento Layout & Component Architecture

> **Border Trick**: Instead of managing overlapping borders on individual cells, wrap the outer Bento frame in `bg-[#111111] p-[2px]` and use `gap-[2px]` between CSS Grid cells (with each cell having `bg-[#F5F0E6]` or its accent fill). This guarantees razor-sharp, uniform 2px dividers across all screen sizes with zero doubled borders.

### Outer Shell
- Centered max-width container (`max-w-[1280px] mx-auto my-4 md:my-8`), framed with thick outer black border (`border-[3px] border-[#111111]`).

### Row 1: `TopNav` (Full Width)
- **Left**: `44×44px` square avatar photo in a bordered box with `.brutal-shadow-sm`.
- **Center**: 3 minimalist icon links (Home, About, Work) with crisp active indicator or hover lift.
- **Right**: Yellow CTA button (`* LET'S TALK *`) flanked by 8-point asterisk SVGs, bordered with `.brutal-shadow-sm`. Triggers Contact Modal or scrolls/copies email.

### Row 2: Middle Bento Band (Desktop: 12-col grid -> Left 7 cols / Right 5 cols)
- **Left Cell (`HeroSection`)**:
  - Eyebrow: `HELLO. I'M [YOUR NAME]` (bold uppercase).
  - Extruded Display H1 (2 lines):
    - Line 1: `FULL-STACK` (`#FFFFFF`) + `ENGINEER` (`#D94B43`) *(customize role text)*
    - Line 2: `&` (`#FFFFFF`) + `DEVELOPER` (`#8FD3E8`)
  - Subheadline: 2-line uppercase positioning statement (e.g., *"BUILDING SCALABLE WEB APPS, MOBILE EXPERIENCES & SELF-HOSTED SYSTEMS."*).
  - Bottom Row (Flex `justify-between items-center mt-8`):
    - Left: 4 square social icon buttons (GitHub, LinkedIn, X/Instagram, Email), `40×40px`, cream fill, `.brutal-shadow-sm`.
    - Right: Status badge (`* READY TO WORK *`), yellow fill, `.brutal-shadow-sm`.
- **Right Column (Sub-grid stacked vertically with 2px black divider)**:
  - **Top Sub-cell (`ToolsSection`)**:
    - Extruded white heading: `TOOLS`.
    - Row of 5 custom SVG **scalloped/flower-badge** circles (`#F4B3A4` fill, `2px` black stroke) holding monochrome stack icons (e.g., Next.js, TypeScript, Python, Flutter, Docker).
    - Hover behavior: Slight rotation (`rotate-6`), shadow pop, and floating neo-brutalist tooltip showing the tool name.
  - **Bottom Sub-cell (`MarqueeBanner`)**:
    - Full-bleed butter yellow (`#F5DB82`) background.
    - Seamless infinite horizontal marquee: `PERSONAL PORTFOLIO` separated by alternating 8-point starburst SVGs in Peach, Blue, and Red.

### Row 3: Bottom Bento Band (Desktop: 12-col grid -> Left 5 cols / Right 7 cols)
- **Left Cell (`ServicesSection`)**:
  - Extruded white heading: `SERVICES` (or `CAPABILITIES`).
  - `2×3` grid of chunky rectangular cards (`min-h-[76px]`, centered bold uppercase text, `2px` border, `.brutal-shadow-sm`).
  - Color sequence matching the retro balance:
    1. `WEB DEVELOPMENT` (`#8FD3E8` Blue)
    2. `BACKEND & APIS` (`#F5DB82` Yellow)
    3. `MOBILE APPS` (`#D94B43` Red)
    4. `UI/UX DESIGN` (`#8FD3E8` Blue)
    5. `CLOUD & DEVOPS` (`#F4B3A4` Peach)
    6. `AI & IOT SYSTEMS` (`#F5F0E6` Cream)
- **Right Cell (`WorkSection`)**:
  - Extruded white heading: `WORK`.
  - Horizontal scroll-snap track (`overflow-x-auto snap-x`) displaying 3.3 cards on desktop so the 4th card intentionally peeks off the right edge to signal scrollability.
  - Each card: Crisp aspect ratio (`3:4` or `4:5`), project thumbnail, subtle hover overlay with project title + tech pills, clicking opens a retro-styled **Project Detail Modal**.
  - Bottom Right Footer: Peach CTA button (`VIEW MORE`, `#F4B3A4`) with `.brutal-shadow-sm` linking to `/work` or expanding the full archive drawer.

### Interactive Modals (Keep the Bento Frame Clean)
- **`ProjectModal`**: Displays full project summary, role, tech stack tags, GitHub/Live links, and screenshots inside a thick-bordered cream window.
- **`AboutModal` / Drawer**: Triggered by the center User icon in `TopNav` (bio, experience timeline, education).
- **`ContactModal`**: Triggered by `* LET'S TALK *` (quick contact form + one-click copy email button).

### Responsive Rules
- **Desktop (`>= 1024px`)**: Exact 3-band asymmetric Bento Grid matching the template.
- **Tablet (`768px – 1023px`)**: Hero full-width, Tools + Marquee split 2-col below it, Services + Work stacked.
- **Mobile (`< 768px`)**: Single-column stack maintaining the uniform `2px` black dividers, horizontal swipe on Work cards, compact extruded font sizing via `clamp()`.

---

## 4. Folder Structure
```text
src/
├── app/
│   ├── layout.tsx          # Google Fonts + Paper Grain overlay + Metadata
│   ├── page.tsx            # Main Bento Grid assembly
│   ├── work/page.tsx       # Full project archive view (for "VIEW MORE")
│   └── globals.css         # CSS vars, .text-extruded, .brutal-shadow, marquee keyframes
├── components/
│   ├── bento/
│   │   ├── TopNav.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ToolsSection.tsx
│   │   ├── MarqueeBanner.tsx
│   │   ├── ServicesSection.tsx
│   │   └── WorkSection.tsx
│   ├── ui/
│   │   ├── BrutalButton.tsx
│   │   ├── ScallopedBadge.tsx  # Custom SVG scalloped/flower container
│   │   └── StarburstIcon.tsx   # 8-point retro asterisk SVG
│   └── modals/
│       ├── ProjectModal.tsx
│       ├── AboutModal.tsx
│       └── ContactModal.tsx
├── data/
│   └── portfolio.ts        # Single source of truth for bio, tools, services, projects
└── public/
    └── images/             # Avatar + project thumbnails