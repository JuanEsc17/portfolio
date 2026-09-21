<div align="center">

# ⚡ Personal Portfolio Web Application

**A high-performance, responsive Single-Page Application (SPA) built with React 18, TypeScript, Vite, and Tailwind CSS.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-juanescudero--portfolio.vercel.app-C4F135?style=for-the-badge&logo=vercel&logoColor=black)](https://juanescudero-portfolio.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[🌐 View Live Site](https://juanescudero-portfolio.vercel.app/) • [💼 LinkedIn](https://www.linkedin.com/in/juan-escudero-ab6428255/) • [🐙 GitHub Profile](https://github.com/JuanEsc17)

</div>

---

## 📖 Overview

This repository contains the source code for my personal portfolio web application. The project is designed with a strong focus on **clean code architecture**, **strict type safety**, **component modularity**, and **front-end security best practices**.

Instead of hardcoding data directly inside UI components, the application is built on a **centralized, strongly typed data layer** that decouples presentation from content.

---

## ⚙️ Key Technical Features

### 1. 🛡️ Strict Type Safety & Data Decoupling
- **Complete Typing**: Built with TypeScript interfaces (`src/types/portfolio.ts`) covering all data structures (projects, experience, certifications, skills, socials).
- **Single Source of Truth**: All dynamic content is centralized in `src/data/portfolioData.ts`, allowing instant updates and content maintenance without modifying JSX templates.

### 2. 🧩 Modular Component Architecture
- Atomic, self-contained components for each page section (`HeroSection`, `FeaturedProjects`, `ExperienceSection`, `SkillsBar`, `Certifications`).
- **Dynamic Modal System**: Managed state handlers for interactive modals:
  - Extended project details with image carousels (`ProjectModal`, `ProjectImageCarousel`).
  - Integrated CV / Resume viewer and downloader (`ResumeModal`).
  - Contact modal with client-side form validation (`ContactModal`).

### 3. 🔒 Security & Client-side Protection
- **Input Sanitization**: Custom sanitization utilities (`src/utils/security.ts`) to strip dangerous HTML tags and control characters, preventing XSS.
- **Protocol & URL Validation**: Restricts external links to secure protocols (`https://`, `mailto:`), blocking malicious execution vectors (`javascript:`, `data:`).
- **Client Rate Limiting**: Built-in rate-limiting logic on actions with cooldowns and hourly quotas.
- **Strict HTTP Headers**: Production deployment configured with comprehensive security headers via `vercel.json` (Content Security Policy, X-Frame-Options: `DENY`, Strict-Transport-Security, X-Content-Type-Options).

### 4. ⚡ Performance & Build Optimization
- Bundled and served with **Vite** for fast HMR (Hot Module Replacement) and optimized tree-shaken production output.
- Utility-first styling with **Tailwind CSS**, ensuring minimal CSS bundle size via automatic purging.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technologies |
| :--- | :--- |
| **Core & Framework** | React 18, TypeScript 5 |
| **Styling** | Tailwind CSS 3, PostCSS, Autoprefixer |
| **Build & Tooling** | Vite 5, ESBuild |
| **Icons** | Lucide React |
| **Hosting & CI/CD** | Vercel |

---

## 📂 Project Structure

```text
portfolio/
├── public/                     # Static assets (images, CV, icons, robots.txt)
│   └── projects/               # Project screenshots and previews
├── src/
│   ├── components/             # Reusable UI presentation components
│   │   ├── modals/             # Modal dialogs (Contact, Project, Resume)
│   │   ├── CallToAction.tsx
│   │   ├── Certifications.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectImageCarousel.tsx
│   │   ├── SkillsBar.tsx
│   │   └── SocialIcons.tsx
│   ├── data/
│   │   └── portfolioData.ts    # Centralized data model & content
│   ├── types/
│   │   └── portfolio.ts        # TypeScript interfaces & types
│   ├── utils/
│   │   └── security.ts         # Sanitization, validation & rate limiting
│   ├── App.tsx                 # Root layout & modal state orchestration
│   ├── index.css               # Global styles and Tailwind directives
│   └── main.tsx                # Application bootstrap
├── tailwind.config.js          # Tailwind theme & design tokens
├── tsconfig.json               # TypeScript compiler configuration
├── vercel.json                 # Security headers & hosting configuration
└── vite.config.ts              # Vite bundling configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JuanEsc17/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled, optimized output will be generated inside the `/dist` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 📬 Contact

- **Juan Escudero**
- **Website:** [juanescudero-portfolio.vercel.app](https://juanescudero-portfolio.vercel.app/)
- **LinkedIn:** [linkedin.com/in/juan-escudero-ab6428255](https://www.linkedin.com/in/juan-escudero-ab6428255/)
- **GitHub:** [@JuanEsc17](https://github.com/JuanEsc17)
