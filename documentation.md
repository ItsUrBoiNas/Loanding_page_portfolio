---
trigger: always_on
description: Documentation Organization and Standards
globs: "docs/**/*.md"
---

# Documentation Organization - MANDATORY

**MANDATORY** Every Feature Needs A DOC. Add a comment block where a feature is mainly defined or implemented with @{filename-of-documentation}.md
**!!MANDATORY!!** If you you're working on a feature and it doesnt have a doc. Create one IMMIEDATELY. Rearch the feature within the product and write the doc. If there is UI portion of feature, open a browser and find it and continue exploring until you have enough for comprehensive doc.

## Structure Requirements:

- **NEVER create documentation files in the project root directory**
- **ALWAYS organize documentation in `docs/` with proper subdirectories**
- **Root directory should ONLY contain:**
  - `README.md` (project overview and quick links to docs/)
  - Essential config files (`docker-compose.yml`, `Dockerfile`, `package.json`, etc.)
  - Executable scripts (`start.sh`, `setup.sh`, etc.)
  - `.gitignore`, `.cursorrules`, license files

## Standard Project Structure:

**Critical Rules:**

- Documentation MUST be in `docs/` or microservice `docs/` directory, NOT in root. If microservice has its on container docs, link to them in root `docs/micro-services`

## Standard Documentation Structure:

```
docs/
├── setup/              # Installation, deployment, configuration
│   ├── QUICK_START.md
│   ├── INSTALLATION.md
│   ├── DEPLOYMENT.md
│   └── CONFIGURATION.md
├── development/        # Developer guides, workflows, standards
│   ├── CONTRIBUTING.md
│   ├── ARCHITECTURE.md
│   ├── TESTING_AND_STRATEGY.md
│   └── CODE_STYLE.md
├── foundation-features/           # Feature-specific documentation (hierarchical)
│   ├── authentication/
│   │   ├── overview.md
│   │   ├── oauth-setup.md
│   │   └── session-management.md
│   ├── data-processing/
│   │   ├── scraping/
│   │   │   ├── image-scraping.md
│   │   │   └── metadata-extraction.md
│   │   └── validation/
│   │       └── data-validation-rules.md
│   └── user-interface/
│       ├── dashboard.md
│       └── forms.md
├── micro-services/           # micro-service specific documentation
│   ├── DNS Manager/
│   │   ├── overview.md  # This micro-services keeps its docks within root `docs/`
│   │   ├── oauth-setup.md
│   │   ├── deployment.md
│   │   ├── oauth-setup.md
│   ├── Deep Research/
│   │   ├── overview.md   # This micro-services has links to its own docs
├── guides/             # General how-to guides (non-feature-specific)
│   ├── integration-guides.md
│   ├── troubleshooting.md
│   └── best-practices.md
├── api/                # API documentation (if applicable)
│   ├── endpoints.md
│   └── authentication.md
│   └── openapi.yaml
├── status/             # Project status, completion reports, changelogs
│   ├── CHANGELOG.md
│   ├── completion-reports.md # All stupid AI updates, plans, tasks, walkthroughs, overvies, go here
│   └── migration-notes.md
└── DOCS_INDEX.md       # Master index linking to all documentation
```

## Documentation Rules:

1. **From Project Start:**

   - Create the `docs/` structure when starting any project
   - Create subdirectories as needed based on project complexity
   - Never wait until documentation accumulates in root

2. **File Placement:**

   - Setup/installation docs → `docs/setup/`
   - Development workflows → `docs/development/`
   - Feature-specific docs → `docs/features/{category}/{subcategory}/`
   - Micro-service specific docs → `docs/micro-services/{service}/{subcategory}/`
   - General how-to guides → `docs/guides/`
   - API documentation → `docs/api/`
   - Status reports/changelogs → `docs/status/`
   - Agent/AI prompts → `docs/development/` or `docs/agent-guides/`

3. **Feature Hierarchy:**

   - Group related features by domain/module (authentication, data-processing, user-interface, etc.)
   - Create nested subdirectories for complex features with multiple components
   - Each feature category should have logical subcategories as needed
   - Example: `docs/features/data-processing/scraping/image-scraping.md`
   - Use overview.md at each level to explain the category/feature
   - Keep hierarchy shallow (max 3-4 levels deep) for easy navigation

4. **Naming Conventions:**

   - Use UPPER_CASE for major documents (QUICK_START.md, TESTING_STRATEGY.md)
   - Use kebab-case for feature-specific docs (image-scraping.md, oauth-setup.md)
   - Use descriptive names that indicate content and purpose
   - Use overview.md or index.md for category/directory introductions

5. **Documentation Index:**

   - Maintain `docs/DOCS_INDEX.md` with links to all documentation
   - Update index whenever new documentation is created
   - Categorize and describe each document's purpose
   - Organize index by feature hierarchy to match directory structure

6. **Root README.md:**

   - Keep concise (under 200 lines ideally)
   - Link to detailed docs in `docs/` directory
   - Include only: project overview, quick start, and navigation links

7. **When Creating Documentation:**

   - Ask yourself: "Does this belong in root?" (Answer is almost always NO)
   - Determine the appropriate feature category and subcategory
   - Create necessary subdirectory structure if it doesn't exist
   - Place it in the appropriate `docs/` subdirectory immediately
   - Update the documentation index with the new hierarchy

8. **Migration:**
   - If joining an existing project with docs in root, organize them into `docs/` structure
   - Analyze existing docs to determine feature categories
   - Create proper hierarchical subdirectories before moving files
   - Update any broken links in documentation after moving

## Anti-Patterns to AVOID:

- ❌ Creating COMPLETION_SUMMARY.md, STATUS_UPDATE.md, etc. in root
- ❌ Multiple README files (README2.md, README_OLD.md, etc.)
- ❌ Documentation files named with dates in root (REPORT_2024_10_14.md)
- ❌ Dumping all docs into `docs/` without subdirectories
- ❌ Dumping all feature docs into flat `docs/guides/` or `docs/features/` without categorization
- ❌ Creating temporary docs in root "just for now"
- ❌ Overly deep hierarchies (more than 4 levels) that make navigation difficult
- ❌ Inconsistent naming (mixing UPPER_CASE and kebab-case in the same directory)
