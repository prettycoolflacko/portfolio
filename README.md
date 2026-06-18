# Elyuzar Fazlurrahman — Portfolio

A modern, dark-themed personal portfolio website built with React, TailwindCSS, and Framer Motion. Features a techy aesthetic with glassmorphism, scroll-reveal animations, a typing hero effect, and full Docker support.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)

## ✨ Features

- **Animated Hero** with typing effect cycling through roles
- **Glass-morphism** cards and smooth scroll-reveal animations
- **Responsive** mobile-first design
- **SEO optimized** with meta tags and semantic HTML
- **Docker** multi-stage build (Node → Nginx)
- **Contact form** with mailto: integration

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server (default: http://localhost:5173)
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Docker

```bash
# Build and run with Docker Compose (exposed on port 3000)
docker-compose up --build

# Or build manually
docker build -t portfolio .
docker run -p 3000:80 portfolio
```

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── profile.webp          ← Replace with your photo
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Customization

- **Profile Image**: Replace `src/assets/profile.webp` with your actual photo
- **CV Download**: Place your CV at `public/assets/Elyuzar_CV.pdf`
- **Colors**: Edit CSS custom properties in `src/index.css`
- **Content**: Update data arrays in each component file

## 🛠 Tech Stack

| Tool          | Purpose              |
|---------------|----------------------|
| React 19      | UI framework         |
| Vite 8        | Build tool           |
| TailwindCSS 4 | Utility-first CSS    |
| Framer Motion | Animations           |
| React Icons   | Icon library         |
| Nginx         | Production server    |
| Docker        | Containerization     |

## 📄 License

© 2026 Elyuzar Fazlurrahman. All rights reserved.
