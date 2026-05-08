# NEVER DELETE NODE_MODULES

## ⚠️ CRITICAL RULE ⚠️

**NEVER delete the `node_modules` directory automatically.**

### Prohibited Actions

1.  `rm -rf node_modules`
2.  `rimraf node_modules`
3.  Any script or command that wipes the entire dependency directory.

### Allowed Actions

1.  `npm install` (Add/update packages)
2.  `npm ci` (Clean install if absolutely necessary and APPROVED by user)
3.  `npm prune` (Remove extraneous packages)

### Protocol

If you believe `node_modules` is corrupted and needs to be deleted:

1.  **STOP.**
2.  **ASK** the user for explicit permission: "I suspect node_modules is corrupted. May I delete it and reinstall?"
3.  **WAIT** for the user to say "Yes".

**Reasoning**: Deleting `node_modules` on Windows can be extremely slow and buggy (EPERM errors), causing significant downtime.
