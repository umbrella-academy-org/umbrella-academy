# 🌂 Umbrella Academy LMS

> A high-performance, industry-aligned Learning Management System (LMS) designed to bridge the gap between education and industry through a unique "Wing-based" organizational structure.

---

## 🌟 Overview

Umbrella Academy is a sophisticated LMS platform that organizes students, trainers, and mentors into specialized **Wings** based on industry sectors. This model ensures that learning is highly focused, industry-relevant, and directly connected to real-world corporate needs.

Built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**, the platform provides a seamless, high-performance experience for all users, from students tracking their learning roadmaps to global administrators monitoring system health.

## 🏗️ Core Concept: The "Wing" Structure

Unlike traditional LMS platforms, Umbrella Academy uses a hierarchical organizational model:

- **Wings**: Major industry sectors (e.g., Tech, Business, Hospitality).
- **Companies**: Real-world partners linked to specific Wings that define teaching focus and career opportunities.
- **Roadmaps**: Industry-specific learning journeys tailored to the needs of the Wing's sector.

## 👥 Multi-Role Ecosystem

The platform features a robust Role-Based Access Control (RBAC) system with dedicated dashboards for five user types:

| Role | Responsibility |
| :--- | :--- |
| **Student** | Accesses industry roadmaps, tracks progress, and manages referrals. |
| **Trainer** | Manages courses, conducts training, and monitors student performance. |
| **Mentor** | Provides high-level guidance and industry insights to students. |
| **Wing Admin** | Manages a specific industry sector, oversees trainers, and handles wing-specific finances. |
| **Umbrella Admin** | Global system oversight, infrastructure monitoring, and platform-wide financial management. |

## 🚀 Key Features

- **🎯 Industry-Specific Roadmaps**: Custom-built learning paths that adapt to the user's chosen Wing and progress.
- **� Integrated Chat System**: Direct communication channels between students, mentors, and trainers for collaborative learning.
- **📅 Interactive Calendar**: Schedule and track training sessions, mentoring hours, and industry workshops.
- **🎥 Live Learning Sessions**: Integrated support for real-time workshops and virtual classroom experiences.
- **�💰 Integrated Financial System**: Real-time tracking of revenue shares, wing budgets, and transparent transaction logs.
- **📊 Real-time System Monitoring**: Live metrics on system health, API response times, and user engagement for admins.
- **💳 Subscription & Enrollment**: Sophisticated management of student subscriptions and wing enterprise plans.
- **📱 Responsive Industry Dashboards**: Premium user interfaces optimized for all industry roles and mobile devices.
- **🤝 Referral & Reward System**: Built-in mechanism to incentivize growth and community engagement.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Font**: Geist Sans & Geist Mono

## 📁 Project Structure

```text
├── app/                  # Next.js App Router routes & layouts
│   ├── auth/             # Authentication pages (Login, Signup, etc.)
│   ├── dashboard/        # Role-specific dashboards
│   └── post-signup/      # Onboarding flows
├── components/           # Reusable UI components
├── contexts/             # Global state (Auth, Financial, Roadmap, System)
├── data/                 # Mock datasets and static content
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and shared libraries
├── public/               # Static assets
├── types/                # TypeScript interfaces and types
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/umbrella-academy.git
   cd umbrella-academy
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

The project is optimized for deployment on the **Vercel Platform** for the best performance and Next.js feature support.

```bash
pnpm build
```

---

## 📄 License

This project is private and confidential. Unauthorized copying of this file, via any medium, is strictly prohibited. Proprietary and confidential.

© 2024 Umbrella Academy. All rights reserved.
