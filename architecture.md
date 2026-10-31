# System Architecture & Technical Specification

**Project:** Elyuzar Fazlurrahman - Personal Portfolio (Windows 7 Aero Edition)  
**Location:** `D:\Programming\portfolio`  
**Date of Document:** March 2026  
**Status:** Production Ready  

---

## 1. Executive Summary & Design Vision

The portfolio is an interactive Single Page Application (SPA) designed for **Elyuzar Fazlurrahman**, an Informatics student at UPN Veteran Yogyakarta focusing on backend engineering, mobile development, and data systems.

The project is built on an authentic **Windows 7 Aero Glass & Frutiger Aero (2006-2009)** operating system simulation. Rather than presenting a generic modern scroll-feed with repeated glass cards, every page is an independent route rendered using a unique native Windows 7 application metaphor:
1. **Home (`/`)**: Windows 7 "Getting Started" Welcome Center + Sticky Note Gadget + Windows Media Player ambient strip.
2. **About (`/about`)**: System Properties panel with Windows Experience Index (subscores out of 7.9) and Computer name/domain configuration.
3. **Skills (`/skills`)**: Windows Control Panel in Category view with switchable sortable Details list view.
4. **Projects (`/projects`)**: Windows Explorer folder with Content / Details / Icons view switcher and collapsible Preview Pane (Alt+P).
5. **Project Detail (`/projects/:slug`)**: Windows File Properties dialog with General, Tech Stack, Links & Source, and Engineering Details tabs.
6. **Experience (`/experience`)**: Windows Event Viewer with application/system event logs table, filter buttons, and XML view details pane.
7. **Education (`/education`)**: Windows Documents Library with Arrange by header, document file entries, and Institution Properties dialog.
8. **Certifications (`/certifications`)**: Certificates Manager (`certmgr.msc`) with cryptographic properties and authentic Certificate viewer dialog.
9. **Contact (`/contact`)**: Windows Live Mail compose window with live sending progress bar and Address Book contact card.
10. **404 Not Found (`*`)**: Classic "Windows cannot find..." warning dialog with system icon and recovery buttons.

---

## 2. Technology Stack & Dependencies

