---
trigger: manual
description: Payload CMS - Best practices for architecture, security, patterns, and implementation
---

# Payload CMS Architecture & Standards

You are an expert in Fullstack TypeScript development with deep knowledge of Payload CMS, MongoDB, and Node.js.
You understand how to architect scalable backend services that can power multiple frontend applications (React Native, Remix.js, Next.js).
You excel at connecting Payload CMS to third-party APIs and services to enrich data experiences.

## Technology Stack

- **Backend**: Payload CMS, MongoDB, Node.js, Express, TypeScript
- **Frontend**: Next.js, React, React Native, Remix.js, TypeScript
- **Database**: MongoDB, Mongoose, MongoDB Atlas, MongoDB aggregation pipelines
- **APIs**: RESTful APIs, GraphQL, Webhook integrations

## Architecture & Patterns

### Payload CMS Patterns
- Structure collections with clear relationships and field validation
- Implement proper access control with field-level permissions
- Create reusable field groups and blocks for content modeling
- Follow the Payload hooks pattern for extending functionality
- Implement custom endpoints when necessary instead of overriding core functionality
- Use migrations for database schema changes
- Organize collections by domain or feature
- Implement proper upload handling and image processing

### MongoDB Patterns
- Design schemas with proper indexing for performance
- Use MongoDB aggregation pipelines for complex data transformations
- Implement proper error handling for database operations
- Follow data validation patterns at both application and database levels
- Consider document size limits when designing schemas
- Use MongoDB transactions for operations that require atomicity
- Implement pagination for large datasets

### File Structure
- **Collections**: `src/collections/{feature}.ts`
- **Globals**: `src/globals/{feature}.ts`
- **Fields**: `src/fields/{type}.ts`
- **Hooks**: `src/hooks/{collection}/{operation}.ts`
- **Endpoints**: `src/endpoints/{feature}.ts`
- **Utilities**: `src/utilities/{function}.ts`

## Security & Performance

### Security Best Practices
- Implement proper authentication and authorization
- Sanitize user inputs to prevent injection attacks
- Use environment variables for sensitive configuration
- Implement rate limiting to prevent abuse
- Follow the principle of least privilege for API access
- Use HTTPS for all communications
- Validate and sanitize all inputs, especially from external sources

### Performance Optimization
- Optimize database queries with proper indexing
- Implement caching strategies for frequently accessed data
- Use lazy loading and pagination for large datasets
- Optimize image and asset delivery
- Use server-side rendering or static generation when appropriate
- Monitor and optimize API response times

## Implementation Guidelines

## Server Actions (Critical)

Server actions for Payload admin **must** be in a separate file with `'use server'` at the **module level**:

```typescript
// ✅ CORRECT: src/app/(payload)/actions.ts
'use server'

import type { ServerFunctionClient, ServerFunctionClientArgs } from 'payload'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap'

export const serverAction: ServerFunctionClient = async (args: ServerFunctionClientArgs) => {
    return handleServerFunctions({
        ...args,
        config,
        importMap: importMap || {},
    })
}
```

```typescript
// ❌ WRONG: 'use server' inside function body does not work
async function serverAction(args) {
    'use server' // This is INVALID
    return handleServerFunctions(args)
}
```

## Block Structure

Location: `src/payload/blocks/<BlockName>.ts`

```typescript
import type { Block } from 'payload'

export const HeroBlock: Block = {
    slug: 'hero',           // camelCase, unique identifier
    labels: {
        singular: 'Hero',
        plural: 'Heroes',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            defaultValue: 'Default heading text',
        },
        // ... more fields
    ],
}
```

**Naming Convention:**
- File: `Hero.ts`
- Export: `HeroBlock`
- Slug: `hero` (camelCase)

## Collection Structure

Location: `src/payload/collections/<CollectionName>.ts`

```typescript
import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/Hero'

export const LandingPages: CollectionConfig = {
    slug: 'landing-pages',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
    },
    fields: [
        { name: 'title', type: 'text', required: true },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.title) {
                            return data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'layout',
            type: 'blocks',
            blocks: [HeroBlock],  // Import directly, not from barrel
        },
    ],
}
```

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Functions cannot be passed directly to Client Components" | Server action not properly exported | Move to separate file with `'use server'` at top |
| `SQLITE_ERROR: no such table` | Database not migrated | Run `npm run generate:types` then restart |
| Port 3000 in use | Previous process still running | Next.js auto-switches to 3001; or kill process |
| "model unreachable" in browser tools | Browser subagent issue | Retry the operation |

## Database Configuration

For local development use SQLite:
```typescript
db: sqliteAdapter({
    client: {
        url: process.env.DATABASE_URI || 'file:./local.db',
        authToken: process.env.DATABASE_AUTH_TOKEN,
    }
})
```

## Live Preview Setup

```typescript
admin: {
    livePreview: {
        url: ({ data, collectionConfig }) => {
            const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
            return `${base}/${data?.slug || ''}`
        },
        collections: ['landing-pages', 'pages'],
        breakpoints: [
            { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
            { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
        ],
    },
}
```
