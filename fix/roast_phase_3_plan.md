# Phase 3: Case Study, Urgency, & Trust Elements

**File:** `public/naslogic.html`

The goal of this phase is to fix the fake urgency, subjective case study metrics, and CTA/Guarantee hierarchy. *(Note: Testimonials at Lines 1017-1068 remain unchanged per user request).*

## Action Items:
1. **Case Study Fixes:**
   - **Line 967:** **DELETE** the HTML comment `<!-- TODO: Replace placeholder case data with verified client results before publishing -->`.
   - **Line 989:** **MODIFY** the before metric `Result: 0.8% conversion rate` to a vague statement like `Result: Poor lead generation`.
   - **Line 999:** **MODIFY** the after metric `Result: 14.2% conversion rate` to a subjective statement like `Result: High-converting custom layout`.
2. **Remove Fake Scarcity:**
   - **Lines 1084-1086:** **DELETE** the `🔥 April Only` badge on Tier 1.
   - **Lines 1105-1106:** **DELETE** the text `Goes back to $499 on May 1st`.
   - **Lines 1151-1211:** **DELETE** the entire Ultimatum countdown timer block and its associated JavaScript.
3. **Guarantee Visibility:**
   - **Lines 1316-1321:** **COPY** the "100% money-back if you don't like the design" guarantee from the FAQ.
   - **Lines 896-900 (Hero CTAs):** **PASTE** a single-line guarantee directly underneath the hero CTAs (e.g., `<p style="font-size: 0.85rem; margin-top: 15px; color: #9CA3AF;">100% money-back if you don't love it.</p>`).
4. **CTA Hierarchy (Mobile):**
   - **Lines 896-900:** Add a specific class or inline style to ensure the "Get My Page, $199" button visually dominates the "Get a Free Quote" button on mobile viewports.
