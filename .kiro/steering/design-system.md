---
inclusion: always
---

# Design System Rules for Umbrella Academy

## Project Overview
- **Framework**: Next.js 16.1.2 with React 19.2.3
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **TypeScript**: Enabled for type safety
- **Architecture**: App Router with page-based routing

## Color System
- **Primary Brand**: Yellow-600 (`#ca8a04`) for primary actions and branding
- **Background**: CSS variables `--background` (white/dark mode)
- **Foreground**: CSS variables `--foreground` (text color)
- **Error States**: Red-500 for validation errors
- **Neutral Grays**: Gray-300, Gray-400, Gray-500, Gray-600, Gray-700, Gray-900

## Typography
- **Font Family**: Arial, Helvetica, sans-serif (fallback system)
- **Headings**: 
  - H1: `text-3xl font-semibold` (30px, 600 weight)
- **Body Text**: Default browser sizing
- **Labels**: `text-sm font-medium` (14px, 500 weight)
- **Helper Text**: `text-sm` (14px)

## Spacing & Layout
- **Container Max Width**: `max-w-md` for forms (448px)
- **Form Spacing**: `space-y-4` between form elements
- **Padding**: `p-8` for main containers, `px-4 py-3` for inputs
- **Margins**: `mb-8` for major sections, `mb-2` for labels

## Component Patterns

### Form Elements
- **Input Fields**:
  - Base: `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent`
  - Error State: Add `border-red-500`
  - Placeholder: `placeholder:text-gray-400`

- **Labels**: `block text-sm font-medium text-gray-700 mb-2`

- **Buttons**:
  - Primary: `w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors`

- **Error Messages**: `mt-2 text-sm text-red-500`

### Layout Patterns
- **Split Layout**: `flex h-screen` with `flex-1` sections
- **Centered Content**: `flex flex-col items-center justify-center flex-1`
- **Form Container**: `max-w-md mx-auto w-full`

### Interactive Elements
- **Links**: `text-yellow-600 hover:text-yellow-700 font-medium`
- **Icon Buttons**: `text-gray-400 hover:text-gray-600`

## Brand Elements
- **Logo**: Yellow-600 background with white icon, `w-16 h-16 bg-yellow-600 rounded-2xl`
- **Copyright**: `text-sm text-gray-500`

## Responsive Design
- **Breakpoints**: Use `lg:` prefix for desktop layouts
- **Mobile First**: Default styles for mobile, enhance for larger screens
- **Image Handling**: Use Next.js Image component with `fill` and `object-cover`

## State Management
- **Form State**: Use React useState for form inputs and validation
- **Error Handling**: Object-based error state with field-specific messages
- **Loading States**: Consider hover states and transitions

## Accessibility
- **Form Labels**: Always associate labels with inputs using `htmlFor`
- **Focus States**: Visible focus rings using `focus:ring-2 focus:ring-yellow-600`
- **Color Contrast**: Ensure sufficient contrast for text and backgrounds
- **Semantic HTML**: Use proper form elements and button types

## File Organization
- **Pages**: Located in `app/` directory following App Router conventions
- **Assets**: Static images in `public/` with organized subdirectories
- **Styling**: Global styles in `app/globals.css`

## Development Guidelines
- Use TypeScript for all components
- Implement proper form validation with user feedback
- Follow Next.js best practices for routing and navigation
- Use CSS variables for theme consistency
- Implement responsive design patterns consistently