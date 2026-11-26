import {
  siPython,
  siFastapi,
  siFlutter,
  siRedis,
  siLinux,
  siGithub,
} from 'simple-icons';

export interface ProfileInfo {
  name: string;
  firstName: string;
  email: string;
  avatar: string;
  cv: string;
  location: string;
}

export interface SocialItem {
  id: 'github' | 'linkedin' | 'email' | 'cv';
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
  iconPath?: string;
}

export interface HeroWord {
  t: string;
  c: '#FFFFFF' | '#D94B43' | '#8FD3E8';
}

export interface HeroContent {
  eyebrow: string;
  line1: HeroWord[];
  line2: HeroWord[];
  sub: string;
  status: string;
}

export interface ToolItem {
  name: string;
  path: string;
}

export interface ServiceItem {
  title: string;
  color: string;
}

export type SkillCategoryId = 'languages' | 'frameworks' | 'infrastructure' | 'creative';

export interface SkillEntry {
  name: string;
  role: string;
  level: string;
  version: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  shortLabel: string;
  name: string;
  accent: string;
  description: string;
  items: SkillEntry[];
}

export type ProjectCategory = 'MOBILE' | 'BACKEND' | 'SECURITY';

export interface ProjectTechDetail {
  key: string;
  value: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  subtitle: string;
  type: 'Group Project' | 'Solo Project';
  category: ProjectCategory;
  role: string;
  year: string;
  summary: string;
  highlightMetric: string;
  details: string[];
  techDetails: ProjectTechDetail[];
  tags: string[];
  github: string;
  image?: string;
  accent: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  metric: string;
  highlights: string[];
}

export interface CertificationItem {
  friendlyName: string;
  issuer: string;
  year: string;
}

export interface AboutData {
  bio: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
}

export const profile: ProfileInfo = {
  name: 'Elyuzar Fazlurrahman',
  firstName: 'Elyuzar',
  email: 'elyuzar.fazlurrahman@gmail.com',
  avatar: '/assets/elyuzar_profile.jpeg',
  cv: '/assets/Elyuzar_CV.pdf',
  location: 'Yogyakarta, Indonesia',
};

export const socials: SocialItem[] = [
  {
    id: 'github',
    label: 'GitHub profile',
    href: 'https://github.com/prettycoolflacko',
    external: true,
    iconPath: siGithub.path,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn profile',
    href: 'https://linkedin.com/in/elyuzar',
    external: true,
  },
  {
    id: 'email',
    label: 'Send email to Elyuzar',
    href: `mailto:${profile.email}`,
  },
  {
    id: 'cv',
    label: 'Download CV (PDF)',
    href: profile.cv,
    download: true,
  },
];

export const hero: HeroContent = {
  eyebrow: "HELLO. I'M ELYUZAR",
  line1: [
    { t: 'BACKEND', c: '#FFFFFF' },
    { t: 'ENGINEER', c: '#D94B43' },
  ],
  line2: [
    { t: '&', c: '#FFFFFF' },
    { t: 'MOBILE DEV', c: '#8FD3E8' },
  ],
  sub: 'BUILDING FASTAPI BACKENDS, OFFLINE-FIRST FLUTTER APPS & SELF-HOSTED SYSTEMS.',
  status: 'READY TO WORK',
};

export const tools: ToolItem[] = [
  { name: 'Python', path: siPython.path },
  { name: 'FastAPI', path: siFastapi.path },
  { name: 'Flutter', path: siFlutter.path },
  { name: 'Redis', path: siRedis.path },
  { name: 'Linux', path: siLinux.path },
];

export const services: ServiceItem[] = [
  { title: 'WEB DEVELOPMENT', color: '#8FD3E8' },
  { title: 'BACKEND & APIS', color: '#F5DB82' },
  { title: 'MOBILE APPS', color: '#D94B43' },
  { title: 'UI/UX DESIGN', color: '#8FD3E8' },
  { title: 'CLOUD & DEVOPS', color: '#F4B3A4' },
  { title: 'AI & IOT SYSTEMS', color: '#F5F0E6' },
];

