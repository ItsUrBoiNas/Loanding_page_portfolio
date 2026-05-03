# Phase 7: Checkout Anxiety Killers

## Objective
Implement trust elements right at the point of sale inside the Purchase Modal (Step 2) to eliminate cart abandonment anxiety, and update the API payload to the new $399 price.

## Target File
`public/forms.js`

## Exact Steps
1. Open `public/forms.js`.
2. Locate `createPurchaseModal()`.
3. **Update Header Price:** Change the HTML where the price is displayed from `<span ...>$499</span>` and `<span ...>$199</span>` to `$699` and `$399`.
4. **Update API Payload:** Inside `handlePurchaseSubmit()`, locate the `fetch('/api/paypal/create-order')` call. Change `amount: 199` to `amount: 399`.
5. **Update Checkout Button Text:** In Step 2, find the submit button `<button type="submit" class="nl-form-submit nl-btn-purchase" id="nl-purchase-submit">`. Change the text from `Secure My Page — $199` to `Build My New Website — $399`.
6. **Add Founder Promise:** Right below the submit button, **INSERT** a new block of HTML:
   ```html
   <div style="margin-top: 20px; padding: 15px; background: #F8FAFC; border-radius: 8px; display: flex; gap: 15px; align-items: center;">
     <img src="/nas_profile.jpg" alt="Nas" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
     <p style="font-size: 0.85rem; color: #475569; margin: 0; line-height: 1.4; font-style: italic;">
       "I personally guarantee you'll love this site, or I'll refund every penny. No questions asked." <br><strong style="font-style: normal;">- Nas, Founder</strong>
     </p>
   </div>
   ```
   *(Note: You will need a placeholder `nas_profile.jpg` in the `public/` directory, or we can use a generic avatar until one is provided).*
7. **Add Security Logo:** Update the `.nl-secure-badge` div at the bottom. Keep the lock icon and text, but maybe append the text: `Encrypted Checkout Protocol by PayPal`.

## Verification
- Click the CTA to open the purchase modal.
- Verify the header price is $399 (was $699).
- Proceed to Step 2. Verify the button says "Build My New Website — $399".
- Verify the Founder Promise and updated security badge appear at the bottom.
- Submit the form and verify the PayPal redirect attempts to charge $399.