### 2.1 Core Runtime & Libraries
| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **UI Framework** | [React](https://react.dev/) | `^19.2.6` | Component model, state hooks, and virtual DOM |
| **Routing** | [React Router DOM](https://reactrouter.com/) | `^7.x` | Client-side routing, route params, history stack |
| **DOM Renderer** | [ReactDOM](https://react.dev/) | `^19.2.6` | Client DOM mounting and reconciliation |
| **Bundler & Dev Server** | [Vite](https://vite.dev/) | `^8.0.12` | ESM bundling, code splitting, HMR development |
| **CSS Engine** | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.1` | Utility engine integrated via `@tailwindcss/vite` |
| **Animation Engine** | [Framer Motion](https://www.framer.com/motion/) | `^12.40.0` | Route fade/scale transitions, window minimize/restore |
| **Icon Libraries** | [React Icons](https://react-icons.github.io/react-icons/) | `^5.6.0` | Feather glyphs used for line icons |
| **Linting & Code Standards** | [ESLint](https://eslint.org/) | `^10.3.0` | Flat configuration, React Hooks rules |

### 2.2 Containerization & Production Server
| Component | Technology | Purpose |
|---|---|---|
| **Build Container** | `node:22-alpine` | Multi-stage builder compiling assets via `npm run build` |
| **Web Server** | `nginx:alpine` | Static server with SPA fallback (`try_files $uri $uri/ /index.html`) |
| **Orchestration** | Docker Compose | Container port forwarding (Host `3000:80`) |

---

## 3. High-Level Architecture Diagram

```
+----------------------------------------------------------------------------------------------------+
|                                    WINDOWS 7 DESKTOP ENVIRONMENT                                   |
|                                                                                                    |
|  [Desktop Wallpaper: aero-wallpaper.png]                                                            |
|                                                                                                    |
|  +---------------------------+    +-------------------------------------------------------------+  |
|  | Desktop Shortcut Icons    |    | AeroAtmosphere Ambient Nature Layer (transform/opacity only)|  |
|  | - Computer (/)            |    | - 12 Rising bubbles with specular radial shine & wobble      |  |
|  | - Elyuzar (/about)        |    | - Tropical fish swimming across depths with tail wiggles    |  |
|  | - Projects (/projects)    |    | - Drifting leaves, fluttering butterflies, light ray aurora |  |
|  | - Elyuzar_CV (PDF)        |    | - Occasional water drop ripples                             |  |
|  | - GitHub (Web link)       |    +-------------------------------------------------------------+  |
|  | - Recycle Bin             |                                                                     |
|  +---------------------------+    +-------------------------------------------------------------+  |
|                                   | Overlays & Floating Dialogs                                 |  |
|                                   | - Windows 7 Start Menu (Start Orb toggle)                   |  |
|                                   | - Windows Security Close Dialog                             |  |
|                                   | - Right-Click Desktop / Window Context Menu                 |  |
|                                   +-------------------------------------------------------------+  |
|                                                                                                    |
|  +==============================================================================================+  |
|  | MAIN WINDOW SHELL (Permanent Mount: <WindowFrame />)                                         |  |
|  |----------------------------------------------------------------------------------------------|  |
|  | TITLE BAR: Icon, Route Title, Specular Cursor Shine, [_] Min, [O] Max, [X] Close             |  |
|  |----------------------------------------------------------------------------------------------|  |
|  | MENU BAR: File (Alt+F) | Home | About | Skills | Projects | Experience | Education | Contact   |  |
|  |----------------------------------------------------------------------------------------------|  |
|  | TOOLBAR: [◀ Back] [▶ Forward] | Address Bar (C:\Users\Elyuzar\...) | [Search Input]          |  |
|  |----------------------------------------------------------------------------------------------|  |
|  | COMMAND BAR: Organize ▾ | Share with ▾ | Path indicator                                      |  |
|  |----------------------------------------------------------------------------------------------|  |
|  | WORKSPACE (Split Container):                                                                 |  |
|  |   +-----------------------+  +------------------------------------------------------------+  |  |
|  |   | Navigation Pane       |  | Content Viewport (<Routes> + <Suspense> with Win7 Bar)     |  |  |
|  |   | - Favorites           |  |                                                            |  |  |
|  |   | - Libraries           |  |  /              -> Home (Getting Started + Gadgets)        |  |  |
|  |   | - Computer (C:\...)   |  |  /about         -> About (System Properties + WEI)         |  |  |
|  |   | - Network             |  |  /skills        -> Skills (Control Panel Category/Details) |  |  |
|  |   |                       |  |  /projects      -> Projects (Explorer + Preview Pane)      |  |  |
|  |   | (Collapsible toggle)  |  |  /projects/:id  -> ProjectDetail (Properties Dialog)       |  |  |
|  |   |                       |  |  /experience    -> Experience (Event Viewer Logs)          |  |  |
|  |   |                       |  |  /education     -> Education (Documents Library)           |  |  |
|  |   |                       |  |  /certifications-> Certifications (certmgr.msc)           |  |  |
|  |   |                       |  |  /contact       -> Contact (Windows Live Mail)             |  |  |
|  |   |                       |  |  *              -> NotFound (Windows Can't Find Dialog)    |  |  |
|  |   +-----------------------+  +------------------------------------------------------------+  |  |
|  |----------------------------------------------------------------------------------------------|  |
|  | DETAILS PANE: Item metadata, Location status, Ready indicator                                |  |
|  |----------------------------------------------------------------------------------------------|  |
|  | STATUS BAR: Local Intranet | 100%, Developer Copyright Year                                  |  |
|  +==============================================================================================+  |
|                                                                                                    |
|  +==============================================================================================+  |
|  | WINDOWS 7 TASKBAR / SUPERBAR (<Taskbar />)                                                   |  |
|  | [Start Orb] | [Active Tab: Route Tab + Flash Pulse + Radial Cursor Light] | Tray, Clock, Peek|  |
|  +==============================================================================================+  |
+----------------------------------------------------------------------------------------------------+
```

---

## 4. Directory & Module Structure

```
portfolio/
├── Dockerfile                     # Multi-stage production container
├── docker-compose.yml             # Local port binding (3000:80)
├── nginx.conf                     # Nginx config with Gzip, immutable cache, SPA fallback
├── package.json                   # Project manifest (react-router-dom added)
├── index.html                     # HTML5 entry with Open Sans / Segoe UI font load
├── vite.config.js                 # Vite configuration
│
├── public/                        # Static files served directly
│   ├── aero-wallpaper.png         # Authentic Windows 7 Aurora wallpaper
│   ├── favicon.svg                # Browser tab icon
│   ├── assets/
│   │   └── Elyuzar_CV.pdf         # Resume PDF for direct download
│   └── icons/
│       └── win7/                  # 35 authentic Windows 7 PNG system icons
│           ├── computer.png, userfolder.png, folder.png, document.png, recycle.png, ...
│           └── search.png, info.png, warn.png, refresh.png, flag.png, wifi.png, volume.png
│
└── src/
    ├── main.jsx                   # Entry file wrapping <App /> in <BrowserRouter>
    ├── App.jsx                    # Root desktop environment, icon shortcuts, route rendering
    ├── index.css                  # Aero Glass design system tokens & animation keyframes
    │
    ├── data/                      # Structured data modules (content source of truth)
    │   ├── projects.js            # 4 featured projects with specs, sizes, and narratives
    │   ├── skills.js              # 4 skill categories with familiarity and version specs
    │   ├── experience.js          # Event log entries (PLN Indonesia Power, PKKMB, MMCI)
    │   ├── education.js           # Document entries for UPNVY and High School
    │   ├── certifications.js      # certmgr certificate records with serials & thumbprints
    │   ├── systemInfo.js          # Windows edition, Experience Index ratings, workgroup
    │   └── navigation.js          # Navigation tree hierarchy and route metadata
    │
    ├── components/
    │   ├── VistaIcon.jsx          # Authentic extracted Windows 7 PNG icon renderer
    │   ├── AeroSprite.jsx         # Custom SVG Frutiger Aero vector motifs and tiles
    │   │
    │   ├── aero/                  # Frutiger Aero animation and interaction effects
    │   │   ├── AeroAtmosphere.jsx # Ambient bubbles, aurora, swimming fish, drifting flora
    │   │   ├── GlassSheen.jsx     # Specular glass light sweep on route navigation
    │   │   └── DesktopRipple.jsx  # Water drop expanding ripple on desktop background click
    │   │
    │   └── shell/                 # Windows 7 window chrome and OS shell components
    │       ├── WindowFrame.jsx    # Title bar, menu bar, command bar, details pane, status bar
    │       ├── AddressBar.jsx     # Breadcrumb explorer path, history buttons, search input
    │       ├── NavPane.jsx        # Left explorer tree (Favorites, Libraries, Computer, Network)
    │       ├── Taskbar.jsx        # Superbar tab with radial cursor glow, clock, system tray
    │       ├── StartMenu.jsx      # Flyout Start menu with user tile, programs, and shutdown
    │       ├── CloseDialog.jsx    # Windows Security window close confirmation dialog
    │       └── ContextMenu.jsx    # Windows right-click context menu
    │
    └── pages/                     # Dedicated route pages (each with its own OS metaphor)
        ├── Home.jsx               # Getting Started Center + Sticky Note + Media Player
        ├── About.jsx              # System Properties + Windows Experience Index
        ├── Skills.jsx             # Control Panel Category & Details list views
        ├── Projects.jsx           # Explorer folder with Content / Details / Icons views
        ├── ProjectDetail.jsx      # Properties tabbed dialog for individual project slug
        ├── Experience.jsx         # Event Viewer with logs table and XML details pane
        ├── Education.jsx          # Documents library with file cards and properties modal
        ├── Certifications.jsx     # Certificates store manager with Certificate viewer
        ├── Contact.jsx            # Windows Live Mail compose interface and Address Book
        └── NotFound.jsx           # "Windows cannot find..." 404 warning dialog
```

---

## 5. Navigation, History & Address Bar Engine

The address bar and navigation pane replicate Windows Explorer behavior:

### 5.1 Real Browser Routing
Every section is an independent route:
- `/`: Home
- `/about`: About Me
- `/skills`: Skills
- `/projects`: Projects
- `/projects/:slug`: Project Properties Dialog
- `/experience`: Work Experience
- `/education`: Education
- `/certifications`: Certifications
- `/contact`: Contact
- `*`: 404 Not Found

### 5.2 Breadcrumbs & Address Typing
- The address bar displays breadcrumb segments:  
  `Computer > Local Disk (C:) > Users > Elyuzar > [Current Page]`
- Each breadcrumb segment is clickable and navigates to the corresponding parent directory.
- Clicking the address bar turns it into an editable text field displaying the Windows path (e.g., `C:\Users\Elyuzar\Projects`).
- Typing a recognized path (such as `system`, `control panel`, `c:\`, `projects`, `mail`) and pressing Enter navigates to the route.
- Typing an invalid path routes to the 404 dialog (`/not-found?path=...`).

### 5.3 History Navigation & Search
- Toolbar `◀` and `▶` buttons trigger `navigate(-1)` and `navigate(1)`.
- The back button is disabled when `window.history.state.idx === 0`.
- The toolbar search box is route-aware: active for `Projects`, `Skills`, and `Certifications`, filtering items in real time via search params (`?q=...`), and disabled for static pages.

---

## 6. Frutiger Aero Animation System

All atmospheric and interaction animations adhere to performance guidelines (transform and opacity only, no layout shifts):

### 6.1 Ambient Atmosphere (`AeroAtmosphere.jsx`)
- **Rising Bubbles**: 12 SVG bubbles (5 on mobile) with radial gradients and specular highlights rise across the screen with horizontal sine wobbles (`aero-rise`, `aero-wobble`).
- **Aurora Light Rays**: Dual blurred radial gradient layers drifting behind the window (`aero-aurora-drift-1` & `aero-aurora-drift-2`).
- **Swimming Fish**: Tropical fish drifting horizontally across depths, flipping direction at viewport boundaries, with a tail wiggle oscillation (`aero-tail-wiggle`).
- **Drifting Flora**: Leaves and butterflies drifting diagonally across the screen.
- **Mouse Parallax**: Smooth requestAnimationFrame-driven parallax movement of the nature layer following mouse position (capped at 8px).

### 6.2 Interaction Effects
- **Glass Sheen (`GlassSheen.jsx`)**: A diagonal specular highlight sweeps across the window on initial mount and route changes (`aero-sheen-sweep`).
- **Superbar Radial Shine**: Active taskbar button dynamically updates its radial background gradient based on cursor X position within the button.
- **Taskbar Flash Pulse**: Pulsing glow whenever a route navigation occurs.
- **Desktop Click Ripple (`DesktopRipple.jsx`)**: Clicks on the wallpaper create an expanding water ripple ring.
- **Route Loading Bar**: Animated Windows 7 green progress bar inside the address bar during suspenseful route loading.

### 6.3 Performance & Accessibility Guards
- **`prefers-reduced-motion: reduce`**: Disables ambient animations, sweeps, and drifts, falling back to instant state changes.
- **Background Tab Throttling**: Pauses ambient animations when `document.hidden` is true.
- **Window Maximization**: Lowers nature layer opacity to 0.35 and cuts active sprite count in half when maximized.
- **Mobile Capping**: Caps active sprites to 5 on mobile viewports ($\le 640\text{px}$).

---

## 7. Build, Verification & Deployment

### 7.1 Local Verification Commands
```bash
# Lint validation (0 errors, 0 warnings)
npm run lint

# Production build (all routes code-split into distinct chunks)
npm run build

# Preview build locally
npm run preview
```

### 7.2 Docker Deployment
```bash
# Build and run containerized production bundle
docker compose up --build

# Verify web server response
curl -I http://localhost:3000/
curl -I http://localhost:3000/projects/finapp
```

The Nginx configuration ensures all direct deep links (`/projects/finapp`, `/about`, etc.) return `200 OK` via client-side routing fallback.

---

*Specification authored for Elyuzar Fazlurrahman Portfolio Repository.*