export const projects: ProjectItem[] = [
  {
    slug: 'eventsync',
    title: 'EventSync Mobile',
    subtitle: 'Event organizer mobile coordination tool',
    type: 'Group Project',
    category: 'MOBILE',
    role: 'Mobile Developer',
    year: '2026',
    summary:
      'Cross-platform mobile client for event staff to coordinate schedules, vendors, and tasks in real time.',
    highlightMetric: 'Zero screen lock on network drops via Hive offline sync',
    details: [
      'I wrote the entire Flutter frontend for our team. The backend used a dual-database design, and I had to handle asynchronous state cleanly across offline network drops during venue walkthroughs.',
      'A key challenge was keeping live rundown timetables synchronized when multiple crew members changed task statuses at once. I built an optimistic UI update model backed by local Hive key-value storage. If an API request timed out, the state rolled back with a non-intrusive alert banner rather than locking the screen.',
    ],
    techDetails: [
      { key: 'Mobile Framework', value: 'Flutter (Dart SDK 3.x)' },
      { key: 'Authentication', value: 'JWT bearer tokens with automated refresh interceptor' },
      { key: 'Backend Architecture', value: 'Dual-database REST backend consumed over HTTPS' },
      { key: 'Modules', value: 'Rundown tracker, task board, vendor catalog, team chat' },
    ],
    tags: ['Flutter', 'REST API', 'JWT', 'Hive DB', 'Real-time'],
    github: 'https://github.com/prettycoolflacko/EO_Mobile.git',
    image: '/eventsync.png',
    accent: '#8FD3E8',
  },
  {
    slug: 'finapp',
    title: 'FinApp Mobile',
    subtitle: 'Decision support system for stock market analysis',
    type: 'Group Project',
    category: 'MOBILE',
    role: 'AI Integration & Backend Logic Engineer',
    year: '2026',
    summary:
      'A mobile app that helps evaluate stock picks using multi-criteria decision analysis combined with an LLM backend.',
    highlightMetric: '4x API round-trip latency reduction via local metric batching',
    details: [
      'I worked on the core analytical scoring engine for this group project. We needed a structured way to turn subjective user risk preferences into quantitative Buy, Hold, or Sell rankings instead of just asking an AI for ungrounded opinions.',
      'I integrated Fuzzy Analytic Hierarchy Process (AHP) to weight criteria matrices and TOPSIS to rank the alternatives. One early problem was API latency when fetching multi-step evaluations from OpenRouter. I had to restructure the pipeline to batch the statistical metrics locally before sending only the distilled context payload to the model. This reduced query round-trips from four down to one per stock run.',
    ],
    techDetails: [
      { key: 'Analytical Core', value: 'Fuzzy AHP + TOPSIS algorithm implemented in Python' },
      { key: 'Inference Backend', value: 'OpenRouter API proxying deep-reasoning LLMs' },
      { key: 'Target Client', value: 'Android / iOS mobile build' },
      { key: 'State & Caching', value: 'Local SQLite cache for historical stock metrics' },
    ],
    tags: ['Python', 'OpenRouter LLM', 'Fuzzy AHP', 'TOPSIS', 'Mobile'],
    github: 'https://github.com/asda1-max/finappmobile.git',
    image: '/finapp.png',
    accent: '#F5DB82',
  },
  {
    slug: 'plts-monitoring',
    title: 'Real-Time PLTS Monitoring',
    subtitle: 'Automated solar power plant telemetry pipeline',
    type: 'Solo Project',
    category: 'BACKEND',
    role: 'Backend & Software Developer',
    year: '2026',
    summary:
      'Automated telemetry ingestion pipeline and dashboard built during my internship at PLN Indonesia Power.',
    highlightMetric: '100% manual check elimination with automatic session recovery',
    details: [
      'Built during my internship at PLN Indonesia Power Head Office. Operating staff were manually logging into the Sungrow iSolarCloud portal every hour to check power outputs across solar inverters.',
      'I automated this by building a headless Playwright scraper running on Bun.js. Session tokens on iSolarCloud expired intermittently, so I added an automatic re-login handler that detected expired auth states and re-authenticated without failing the cron cycle. The scraped output was cached in Redis with a 60-second TTL and served via REST endpoints to an internal monitoring board. Manual log-in checks were completely removed.',
    ],
    techDetails: [
      { key: 'Scraper Runtime', value: 'Bun.js with headless Playwright' },
      { key: 'Source Portal', value: 'Sungrow iSolarCloud web platform' },
      { key: 'Caching Layer', value: 'Redis in-memory store with 60-second TTL' },
      { key: 'API Layer', value: 'REST service exposing formatted power metrics (kW, kWh)' },
    ],
    tags: ['Bun.js', 'Playwright', 'Redis', 'REST API', 'Dashboard'],
    github: 'https://github.com/prettycoolflacko/PLN_IP-Isolar-WebScraping.git',
    accent: '#F4B3A4',
  },
  {
    slug: 'cipherdrop',
    title: 'CipherDrop',
    subtitle: 'Encrypted desktop communication and file transfer',
    type: 'Group Project',
    category: 'SECURITY',
    role: 'Backend & Security Engineer',
    year: '2026',
    summary:
      'Desktop messaging application featuring end-to-end encryption and image steganography.',
    highlightMetric: 'Zero-knowledge relay with 64 KB streaming encryption',
    details: [
      'I was responsible for developing and deploying the FastAPI backend hosted on a Linux VPS. The application needed to guarantee that our server could never read chat messages or user files in transit.',
      'We implemented client-side AES-256-GCM authenticated encryption paired with custom Vigenere super-encryption for secondary key verification, along with LSB image steganography to conceal text inside picture files. One performance bug was high CPU usage when encrypting large binary files on low-spec client machines. We solved it by streaming files in 64 KB chunks rather than loading entire blobs into memory.',
    ],
    techDetails: [
      { key: 'API Framework', value: 'FastAPI (Python 3.11)' },
      { key: 'Hosting', value: 'Linux VPS with Nginx reverse proxy' },
      { key: 'Cryptography', value: 'AES-256-GCM combined with Vigenere super-encryption' },
      { key: 'Storage Protocol', value: 'Zero-knowledge relay with ephemeral payloads' },
    ],
    tags: ['Python', 'FastAPI', 'AES-256', 'VPS', 'E2EE', 'Security'],
    github: 'https://github.com/TedjaSatedji/cipherdrop.git',
    accent: '#D94B43',
  },
];

