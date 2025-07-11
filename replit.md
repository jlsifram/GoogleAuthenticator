# Replit.md

## Overview

This is a full-stack web application built with a React frontend and Express.js backend. The application implements Google OAuth authentication and features a modern UI built with shadcn/ui components. It uses TypeScript throughout, Drizzle ORM for database operations, and TanStack Query for state management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state, React hooks for local state
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Passport.js with Google OAuth strategy
- **Session Management**: express-session with configurable storage
- **Database**: PostgreSQL with Drizzle ORM
- **API Structure**: RESTful endpoints under `/api` prefix

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: Neon Database serverless connection
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend
- **Migrations**: Drizzle Kit for schema migrations

## Key Components

### Authentication System
- **Strategy**: Google OAuth 2.0 via Passport.js
- **User Model**: Stores Google profile data including ID, email, name, and profile picture
- **Session Persistence**: Express sessions with optional PostgreSQL storage
- **Frontend Integration**: Cookie-based authentication with automatic redirects

### Database Schema
- **Users Table**: Comprehensive user profile storage with Google OAuth fields
- **Type Safety**: Shared TypeScript types between frontend and backend via Drizzle
- **Validation**: Zod schemas for runtime validation

### UI System
- **Component Library**: Complete shadcn/ui implementation with 40+ components
- **Theme System**: CSS variables for light/dark mode support with Google brand colors
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built on Radix UI primitives for WCAG compliance

### API Layer
- **Query Management**: TanStack Query with custom query functions
- **Error Handling**: Centralized error boundaries and toast notifications
- **Request Utilities**: Standardized API request helpers with credential inclusion

## Data Flow

### Authentication Flow
1. User clicks "Sign in with Google" button
2. Frontend redirects to `/api/auth/google`
3. Passport handles OAuth flow with Google
4. On success, user data is stored/updated in database
5. Session is created and user is redirected to dashboard
6. Frontend queries `/api/auth/user` to check authentication status

### Data Fetching
1. TanStack Query manages all server state
2. Custom query functions handle HTTP requests with credentials
3. Error states are managed globally with toast notifications
4. Authentication failures trigger automatic redirects

### State Management
1. Server state via TanStack Query with infinite stale time
2. Local state via React hooks
3. Authentication state shared across components
4. Loading and error states handled declaratively

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Framework**: Radix UI primitives, Lucide React icons
- **Backend**: Express.js, Passport.js, express-session
- **Database**: Drizzle ORM, @neondatabase/serverless, pg
- **Development**: Vite, TypeScript, ESBuild

### Authentication
- **Google OAuth**: passport-google-oauth20 strategy
- **Session Storage**: connect-pg-simple for PostgreSQL session store
- **Environment Variables**: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Type Checking**: TypeScript with strict mode enabled
- **Code Quality**: ESLint configuration (implied by structure)

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` script

### Environment Configuration
- **Development**: Uses tsx for hot reloading with NODE_ENV=development
- **Production**: Compiled JavaScript with NODE_ENV=production
- **Database**: Requires DATABASE_URL environment variable
- **OAuth**: Requires Google OAuth credentials

### Hosting Requirements
- **Node.js Runtime**: ESM modules support required
- **PostgreSQL Database**: Compatible with Neon Database or standard PostgreSQL
- **Environment Variables**: Google OAuth, database URL, session secret
- **Static Files**: Frontend assets served from Express in production

### Security Considerations
- **Session Security**: Secure cookies in production, configurable secret
- **Database Security**: Environment-based connection strings
- **OAuth Security**: Proper callback URL configuration required
- **CORS**: Configured for cross-origin requests in development