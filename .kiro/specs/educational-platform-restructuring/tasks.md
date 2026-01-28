# Implementation Plan: Educational Platform Restructuring

## Overview

This implementation plan restructures the educational platform to implement a wing-based organizational hierarchy with simplified user onboarding, collaborative roadmap creation, and integrated payment systems. The approach focuses on relocating existing pages to new locations while adding new navigation patterns and organizational structures.

## Tasks

- [x] 1. Set up wing-based data models and database schema
  - Create TypeScript interfaces for Wing, Company, User, and related entities
  - Set up database migrations for new wing-based structure
  - Implement data access layer for wing management
  - _Requirements: 2.1, 2.4, 5.1_

- [ ] 2. Implement simplified registration system
  - [ ] 2.1 Create basic registration form with minimal fields
    - Modify existing registration page to show only name, email, password fields
    - Remove wing selection, educational details, roadmap creation, and payment fields
    - Implement immediate dashboard redirect after successful registration
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 3. Build wing exploration and company display system
  - [x] 3.1 Create wing explorer component with company cards
    - Implement wing listing with industry categorization
    - Create company card components with website links, achievements, teaching focus, and images
    - Build hierarchical display showing wings containing companies
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 3.2 Implement wing selection workflow
    - Create wing selection interface with detailed company information
    - Implement permanent wing assignment upon selection
    - Trigger roadmap creation process after wing selection
    - _Requirements: 3.1, 3.2, 3.3, 5.2_

- [ ] 4. Checkpoint - Ensure basic user flow works
  - Run `npx tsc` to check for TypeScript compilation errors, ask the user if questions arise.

- [ ] 5. Implement live session and collaborative roadmap creation
  - [x] 5.1 Create live session booking system
    - Build trainer availability checking and session scheduling
    - Implement screen sharing integration setup
    - Create session management interface for trainers and students
    - _Requirements: 4.1, 4.2_

  - [x] 5.2 Build collaborative roadmap creation form
    - Implement real-time collaborative form that both trainer and student can edit
    - Create roadmap data structure with goals, learning path, timeline, and assessment criteria
    - Implement session completion and roadmap saving for both parties
    - _Requirements: 4.3, 4.4, 4.5_

- [ ] 6. Implement wing-based user organization and access control
  - [ ] 6.1 Create wing assignment system
    - Implement permanent wing association for all users
    - Create wing membership validation and enforcement
    - Build wing-based feature access controls
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 7. Build mentor management system with standardized tables
  - [x] 7.1 Create table management component
    - Build reusable DataTable component with checkboxes, filters, and search
    - Implement filter controls at top of tables
    - Create search functionality for quick user discovery
    - Add column sorting and selection management
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 7.2 Implement mentor management interfaces
    - Create mentor dashboard with trainer and student management tables
    - Implement wing-scoped user management operations
    - Build comprehensive user profile display with progress, status, and contact details
    - _Requirements: 6.4, 6.5_

- [ ] 8. Implement MoMo payment system with revenue sharing
  - [x] 8.1 Create MoMo payment integration
    - Implement MoMo payment gateway integration
    - Create payment processing workflow for students
    - Build payment method restriction (MoMo only)
    - _Requirements: 7.1, 7.5_

  - [x] 8.2 Build automatic revenue distribution system
    - Implement 65% wing, 25% Umbrella Academy revenue split
    - Create payment-wing association tracking
    - Build financial reporting organized by wing
    - _Requirements: 7.2, 7.3, 7.4_

- [ ] 9. Build reporting and approval workflow system
  - [ ] 9.1 Create trainer report creation tools
    - Build report creation interface for trainers after sessions
    - Implement report templates for student progress and roadmap updates
    - Include roadmap progress, session outcomes, and performance metrics
    - _Requirements: 8.1, 8.5_

  - [ ] 9.2 Implement mentor review and approval workflow
    - Create automatic report routing to wing mentors
    - Build mentor review and approval interface
    - Implement complete audit trail for all reports and actions
    - _Requirements: 8.2, 8.3, 8.4_

- [ ] 10. Checkpoint - Ensure reporting system works
  - Run `npx tsc` to check for TypeScript compilation errors, ask the user if questions arise.

- [ ] 11. Implement enhanced support system
  - [ ] 11.1 Create role-specific support pages
    - Build dedicated support pages for trainers, students, and mentors
    - Implement role-appropriate content delivery
    - Create support ticket submission interface
    - _Requirements: 9.1, 9.3_

  - [ ] 11.2 Build support ticket routing and tracking system
    - Implement automatic routing to wing admins based on user wing affiliation
    - Create issue tracking and resolution workflow tools
    - Build real-time status updates for submitted issues
    - _Requirements: 9.2, 9.4, 9.5_

- [ ] 12. Relocate existing pages and implement navigation
  - [x] 12.1 Move existing pages to new locations
    - Relocate subscription, support, feedback, live-session, and roadmap pages
    - Preserve all existing page functionality and content
    - Update routing to reflect new page locations
    - **CRITICAL RESTRICTION**: Only change routing paths, never modify page UI/content. If any UI changes are made accidentally, revert them immediately.
    - _Requirements: 10.1, 10.2, 10.4_

  - [x] 12.2 Implement sidebar navigation for post-signup pages
    - Create consistent sidebar navigation component
    - Add sidebar to all pages accessed after user signup
    - Ensure navigation reflects wing-based structure
    - _Requirements: 10.1, 10.3_

- [ ] 13. Implement data migration system
  - [ ] 13.1 Create user migration tools
    - Build migration scripts to preserve existing user accounts and data
    - Implement wing assignment for existing users based on current affiliations
    - Create data validation and integrity checks
    - _Requirements: 11.1, 11.2_

  - [ ] 13.2 Migrate payment and learning data
    - Preserve all existing subscription and payment history
    - Maintain existing roadmaps and progress data
    - Ensure historical data accessibility through new wing structure
    - _Requirements: 11.3, 11.4, 11.5_

- [ ] 14. Integration and final validation
  - [ ] 14.1 Wire all components together
    - Connect user management, wing management, session management, and payment systems
    - Implement cross-component data consistency
    - Test end-to-end user flows from registration to roadmap completion
    - _Requirements: All requirements integration_

  - [ ] 14.2 Run final TypeScript compilation check
    - Run `npx tsc` to ensure no compilation errors
    - Verify all components integrate properly
    - Check that all imports and exports are correctly typed

- [ ] 15. Final checkpoint - Ensure complete system works
  - Run `npx tsc` to check for any remaining TypeScript errors, ask the user if questions arise.

## Notes

- Each task references specific requirements for traceability
- Checkpoints use `npx tsc` for TypeScript compilation validation at major milestones
- Focus on relocating existing pages rather than rebuilding functionality
- All tables should follow the standardized format with checkboxes, filters, and search
- Use TypeScript compilation to catch errors instead of writing tests