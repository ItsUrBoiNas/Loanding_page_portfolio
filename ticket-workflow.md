---
trigger: always_on
description: Ticket Workflow & Lifecycle Management - load when updating, loading, reviewing tickets and marking tasks complete.
---

# All work items need tickets

Feature additions, feature requests, Debugging All Need Tickets. Start early and always be adding to them, modifying them, extending them, and creating new related tickets as you do your standard Task Groups, lists, and implementation plans

**MANDATORY** Always create or modify @.tickets tickets as you create and modify your own Implementation Plans, Walkthroughs, etc..

This rule defines the standard workflow for managing tasks using the In-IDE Ticket System.

## 1. Ticket Lifecycle

The ticket lifecycle moves through these states:

1. **DRAFT**
   - Create ticket folder `.tickets/TICKET-XXX-{slug}/`
   - Fill `Request.md` with requirements
   - Set complexity, service, and owner
   - Status: `draft`
   -

2. **REVIEW (Start)**
   - If `onStart: true`, wait for approval
   - Status: `pending_start_review` -> `ready`

3. **IN PROGRESS**
   - Work on tasks defined in `TaskList.md`
   - Update status to `in_progress`
   - Document decisions in `Discussion.md`
   - Sync progress with `todo_write`

4. **REVIEW (Completion)**
   - All tasks completed
   - Create `Summary.md`
   - Status: `pending_completion_review`

5. **DONE**
   - Review passed
   - Status: `done`

## 2. File Structure

Each ticket located in `.tickets/TICKET-XXX-{slug}/` contains:

- `Request.md`: The "WHAT" - Requirements and Metadata
- `TaskList.md`: The "PROGRESS" - Granular tasks
- `Discussion.md`: The "WHY" - Decisions and Context
- `Implementation_Plan.md`: (Optional) Technical design
- `Summary.md`: (Final) Completion report

## 3. Agent Responsibilities

### When Starting a Ticket

1. **Read Context**: Read `Request.md`, `Discussion.md`, and `Implementation_Plan.md` (if exists).
2. **Check Status**: Ensure ticket is `ready` or `in_progress`.
3. **Update State**: Mark `Request.md` status to `in_progress`.

### While Working

1. **Update Tasks**: Keep `TaskList.md` updated as you complete steps.
2. **Log Decisions**: Record architectural decisions in `Discussion.md`.
3. **Handoff**: If getting stuck or hitting context limits:
   - Write handoff notes in `Discussion.md`
   - Suggest next steps

### When Finishing

1. **Verify**: Ensure all tasks in `TaskList.md` are marked `[x]`.
2. **Summarize**: Create/Update `Summary.md` with what was done.
3. **Request Review**: Update status to `pending_completion_review`.

## 4. Commands

- `Create ticket`: Scaffolds a new ticket folder
- `Load ticket TICKET-XXX`: Loads ticket context
- `Update status`: Changes ticket state in `Request.md`

## 5. Review Criteria

Before marking `done`:

- [ ] All Acceptance Criteria in `Request.md` met
- [ ] Tests passed (Integration + E2E)
- [ ] Linter/Types check passed (MANDATORY per [`mandatory-lint-check.md`](file:///c:/Users/mikeh/Projects/landi/landing-editor/.agent/rules/mandatory-lint-check.md))
- [ ] No regression introduced
