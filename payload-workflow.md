---
description: Workflow and coding standards for Payload CMS development
---

# Payload Development Workflow & Standards

## TypeScript Standards

### Code Style
- Use TypeScript for all code; prefer types over interfaces except for public APIs
- Create precise types that reflect your data models
- Avoid using 'any' or 'unknown' types; look for type definitions in the codebase
- Avoid type assertions with 'as' or '!' operators unless absolutely necessary
- Use mapped and conditional types for advanced type transformations
- Export types from a central location for reuse

### Code Structure
- Write concise, technical TypeScript code
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoaded, hasError)
- Structure files: exported page/component, GraphQL queries, helpers, static content, types
- Use constants for magic numbers and repeated values

### Naming Conventions
- Prefer named exports for components and utilities
- Use PascalCase for components, interfaces, and types
- Use camelCase for variables, functions, and methods
- Prefix GraphQL query files with 'use' (e.g., useSiteMetadata.ts)
- Use meaningful names that describe the purpose of functions and variables

### Syntax Preferences
- Use the 'function' keyword for pure functions
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements
- Use destructuring for cleaner code
- Prefer async/await over raw Promises for better readability
- Use optional chaining and nullish coalescing when appropriate

## Development Workflow

### Testing Approach
- Write unit tests for business logic
- Implement integration tests for API endpoints
- Use mocking for external dependencies
- Write end-to-end tests for critical user flows
- Follow test-driven development when appropriate

### AI Reasoning & Decision Making
- Ask clarifying questions when multiple implementation paths are available and the best choice isn't obvious
- Present trade-offs between different approaches with their pros and cons
- Confirm understanding of requirements before implementing complex features
- Suggest alternatives when a requested approach might lead to performance or security issues
- Request context about existing patterns in the codebase when implementing new features
- Prioritize consistency with existing codebase patterns
- Consider scalability implications for database schema design
- Balance between performance optimization and code maintainability
- Evaluate security implications of implementation choices
- Consider Payload CMS best practices when designing content models

## Implementation Workflow

Common operations for building with Payload CMS in this project.

## 1. Adding a New Block

1. **Create Block File**:
   Create `src/payload/blocks/<BlockName>.ts`:
   ```typescript
   import type { Block } from 'payload'

   export const <BlockName>Block: Block = {
       slug: '<blockAlias>',
       labels: { singular: '<Block Name>', plural: '<Block Names>' },
       fields: [
           // ... fields
       ],
   }
   ```

2. **Register Block**:
   Add export to `src/payload/blocks/index.ts`:
   ```typescript
   export { <BlockName>Block } from './<BlockName>'
   ```

3. **Add to Collection**:
   Import and add to `blocks` array in your collection (e.g., `src/payload/collections/LandingPages.ts`).

4. **Generate Types**:
   Run `npm run generate:types` to update TypeScript definitions.

## 2. Admin Panel Debugging

If the Admin Panel crashes or shows errors:

1. **Server Action Errors**:
   - Verify `src/app/(payload)/actions.ts` has `'use server'` at the very top.
   - Ensure `serverFunction` prop is passed in `src/app/(payload)/layout.tsx`.

2. **Database Errors**:
   - Check `.env` for `DATABASE_URI=file:./local.db`.
   - If schema changed, delete `local.db` and restart (for dev only).

3. **Type Errors**:
   - Run `npm run generate:types`.
   - Restart dev server.

## 3. Deployment Prep

1. **Environment Variables**:
   Ensure `PAYLOAD_SECRET` and `DATABASE_URI` are set in production.

2. **Build**:
   Run `npm run build` locally to verify no type errors before pushing.