export const about: AboutData = {
  bio: [
    '6th-semester Informatics undergraduate at UPN "Veteran" Yogyakarta maintaining a 3.67 / 4.00 cumulative GPA. I focus on backend services in FastAPI and Redis, relational data systems, and offline-first Flutter mobile applications.',
    'Completed an 8-week Information Technology & Digital internship at PLN Indonesia Power Head Office in Jakarta, where I automated solar inverter telemetry ingestion using Bun.js, Playwright, and Redis caching.',
  ],
  experience: [
    {
      title: 'Information Technology & Digital Intern',
      organization: 'PLN Indonesia Power Head Office',
      period: 'Jan 2026 – Feb 2026',
      bullets: [
        'Engineered an automated Bun.js + Playwright scraper for the Sungrow iSolarCloud platform',
        'Built REST APIs and integrated Redis caching for real-time data pipelines',
      ],
    },
    {
      title: 'Documentation Division Staff',
      organization: 'PKKMB UPN Veteran Yogyakarta',
      period: 'Jul 2025 – Aug 2025',
      bullets: [
        'Documented campus-wide events and Faculty of Industrial Engineering activities through photography and video',
        'Managed multi-camera video ingest, live card offloads, and same-day editing deadlines',
      ],
    },
    {
      title: 'Videographer & Production Staff',
      organization: 'Multimedia Community Informatika (MMCI)',
      period: 'Oct 2024 – Present',
      bullets: [
        'Produced and edited multimedia content for the Informatics department community',
        'Operated video cameras, lighting setups, and handled audio recording for departmental workshops',
      ],
    },
  ],
  education: [
    {
      institution: 'UPN "Veteran" Yogyakarta',
      degree: 'Bachelor of Computer Science (Informatics)',
      period: 'Aug 2023 – Present',
      metric: 'GPA 3.67 / 4.00 · 6th Semester',
      highlights: [
        'Active member in Multimedia Community Informatika (MMCI)',
        'Coursework in Data Structures, Database Systems, Computer Networks, and Web Application Development',
      ],
    },
    {
      institution: 'SMA Internasional Budi Mulia Dua',
      degree: 'Natural Sciences (MIPA) Stream',
      period: 'Jun 2020 – May 2023',
      metric: 'Final Grade Avg 88.0 / 100',
      highlights: [
        '1st Runner-Up, National Robotic Competition at ITS (2022)',
        'Gold Medal, Indonesian Student English Olympiad (2022)',
      ],
    },
  ],
  certifications: [
    {
      friendlyName: 'BNSP Junior Web Programmer',
      issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      year: '2025',
    },
    {
      friendlyName: 'GEMASTIK XVIII 2025: Data Mining Division',
      issuer: 'BPTI / Puspresnas',
      year: '2025',
    },
    {
      friendlyName: 'IELTS Preparation (Overall Band 7.0)',
      issuer: 'IELTS Academic Preparation Program',
      year: '2024',
    },
    {
      friendlyName: 'TOEFL ITP Score Report: 557 Points',
      issuer: 'Educational Testing Service (ETS)',
      year: '2022',
    },
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    shortLabel: 'LANGUAGES',
    name: 'Programming Languages',
    accent: '#8FD3E8',
    description:
      'Core languages used for backend logic, numerical data analysis, and application scripting.',
    items: [
      { name: 'Python', role: 'FastAPI backends, data mining, automation', level: 'Primary', version: '3.11+' },
      { name: 'JavaScript', role: 'Node.js, React SPA frontends, Bun runtime', level: 'Primary', version: 'ES2023' },
      { name: 'SQL', role: 'Relational schema design, queries, aggregation', level: 'Proficient', version: 'PostgreSQL / MySQL' },
      { name: 'PHP', role: 'Web backends, traditional MVC scripting', level: 'Working Knowledge', version: '8.x' },
      { name: 'C++', role: 'Algorithm practice, core CS coursework', level: 'Academic', version: 'C++17' },
      { name: 'Java', role: 'Object-oriented programming, data structures', level: 'Academic', version: 'JDK 17' },
    ],
  },
  {
    id: 'frameworks',
    shortLabel: 'FRAMEWORKS',
    name: 'Frameworks & Libraries',
    accent: '#F5DB82',
    description:
      'Application frameworks used to build web APIs, mobile apps, and user interfaces.',
    items: [
      { name: 'FastAPI', role: 'Asynchronous Python microservices and REST APIs', level: 'Primary', version: '0.110+' },
      { name: 'Flutter', role: 'Cross-platform mobile apps for Android and iOS', level: 'Primary', version: '3.x' },
      { name: 'Express.js', role: 'Lightweight Node.js REST services', level: 'Proficient', version: '4.x' },
      { name: 'React Native', role: 'Cross-platform mobile UI development', level: 'Proficient', version: '0.74+' },
      { name: 'TailwindCSS', role: 'Utility styling and responsive interfaces', level: 'Proficient', version: '4.x' },
    ],
  },
  {
    id: 'infrastructure',
    shortLabel: 'INFRASTRUCTURE',
    name: 'Tools & Infrastructure',
    accent: '#F4B3A4',
    description: 'Deployment tools, servers, caching layers, and telemetry hardware.',
    items: [
      { name: 'Linux', role: 'Ubuntu/Debian server administration and shell scripting', level: 'Proficient', version: 'Ubuntu LTS' },
      { name: 'Git & GitHub', role: 'Version control, branch management, collaborative pull requests', level: 'Primary', version: '2.x' },
      { name: 'Redis', role: 'In-memory caching and real-time data buffering', level: 'Proficient', version: '7.x' },
      { name: 'VPS Hosting', role: 'Deploying services with Nginx reverse proxy and SSL', level: 'Proficient', version: 'Cloud VPS' },
      { name: 'REST APIs', role: 'API design, JSON payload validation, JWT authentication', level: 'Primary', version: 'RESTful / HTTP' },
      { name: 'MQTT', role: 'Lightweight publish-subscribe broker for sensor data', level: 'Working Knowledge', version: 'v3.1.1' },
      { name: 'IoT Hardware', role: 'Microcontroller sensor telemetry reading', level: 'Working Knowledge', version: 'ESP32 / Arduino' },
    ],
  },
  {
    id: 'creative',
    shortLabel: 'CREATIVE',
    name: 'Creative & Multimedia',
    accent: '#D94B43',
    description: 'Video production, audio editing, and graphic design software.',
    items: [
      { name: 'Adobe Premiere Pro', role: 'Video editing, pacing, color balance for campus events', level: 'Proficient', version: 'CC 2024' },
      { name: 'Adobe Photoshop', role: 'Asset editing, poster creation, thumbnail layouts', level: 'Proficient', version: 'CC 2024' },
      { name: 'Videography', role: 'Camera operation and documentation shooting', level: 'Practical', version: 'DSLR / Mirrorless' },
      { name: 'Graphic Design', role: 'Visual layouts, vector banners, documentation decks', level: 'Practical', version: 'Vector / Raster' },
    ],
  },
];
