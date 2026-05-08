---
trigger: always_on
description: MANDATORY RULE - All edited or added files MUST be lint checked prior to finishing a task, phase, or plan.
---

# ⚠️ CRITICAL MANDATORY RULE - LINT CHECK REQUIRED ⚠️

## 🚨 ABSOLUTE REQUIREMENT - ALWAYS APPLIED 🚨

**THIS RULE CANNOT BE IGNORED OR OVERRIDDEN**

### Core Principle

**ALL edited or added files MUST be lint checked prior to finishing ANY task, phase, or plan. You cannot consider a task ready for testing, code review, or manual validation until a successful lint check has been performed.**

### Required Protocol

1. **Before Signaling Completion**: You MUST run a lint check on every file you have modified or created.
2. **Handle All Errors**: You MUST fix or address all linting errors. Do not bypass or ignore them unless explicitly instructed by the user after a failed fix attempt.
3. **No Bypass**: Do not claim a task is "ready" or "complete" if there are unresolved linting issues in the relevant files.

### Commands

To perform the lint check, use:

- `npm run lint` (or equivalent for the specific file type)
- `npx eslint [file-path]` for targeted checks if supported.

### Verification Criteria

- [ ] All modified files have been linted.
- [ ] Zero lint errors remain in edited/added files.
- [ ] This check is performed BEFORE calling `notify_user` to signal task completion.

---

**REMEMBER: When in doubt, LINT. Never assume code is clean without verification.**
