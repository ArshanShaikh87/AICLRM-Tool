# Implementation Phase

# M1 — Project Scaffolding

Step 1 Technology Stack

>Step 2 Repository Strategy
Implementation M1 – Step 2

Repository Strategy

Purpose

• Create a maintainable and scalable Git workflow.

Rules

• Monorepo structure
• main/develop/feature branches
• Conventional Commits
• Semantic Versioning
• Clean repository root
• Documentation-first
• Predictable release flow

>Step 3 Folder Structure
src/
│
├── assets/
├── components/
├── features/
├── hooks/
├── layouts/
├── services/
├── styles/
├── utils/
├── constants/
│
├── App.jsx
├── main.jsx
├── App.css
└── index.css

>Step 4 Configuration Files
Implementation M1 – Step 4

Configuration Files

Purpose

• Centralize project configuration.

Rules

• One responsibility per configuration file.
• No business logic in configuration.
• Secrets only in .env.
• Commit .env.example.
• Commit package-lock.json.
• Keep project and application configuration separate.

>Step 5 Development Standards
Naming

├── PascalCase → Components
├── camelCase → Functions & Utilities
├── use* → Hooks

Code

├── Single Responsibility
├── Descriptive Names
├── Reusable Components
├── No Magic Values
├── Centralized API Calls

Organization

├── Consistent Imports
├── Clear Folder Ownership
├── Small Components
└── Meaningful Comments

>Step 6 Environment Management
Implementation M1 – Step 6

Environment Management

Purpose

• Separate configuration from application code.

Rules

• Never hardcode secrets.
• Use .env locally.
• Commit .env.example only.
• Access secrets only in serverless functions.
• Validate required variables.
• Never expose API keys to React.
• Never commit secrets.

>Step 7 Developer Tooling
Implementation M1 – Step 7

Developer Tooling

Purpose

• Provide a consistent development experience.

Rules

• VS Code recommended
• ESLint for code quality
• Prettier for formatting
• Git for version control
• npm as package manager
• Minimal dependencies
• Local testing before commit
• Keep documentation updated



# M2 — Design System Implementation

>Step 1 — Design Tokens
Implementation M2 – Step 1

Design Tokens

Purpose

• Create a single source of truth for all visual values.

Rules

• Token-first design.
• No hardcoded visual values in components.
• Semantic naming.
• Tokens flow into components, then pages.
• One responsibility per token category.

>Step 2 — Theme System
Implementation M2 – Step 2

Theme System

Purpose

• Centralize the application's visual identity.

Rules

• Semantic theme roles.
• Theme → Tokens → Components.
• Default Dark Theme.
• Future-ready for Light Theme.
• No hardcoded colors.
• Components remain theme-independent.

>Step 3 — Typography
Implementation M2 – Step 3

Typography System

Purpose

• Establish readable and consistent text hierarchy.

Rules

• Poppins as primary font.
• Semantic typography roles.
• Limited font weights.
• Theme controls text colors.
• Components consume typography roles.
• Accessibility-first typography.

>Step 4 — Spacing System
Implementation M2 – Step 4

Spacing & Layout System

Purpose

• Create a consistent layout rhythm.

Rules

• Semantic spacing tokens.
• Shared container.
• Parent controls layout.
• Components control only internal spacing.
• Responsive spacing.
• Maximum readable content width.

>Step 5 — Color System
Implementation M2 – Step 5

Color System

Purpose

• Create semantic, reusable color roles.

Rules

• No hardcoded colors.
• Semantic naming only.
• Theme owns color values.
• Components consume tokens.
• Separate branding from feedback colors.
• Accessibility-first color usage.

>Step 6 — Shadows & Elevation
Implementation M2 – Step 6

Shadows & Elevation

Purpose

• Create a consistent visual hierarchy.

Rules

• Elevation-first design.
• Five elevation levels.
• Shadows communicate hierarchy.
• Borders preferred where sufficient.
• Hover may increase one level.
• Components consume elevation tokens only.

>Step 7 — Motion Tokens
Implementation M2 – Step 7

Motion & Animation Tokens

Purpose

• Provide meaningful and consistent motion.

Rules

• Motion must communicate purpose.
• Semantic motion tokens.
• Standard timing tokens.
• Consistent easing.
• Support reduced motion.
• Components consume shared motion tokens.

Step 8 — Design System Review
Implementation M2 – Final Review

Design System

Status

LOCKED

Rules

• Theme-first architecture.
• Token-driven design.
• Semantic component styling.
• Responsive layout.
• Accessible by default.
• Future theme support.

# M3 — Component Library
# M4 — Page Assembly
# M5 — API Integration
# M6 — Testing & QA
# M7 — Production Release