# Phase 4: Hero CTA, Pricing & Trust Elements

## Objective
Update the Hero button to reflect the new $399 pricing, change its color to a trustworthy blue, and add truthful social proof below it.

## Target File
`public/naslogic.html`

## Exact Steps
1. Open `public/naslogic.html`.
2. Locate the primary CTA button inside the hero section: `<button onclick="openPurchaseModal()" class="btn btn-primary" ...>`
3. **MODIFY** the text inside the button to update the price from ~~$499~~ $199 to ~~$699~~ $399:
   `GET MY PAGE, <span style="font-weight: 400; opacity: 0.8; font-size: 0.9rem;"><del>$699</del></span> $399`
4. **MODIFY** the CTA color. Locate the `.btn-primary` definition in the `<style>` block (around line 125). Change `background: var(--primary);` to `background: #2563EB;`. Ensure the hover state `.btn-primary:hover` changes to a slightly darker blue like `#1D4ED8`.
5. Locate the trust badge below the buttons: `<div style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; ...">`
6. Below the button group, **INSERT** a new paragraph for social proof:
   `<p style="color: #94A3B8; font-size: 0.9rem; margin-top: 15px;">★★★★★ Backed by our 100% Risk-Free Guarantee</p>`

## Verification
- The main CTA button should be a vibrant blue (`#2563EB`).
- The button text should show $699 crossed out, and $399 as the main price.
- The 5-star risk-free guarantee text should be visible below the buttons.
