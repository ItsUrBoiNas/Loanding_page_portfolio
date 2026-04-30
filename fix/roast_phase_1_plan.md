# Phase 1: Performance & Core Web Vitals (Target: Sub-1.5s LCP)

**File:** `public/naslogic.html`

The goal of this phase is to fix the 3.4s mobile FCP/LCP delay by optimizing the render path. Since the hero relies purely on typography, the Google Fonts are the primary culprits blocking the first paint.

## Action Items:
1. **Optimize Fonts (Lines 173-177):** 
   - Ensure Google Fonts are preconnected properly. 
   - Add `fetchpriority="high"` to the font stylesheet link, as text is the LCP element. 
   - Ensure `display=swap` is present to prevent invisible text while the font loads.
2. **Audit Scripts (Lines 9-15 & 1355-1356):** 
   - *Note: We will keep the Microsoft Clarity script in the `<head>` where it belongs for proper tracking. Since it already uses `async`, it shouldn't be the primary cause of the render-blocking.*
   - Verify GSAP scripts are already deferred (they should be at the bottom).
