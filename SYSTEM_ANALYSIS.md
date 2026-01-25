# Umbrella Academy LMS - System Analysis

## Project Overview

**Umbrella Academy** is a comprehensive Learning Management System (LMS) built with modern web technologies, designed to serve multiple user types including students, trainers, mentors, and administrators across different organizational levels.

### Technology Stack
- **Framework**: Next.js 16.1.2 with App Router
- **React**: 19.2.3 with TypeScript 5
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Icons**: Lucide React 0.562.0
- **Package Manager**: pnpm with workspace configuration

## Architecture Overview

### File Structure
```
umbrella-academy/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication flows
│   ├── dashboard/         # Role-based dashboards
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Landing page with role navigation
├── components/            # Reusable UI components
│   ├── calendar/          # Calendar-specific components
│   ├── dashboard/         # Dashboard widgets and layouts
│   ├── live-session/      # Video session components
│   ├── notifications/     # Notification system
│   ├── providers/         # React context providers
│   ├── roadmap/           # Learning path components
│   ├── subscription/      # Payment and billing
│   ├── trainer/           # Trainer-specific components
│   └── ui/               # Base UI components
├── lib/                   # Utilities and business logic
│   ├── data/             # Sample data and mock content
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Helper functions
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## User Roles & Permissions

### 1. Student
- **Dashboard**: `/dashboard/student`
- **Features**: Learning roadmaps, live sessions, calendar, notifications, subscription management
- **Navigation**: Home, Smart Calendar, Roadmap, Notifications, Live Session, Subscription, Support, Feedback

### 2. Trainer
- **Dashboard**: `/dashboard/trainer`
- **Features**: Student management, live sessions, calendar, assignments, wallet
- **Navigation**: Home, Smart Calendar, My Students, Live Session, Wallet

### 3. Mentor
- **Dashboard**: `/dashboard/mentor`
- **Features**: Student mentorship, roadmap approvals, notifications, wallet, support
- **Navigation**: Home, My Students, Roadmap Approvals, Notifications, Wallet, Support

### 4. Wing Admin
- **Dashboard**: `/dashboard/wing-admin`
- **Features**: Regional management, mentor/trainer oversight, student activity, wing wallet
- **Navigation**: Home, Mentors, Trainers, Student Activity, Wing Wallet, Wing Settings

### 5. Umbrella Admin
- **Dashboard**: `/dashboard/umbrella-admin`
- **Features**: System-wide management, wings oversight, user management, financial control
- **Navigation**: Home, Wings, Users, Financial, System Health

## Design System

### Color Palette
- **Primary Brand**: Yellow-600 (`#ca8a04`) - Main actions and branding
- **Background**: CSS variables for light/dark mode support
- **Neutrals**: Gray scale from 300-900 for UI elements
- **Status Colors**: Red-500 for errors, role-specific colors for navigation

### Typography
- **Font Stack**: Arial, Helvetica, sans-serif (fallback system)
- **Headings**: Semibold weights with responsive sizing
- **Body Text**: Standard browser sizing with consistent line heights

### Component Patterns

#### Form Elements
- Consistent input styling with focus states
- Yellow-600 focus rings for accessibility
- Error state handling with red borders
- Responsive button designs with hover effects

#### Layout Patterns
- **Responsive Grid**: Mobile-first with breakpoint enhancements
- **Sidebar Navigation**: Collapsible on mobile, fixed on desktop
- **Dashboard Grids**: Flexible layouts adapting to content

#### Interactive Elements
- **Loading States**: Custom loading bar with progress animation
- **Navigation**: Smooth transitions with loading indicators
- **Hover Effects**: Subtle animations and state changes

## Key Features

### Authentication System
- Multi-step registration flows for different user types
- Email verification and password reset functionality
- Role-based routing and access control
- Local storage for auth state management

### Dashboard System
- **Modular Components**: Reusable widgets across different user types
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Real-time Data**: Stats cards, charts, and activity feeds
- **Role-specific Content**: Customized layouts and features per user type

### Learning Management
- **Roadmaps**: Structured learning paths with phases and lessons
- **Live Sessions**: Video conferencing integration
- **Calendar System**: Smart scheduling and event management
- **Progress Tracking**: Completion stats and milestone tracking

### Financial System
- **Wallet Management**: Multi-level wallet system (trainer, wing, umbrella)
- **Subscription Handling**: Student payment and renewal management
- **Transaction History**: Detailed financial tracking
- **Revenue Sharing**: Wing and umbrella admin financial oversight

## Technical Implementation

### State Management
- React useState for local component state
- Custom hooks for shared logic (navigation, roadmap management)
- Local storage for persistent auth and user preferences

### Routing & Navigation
- Next.js App Router with nested layouts
- Custom navigation hook with loading states
- Role-based route protection and redirection

### Styling Architecture
- **Tailwind CSS v4**: Utility-first styling with custom theme
- **CSS Variables**: Dynamic theming support
- **Custom Animations**: Keyframe animations for enhanced UX
- **Responsive Design**: Mobile-first with progressive enhancement

### Type Safety
- Comprehensive TypeScript definitions in `types/index.ts`
- Strict type checking for all components and utilities
- Interface definitions for all data structures

## Data Models

### Core Entities
- **User**: Base user with role-specific extensions
- **Course**: Learning content with phases, lessons, and materials
- **Roadmap**: Student's learning journey with progress tracking
- **LiveSession**: Video sessions with scheduling and recording
- **Wallet**: Financial management for different user types
- **Wing**: Regional organizational units with admin oversight

### Relationships
- Students belong to wings and are assigned trainers/mentors
- Courses contain phases, which contain lessons
- Live sessions are associated with courses and mentors
- Wallets track transactions across the organizational hierarchy

## Performance Considerations

### Loading & Navigation
- Custom loading bar with realistic progress simulation
- Smooth transitions between routes
- Optimized component rendering with proper key usage

### Responsive Design
- Mobile-first approach with progressive enhancement
- Efficient grid layouts that adapt to screen size
- Optimized image handling with Next.js Image component

### Code Organization
- Modular component architecture
- Separation of concerns between UI, logic, and data
- Reusable utilities and custom hooks

## Development Workflow

### Build System
- Next.js with TypeScript compilation
- ESLint for code quality
- PostCSS for Tailwind processing
- pnpm for efficient package management

### File Organization
- Clear separation between pages, components, and utilities
- Consistent naming conventions
- Logical grouping of related functionality

## Future Considerations

### Scalability
- Component architecture supports easy extension
- Type system enables safe refactoring
- Modular design allows for feature additions

### Maintainability
- Comprehensive type definitions
- Consistent design patterns
- Clear separation of concerns

### Extensibility
- Role-based architecture supports new user types
- Component system allows for easy customization
- Flexible data models accommodate new features

---

*This analysis captures the current state of the Umbrella Academy LMS as of the system review. The architecture demonstrates a well-structured, scalable approach to building a comprehensive learning management platform.*