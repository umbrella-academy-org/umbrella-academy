# Requirements Document

## Introduction

This document outlines the requirements for a comprehensive restructuring of an educational platform system. The restructuring focuses on simplifying user onboarding, implementing a wing-based organizational hierarchy, establishing mentor-controlled management systems, and creating wing-specific payment and reporting workflows.

## Glossary

- **Educational_Platform**: The main system providing educational services and management
- **Wing**: A category or department representing different industry sectors (tech companies, business companies, hotels, etc.)
- **Company**: Specific organizations within a wing that provide educational content and training
- **Student**: End users who consume educational content and participate in training programs
- **Trainer**: Educational professionals who conduct live sessions and create roadmaps with students
- **Mentor**: Wing-level administrators who manage trainers and students within their wing
- **Wing_Admin**: Administrative users who handle wing-level operations and issue resolution
- **Umbrella_Academy**: The parent organization that receives a percentage of wing revenues
- **Roadmap**: A personalized learning path created collaboratively between trainer and student
- **Live_Session**: Real-time interactive sessions between trainers and students via screen sharing
- **MoMo**: Mobile money payment system for processing wing-specific payments

## Requirements

### Requirement 1: Simplified User Registration

**User Story:** As a new user, I want a simple registration process, so that I can quickly access the platform without complex setup steps.

#### Acceptance Criteria

1. WHEN a new user visits the registration page, THE Educational_Platform SHALL display only basic registration fields (name, email, password)
2. WHEN a user completes basic registration, THE Educational_Platform SHALL create their account and grant immediate dashboard access
3. THE Educational_Platform SHALL NOT require wing selection, educational details, roadmap creation, or payment information during initial signup
4. WHEN registration is complete, THE Educational_Platform SHALL redirect users to the main dashboard for wing exploration

### Requirement 2: Wing System Architecture

**User Story:** As a platform administrator, I want wings organized as industry categories containing specific companies, so that users can explore and choose relevant educational paths.

#### Acceptance Criteria

1. THE Educational_Platform SHALL organize wings as top-level categories representing industry sectors
2. WHEN displaying wings, THE Educational_Platform SHALL show companies as cards under each wing category
3. WHEN displaying company cards, THE Educational_Platform SHALL include website links, achievements, teaching focus, and company images
4. THE Educational_Platform SHALL maintain a hierarchical structure where wings contain multiple companies
5. WHEN users browse wings, THE Educational_Platform SHALL provide detailed company information for informed decision-making

### Requirement 3: New User Journey Flow

**User Story:** As a new user, I want to explore wings and companies before making commitments, so that I can make informed decisions about my educational path.

#### Acceptance Criteria

1. WHEN a user completes registration, THE Educational_Platform SHALL provide access to wing exploration features
2. THE Educational_Platform SHALL allow users to browse all wings and companies before selection
3. WHEN a user selects a wing, THE Educational_Platform SHALL initiate the roadmap creation process
4. THE Educational_Platform SHALL enforce the sequence: registration → dashboard → wing exploration → wing selection → roadmap creation
5. WHEN users access the dashboard, THE Educational_Platform SHALL provide clear navigation to wing exploration features

### Requirement 4: Live Session Roadmap Creation

**User Story:** As a student, I want to create my roadmap through a live session with a trainer, so that I receive personalized guidance and collaborative planning.

#### Acceptance Criteria

1. WHEN a student requests roadmap creation, THE Educational_Platform SHALL require connection with an available trainer
2. WHEN a live session begins, THE Educational_Platform SHALL enable screen sharing between trainer and student
3. WHEN creating roadmaps, THE Educational_Platform SHALL provide a collaborative form that both trainer and student can access simultaneously
4. THE Educational_Platform SHALL prevent roadmap creation without trainer participation
5. WHEN the roadmap session completes, THE Educational_Platform SHALL save the collaboratively created roadmap for both parties

### Requirement 5: Wing-Based User Organization

**User Story:** As a platform administrator, I want all users assigned to specific wings, so that I can maintain organized wing-based control and management.

#### Acceptance Criteria

1. THE Educational_Platform SHALL require every user (student, trainer, mentor) to belong to exactly one wing
2. WHEN users select a wing, THE Educational_Platform SHALL permanently associate them with that wing
3. THE Educational_Platform SHALL organize all platform features and access controls based on wing membership
4. WHEN displaying user information, THE Educational_Platform SHALL always include wing affiliation
5. THE Educational_Platform SHALL prevent users from accessing features outside their assigned wing scope

