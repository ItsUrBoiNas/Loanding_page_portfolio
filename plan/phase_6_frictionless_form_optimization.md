# Phase 6: Frictionless Form Optimization

## Objective
Apply the EAS framework to `forms.js` to drastically reduce cognitive friction by removing non-essential fields from both the Quote and Purchase forms.

## Target File
`public/forms.js`

## Exact Steps
1. Open `public/forms.js`.
2. **Modify the Quote Form (`createQuoteModal`):**
   - Locate the HTML template inside `createQuoteModal()`.
   - Keep: Name, Email, Phone, and the "What do you need?" textarea.
   - **DELETE** the form groups for: "Company / URL", "Business Type", "Budget Range" dropdown, and "Timeline" dropdown.
   - Update `handleQuoteSubmit()` to remove these deleted fields from the `formData` object payload.
3. **Modify the Purchase Form (`createPurchaseModal`):**
   - Locate the HTML template inside `createPurchaseModal()`.
   - In Step 1: Keep Name and Email. Move "Brand URL" to Step 2.
   - In Step 2: Keep Phone and "Brand URL" (moved from Step 1).
   - **DELETE** the form groups for: "Your Main Service", "What do you want visitors to do?" (Mission), and "The Audience".
   - Delete the associated Javascript logic handling the "Other" dropdowns (`missionSelect.addEventListener...`, etc.).
   - Update `handlePurchaseSubmit()` to remove validation and payload mapping for the deleted fields. Ensure it only validates and sends Name, Email, Phone, and Website.

## Verification
- Open the "Get a Free Quote" modal on the live site. It should only ask for 4 things.
- Open the "Get My Page" modal. Step 1 should just be Name & Email. Step 2 should just be Phone & Brand URL.
