# Bible Reading Application

## Overview

This is a full-stack Bible reading application built with React, Express, and TypeScript. The application provides an interactive Bible reading experience with features like verse search, bookmarking, explanations, and customizable reading preferences. It uses the King James Version (KJV) Bible text sourced from an external API and includes a PostgreSQL database for storing user data and preferences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Custom component library built on Radix UI primitives with shadcn/ui
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **Middleware**: Express middleware for JSON parsing, logging, and error handling
- **Development**: Hot module replacement (HMR) through Vite integration

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Structured tables for users, bookmarks, verse explanations, and user settings
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon Database serverless PostgreSQL connection
- **Fallback Storage**: In-memory storage implementation for development/testing

### Database Schema Design
- **Users**: Authentication and user management
- **Bookmarks**: User-specific verse bookmarks with metadata
- **Verse Explanations**: Commentary, themes, and cross-references for Bible verses
- **User Settings**: Personalized reading preferences (font size, highlights, reading position)

### Authentication and Session Management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Basic user creation and authentication system
- **Authorization**: User-scoped data access for bookmarks and settings

## External Dependencies

### Third-Party Services
- **Bible API**: External Bible text source (wldeh/bible-api via jsDelivr CDN)
  - Provides KJV Bible books, chapters, and verses in JSON format
  - Read-only access for Bible content
- **Neon Database**: Serverless PostgreSQL hosting for production data storage

### Key Libraries and Frameworks
- **UI Framework**: React with Radix UI component primitives
- **Database**: Drizzle ORM with PostgreSQL driver
- **HTTP Client**: Native Fetch API for external Bible content
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with class-variance-authority for component variants
- **Development Tools**: Vite, TypeScript, ESBuild for production builds

### Build and Development Tools
- **Package Manager**: npm with lockfile for dependency management
- **Bundling**: Vite for client-side bundling, ESBuild for server-side production builds
- **Type Checking**: TypeScript with strict configuration
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer
- **Development**: Replit-specific plugins for runtime error handling and debugging