### Requirement 6: Mentor Management System

**User Story:** As a mentor, I want comprehensive management tools for trainers and students in my wing, so that I can effectively oversee educational operations.

#### Acceptance Criteria

1. WHEN mentors access management features, THE Educational_Platform SHALL display trainer and student profiles in organized tables with checkboxes for selection
2. WHEN viewing user tables, THE Educational_Platform SHALL provide filter controls at the top of tables for efficient data filtering
3. WHEN viewing user tables, THE Educational_Platform SHALL provide search functionality at the top of tables for quick user discovery
4. THE Educational_Platform SHALL grant mentors control over both trainers and students within their wing only
5. WHEN mentors perform management actions, THE Educational_Platform SHALL restrict operations to users within the same wing
6. THE Educational_Platform SHALL provide comprehensive user profile information including progress, status, and contact details in table format

### Requirement 7: Wing-Based Payment System

**User Story:** As a wing administrator, I want wing-specific payment processing with automatic revenue sharing, so that financial operations are properly distributed.

#### Acceptance Criteria

1. WHEN students make payments, THE Educational_Platform SHALL process payments through MoMo integration only
2. WHEN processing payments, THE Educational_Platform SHALL automatically distribute 65% to the wing and 25% to Umbrella_Academy
3. THE Educational_Platform SHALL associate all payments with the student's wing affiliation
4. WHEN generating financial reports, THE Educational_Platform SHALL organize revenue data by wing
5. THE Educational_Platform SHALL prevent payment processing through any method other than MoMo

### Requirement 8: Reporting and Progress System

**User Story:** As a trainer, I want to create and submit student progress reports to mentors, so that wing leadership can track educational outcomes.

#### Acceptance Criteria

1. WHEN trainers complete sessions, THE Educational_Platform SHALL provide report creation tools for student progress and roadmap updates
2. WHEN reports are created, THE Educational_Platform SHALL automatically route them to the appropriate wing mentor
3. WHEN mentors receive reports, THE Educational_Platform SHALL provide review and approval workflow tools
4. THE Educational_Platform SHALL maintain a complete audit trail of all reports and mentor actions
5. WHEN generating reports, THE Educational_Platform SHALL include roadmap progress, session outcomes, and student performance metrics

### Requirement 9: Enhanced Support System

**User Story:** As a platform user, I want role-specific support pages and issue tracking, so that I can get appropriate help for my problems.

#### Acceptance Criteria

1. THE Educational_Platform SHALL provide dedicated support pages for trainers, students, and mentors with role-appropriate content
2. WHEN users submit support issues, THE Educational_Platform SHALL route them to the appropriate wing admin
3. WHEN wing admins receive issues, THE Educational_Platform SHALL provide tracking and resolution workflow tools
4. THE Educational_Platform SHALL maintain issue status and resolution history for all submitted problems
5. WHEN users check issue status, THE Educational_Platform SHALL provide real-time updates on resolution progress

### Requirement 10: Page Relocation and Navigation Structure

**User Story:** As a platform administrator, I want to relocate existing pages to new locations with appropriate navigation, so that the new user flow is implemented without rebuilding existing functionality.

#### Acceptance Criteria

1. THE Educational_Platform SHALL move existing pages to new locations within the restructured navigation hierarchy
2. WHEN pages are accessed after user signup, THE Educational_Platform SHALL display a sidebar navigation component
3. THE Educational_Platform SHALL preserve all existing page functionality during relocation
4. WHEN users navigate post-signup pages, THE Educational_Platform SHALL provide consistent sidebar navigation across all relocated pages
5. THE Educational_Platform SHALL maintain all existing page content and features without modification during the restructuring

### Requirement 11: Data Migration and System Transition

**User Story:** As a platform administrator, I want seamless migration from the current system to the new structure, so that existing users and data are preserved.

#### Acceptance Criteria

1. WHEN migrating existing users, THE Educational_Platform SHALL preserve all current user accounts and associated data
2. THE Educational_Platform SHALL assign existing users to appropriate wings based on their current affiliations
3. WHEN transitioning payment systems, THE Educational_Platform SHALL maintain all existing subscription and payment history
4. THE Educational_Platform SHALL preserve all existing roadmaps and progress data during the restructuring
5. WHEN the migration completes, THE Educational_Platform SHALL ensure all users can access their historical data through the new wing-based structure