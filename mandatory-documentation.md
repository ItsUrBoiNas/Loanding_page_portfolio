# ⚠️ CRITICAL MANDATORY RULE - DOCUMENTATION GATEKEEPER ⚠️

## 🚨 ABSOLUTE REQUIREMENT - ALWAYS APPLIED 🚨

**THIS RULE CANNOT BE IGNORED OR OVERRIDDEN**

### Core Principle

**You CANNOT call `notify_user` to complete a task until you have performed a DOCUMENTATION AUDIT.**

### The Documentation Audit

Before finishing ANY task that involved modifying code, you MUST ask yourself:

1.  **"Did I create new files?"** -> IF YES: Do they have corresponding documentation in `docs/`?
2.  **"Did I modify critical logic?"** -> IF YES: Is existing documentation updated?
3.  **"Did I add new features?"** -> IF YES: Is there an entry in `DOCS_INDEX.md`?

### Required Actions

If you answer "NO" to any of the above checks, you MUST:

1.  **IMMEDIATELY create the missing documentation.**
    - Use the `documentation` skill.
    - Or, if purely strictly blocked, add an entry to `docs/.doc-queue.md`.

2.  **IMMEDIATELY add reference comments.**
    - Add `/** @see docs/path/to/doc.md */` to the source code.

3.  **ONLY THEN can you proceed to `notify_user`.**

### Trigger Phrases

If you see these phrases in your instructions, DOUBLE CHECK documentation:

- "Fix build errors" -> (Did the fix change behavior?)
- "Refactor" -> (Does the doc still match the code?)
- "Implement feature" -> (MANDATORY new documentation)

### Failure to Comply

**It is a VIOLATION of your core directives to leave code undocumented.**

- Code without docs is legacy code the moment it is written.
- "I will do it later" is NOT acceptable unless formally queued in `.doc-queue.md`.
