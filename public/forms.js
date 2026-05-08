/**
 * Naslogic — Modern API Modal Forms
 * Injects high-conversion modal forms for PayPal checkout and Resend requests.
 * Connects directly to Next.js API routes.
 */

(function () {
  'use strict';

  // ─── Inject PayPal SDK ─────────────────────────────────────────
  const paypalScript = document.createElement('script');
  paypalScript.src = "https://www.paypal.com/sdk/js?client-id=Aejwo1SCLifR_oPg6a-FBMIzpxBE6yUaELiMu7-k8hpw3VTNi7dDOJGhBNgB_DtLE8FbJMVL6nK2PrLh&vault=true&intent=subscription";
  paypalScript.setAttribute("data-sdk-integration-source", "button-factory");
  document.head.appendChild(paypalScript);

  // ─── Inject Modern CSS ─────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* Modal Overlay */
    .nl-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
      padding: 60px 20px;
      overflow-y: auto;
    }

    .nl-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    /* Modal Container */
    .nl-modal {
      background: #FFFFFF;
      border: 1px solid #F1F5F9;
      border-radius: 12px;
      box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
      padding: 40px;
      position: relative;
      transform: translateY(20px);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Inter', system-ui, sans-serif;
      color: #0F172A;
    }

    .nl-modal-overlay.active .nl-modal {
      transform: translateY(0);
    }

    /* Close Button */
    .nl-modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 32px;
      height: 32px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      color: #64748B;
      font-size: 1.25rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .nl-modal-close:hover {
      background: #F8FAFC;
      color: #0F172A;
      border-color: #CBD5E1;
    }

    /* Header */
    .nl-modal-badge {
      display: inline-block;
      padding: 6px 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 20px;
      border-radius: 8px;
      background: #F1F5F9;
      color: #475569;
    }

    .nl-modal-title {
      font-size: 1.875rem;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.02em;
      color: #0F172A;
      margin: 0 0 8px 0;
    }

    .nl-modal-subtitle {
      color: #64748B;
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 0 0 24px 0;
    }

    .nl-price-amount {
      font-size: 2.25rem;
      font-weight: 700;
      color: #0F172A;
      line-height: 1;
      margin-bottom: 24px;
    }

    /* Forms */
    .nl-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .nl-form-group {
      margin-bottom: 16px;
    }

    .nl-form-label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: #475569;
      margin-bottom: 8px;
    }

    .nl-form-label .required {
      color: #EF4444;
    }

    .nl-form-input,
    .nl-form-select,
    .nl-form-textarea {
      width: 100%;
      padding: 12px 16px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      color: #0F172A;
      font-size: 0.95rem;
      font-family: 'Inter', system-ui, sans-serif;
      transition: all 0.2s ease;
      outline: none;
      border-radius: 8px;
    }

    .nl-form-input:focus,
    .nl-form-select:focus,
    .nl-form-textarea:focus {
      background: #FFFFFF;
      border-color: #3B82F6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .nl-form-input::placeholder,
    .nl-form-textarea::placeholder {
      color: #94A3B8;
    }

    .nl-form-select {
      appearance: none;
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      background-size: 16px;
      padding-right: 40px;
    }

    .nl-form-textarea {
      min-height: 100px;
      resize: vertical;
    }

    /* Buttons */
    .nl-form-submit {
      width: 100%;
      padding: 14px 24px;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      border-radius: 8px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 24px;
    }

    .nl-btn-quote {
      background: #0F172A;
      color: #FFFFFF;
      box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1);
    }

    .nl-btn-quote:hover:not(:disabled) {
      background: #1E293B;
      transform: translateY(-1px);
      box-shadow: 0 6px 10px -1px rgba(15, 23, 42, 0.15);
    }

    .nl-btn-purchase {
      background: #2563EB;
      color: #FFFFFF;
      box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
    }

    .nl-btn-purchase:hover:not(:disabled) {
      background: #1D4ED8;
      transform: translateY(-1px);
      box-shadow: 0 6px 10px -1px rgba(37, 99, 235, 0.3);
    }

    .nl-form-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Spinner */
    .nl-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #FFFFFF;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Feedbacks */
    .nl-form-feedback { display: none; text-align: center; padding: 40px 0; }
    .nl-form-feedback.active { display: block; }

    .nl-form-error {
      background: #FEF2F2;
      border: 1px solid #FCA5A5;
      border-radius: 8px;
      padding: 12px 16px;
      color: #DC2626;
      font-size: 0.9rem;
      margin-bottom: 20px;
      display: none;
      font-weight: 500;
    }
    .nl-form-error.active { display: block; }

    /* PayPal Secure */
    .nl-secure-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
      color: #64748B;
      font-size: 0.8rem;
      font-weight: 500;
    }
    .nl-secure-badge svg { width: 14px; height: 14px; fill: #64748B; }

    /* Fix scroll jump on body lock */
    body.nl-modal-open { overflow: hidden; padding-right: 8px; }

    @media (max-width: 600px) {
      .nl-modal { padding: 32px 20px; border-radius: 16px 16px 0 0; transform: translateY(100%); margin-top: auto; border: none; }
      .nl-modal-overlay.active .nl-modal { transform: translateY(0); }
      .nl-form-row { grid-template-columns: 1fr; gap: 0; }
      .nl-modal-overlay { padding: 0; align-items: flex-end; }
    }
  `;
  document.head.appendChild(style);

  // ─── Quote Modal ($799 / $2500) ───────────────────────────────
  function createQuoteModal() {
    const overlay = document.createElement('div');
    overlay.className = 'nl-modal-overlay';
    overlay.id = 'nl-quote-overlay';
    overlay.innerHTML = `
      <div class="nl-modal">
        <button class="nl-modal-close" onclick="closeQuoteModal()">&times;</button>
        <div id="nl-quote-form-wrap">
          <div class="nl-modal-badge">Free Quote</div>
          <h2 class="nl-modal-title">Request a Custom Proposal.</h2>
          <p class="nl-modal-subtitle">Tell us about your project below. We will review your details and provide a custom proposal within 24 hours.</p>
          <div class="nl-form-error" id="nl-quote-error"></div>
          
          <form id="nl-quote-form">
            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Name <span class="required">*</span></label>
                <input class="nl-form-input" type="text" name="name" required>
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Email <span class="required">*</span></label>
                <input class="nl-form-input" type="email" name="email" required>
              </div>
            </div>
            <div class="nl-form-group">
              <label class="nl-form-label">Phone <span class="required">*</span></label>
              <input class="nl-form-input" type="tel" name="phone" required>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">What do you need? <span class="required">*</span></label>
              <textarea class="nl-form-textarea" name="needs" placeholder="Tell us exactly what you are looking for..." required></textarea>
            </div>

            <button type="submit" class="nl-form-submit nl-btn-quote" id="nl-quote-submit">Get Free Quote</button>
          </form>
        </div>

        <div class="nl-form-feedback" id="nl-quote-success">
          <h2 class="nl-modal-title">Quote Request Received.</h2>
          <p class="nl-modal-subtitle">We are analyzing your numbers. We will reach out within 24 hours.</p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeQuoteModal(); });
    document.getElementById('nl-quote-form').addEventListener('submit', handleQuoteSubmit);

    // Ghost Capture state
    let hasCapturedPartial = false;

    // Ghost Capture Function
    async function captureGhostLead() {
      if (hasCapturedPartial) return;
      const email = document.querySelector('#nl-quote-form input[name="email"]').value.trim();
      const name = document.querySelector('#nl-quote-form input[name="name"]').value.trim();
      
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!email || !emailRegex.test(email)) return;

      hasCapturedPartial = true;
      try {
        await fetch('/api/lead-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isPartial: true, email, name, formType: 'quote' })
        });
      } catch (err) {
        hasCapturedPartial = false; // allow retry if failed
      }
    }

    // Capture on blur
    document.querySelector('#nl-quote-form input[name="email"]').addEventListener('blur', captureGhostLead);
  }

  // ─── Purchase Modal ($199) ────────────────────────────────────
  function createPurchaseModal() {
    const overlay = document.createElement('div');
    overlay.className = 'nl-modal-overlay';
    overlay.id = 'nl-purchase-overlay';
    overlay.innerHTML = `
      <div class="nl-modal">
        <button class="nl-modal-close" onclick="closePurchaseModal()">&times;</button>
        <div id="nl-purchase-form-wrap">
          <div class="nl-modal-badge" style="background: #EFF6FF; color: #2563EB;">48-Hour Delivery</div>
          <h2 class="nl-modal-title">The Landing Page.</h2>
          <div class="nl-price-amount" style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
            <span style="text-decoration: line-through; color: #94A3B8; font-size: 1.75rem; font-weight: 500;">$699</span>
            <span style="color: #0F172A; font-size: 2.5rem; font-weight: 700;">$399</span>
          </div>
          <div class="nl-form-error" id="nl-purchase-error"></div>
          
          <form id="nl-purchase-form">
            
            <!-- STEP 1 -->
            <div id="nl-step-1">
              <div class="nl-form-row">
                <div class="nl-form-group">
                  <label class="nl-form-label">Name <span class="required">*</span></label>
                  <input class="nl-form-input" type="text" name="name" required>
                </div>
                <div class="nl-form-group">
                  <label class="nl-form-label">Email <span class="required">*</span></label>
                  <input class="nl-form-input" type="email" name="email" id="nl-purchase-email" required>
                </div>
              </div>
              <button type="button" class="nl-form-submit nl-btn-purchase" id="nl-next-step">
                Secure Your Page &rarr;
              </button>
            </div>

            <!-- STEP 2 -->
            <div id="nl-step-2" style="display: none;">
              <button type="button" onclick="document.getElementById('nl-step-2').style.display='none'; document.getElementById('nl-step-1').style.display='block';" style="background:transparent; border:none; color:#64748B; font-size:0.9rem; cursor:pointer; margin-bottom:20px; font-weight:500; padding:0;">&larr; Back</button>
              
              <div class="nl-form-group">
                <label class="nl-form-label">Phone <span class="required">*</span></label>
                <input class="nl-form-input" type="tel" name="phone">
              </div>

              <div class="nl-form-group">
                <label class="nl-form-label">Brand URL</label>
                <input class="nl-form-input" type="url" name="website" placeholder="https://">
              </div>

              <div class="nl-form-group">
                <label class="nl-form-label">About Your Business & Needs <span class="required">*</span></label>
                <textarea class="nl-form-textarea" name="needs" placeholder="Who are your customers? What is the main goal?" required></textarea>
              </div>

              <div id="paypal-button-container-P-9XC76806RC000293YNH3T6VY" style="margin-top: 24px; min-height: 55px;"></div>

              <div style="margin-top: 20px; padding: 15px; background: #F8FAFC; border-radius: 8px; display: flex; gap: 15px; align-items: center;">
                <img src="/founder.png" alt="Nas" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                <p style="font-size: 0.85rem; color: #475569; margin: 0; line-height: 1.4; font-style: italic;">
                  "I personally guarantee you'll love this site, or I'll refund every penny. No questions asked." <br><strong style="font-style: normal;">- Nas, Founder</strong>
                </p>
              </div>

              <div class="nl-secure-badge">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                Encrypted Checkout Protocol by PayPal
              </div>
            </div>
            
          </form>
        </div>

        <div class="nl-form-feedback" id="nl-purchase-success">
          <h2 class="nl-modal-title">You're in — we'll start within 24 hours.</h2>
          <p class="nl-modal-subtitle">Redirecting to PayPal...</p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePurchaseModal(); });
    
    // Ghost Capture state
    let hasCapturedPartial = false;

    // Ghost Capture Function
    async function captureGhostLead() {
      if (hasCapturedPartial) return;
      const email = document.getElementById('nl-purchase-email').value.trim();
      const name = document.querySelector('#nl-purchase-form input[name="name"]').value.trim();
      const website = document.querySelector('#nl-purchase-form input[name="website"]').value.trim();
      
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!email || !emailRegex.test(email)) return;

      hasCapturedPartial = true;
      try {
        await fetch('/api/lead-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isPartial: true, email, name, website, formType: 'purchase' })
        });
      } catch (err) {
        hasCapturedPartial = false; // allow retry if failed
      }
    }

    // Capture on blur
    document.getElementById('nl-purchase-email').addEventListener('blur', captureGhostLead);

    // Step Transition
    document.getElementById('nl-next-step').addEventListener('click', () => {
      const form = document.getElementById('nl-purchase-form');
      if (!form.name.checkValidity() || !form.email.checkValidity()) {
        form.reportValidity();
        return;
      }
      captureGhostLead();
      document.getElementById('nl-step-1').style.display = 'none';
      document.getElementById('nl-step-2').style.display = 'block';

      function renderPayPal() {
        if (window.paypalRendered) return;
        if (!window.paypal) {
          setTimeout(renderPayPal, 100);
          return;
        }
        window.paypalRendered = true;
        paypal.Buttons({
          style: {
              shape: 'pill',
              color: 'gold',
              layout: 'vertical',
              label: 'paypal'
          },
          onClick: async function(data, actions) {
            const form = document.getElementById('nl-purchase-form');
            if (!form.phone.value.trim() || !form.needs.value.trim()) {
              const errorEl = document.getElementById('nl-purchase-error');
              errorEl.textContent = "Please fill out all required fields.";
              errorEl.classList.add('active');
              return actions.reject();
            }
            document.getElementById('nl-purchase-error').classList.remove('active');
            
            // Post lead silently
            const formData = {
              formType: 'purchase',
              name: form.name.value.trim(),
              email: form.email.value.trim(),
              phone: form.phone.value.trim(),
              website: form.website.value.trim(),
              needs: form.needs.value.trim()
            };
            try {
              await fetch('/api/lead-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
              });
            } catch(e) {}
            
            return actions.resolve();
          },
          createSubscription: function(data, actions) {
            return actions.subscription.create({
              plan_id: 'P-9XC76806RC000293YNH3T6VY'
            });
          },
          onApprove: function(data, actions) {
            document.getElementById('nl-purchase-form-wrap').style.display = 'none';
            document.getElementById('nl-purchase-success').classList.add('active');
          }
        }).render('#paypal-button-container-P-9XC76806RC000293YNH3T6VY');
      }
      
      renderPayPal();
    });

    // Remove old submit listener to prevent standard form submission
    document.getElementById('nl-purchase-form').addEventListener('submit', (e) => e.preventDefault());
  }

  // ─── Modal State ──────────────────────────────────────────────
  window.openQuoteModal = function () {
    document.getElementById('nl-quote-overlay').classList.add('active');
    document.body.classList.add('nl-modal-open');
    document.getElementById('nl-quote-form').reset();
    document.getElementById('nl-quote-form-wrap').style.display = '';
    document.getElementById('nl-quote-success').classList.remove('active');
    document.getElementById('nl-quote-error').classList.remove('active');
  };
  window.closeQuoteModal = function () {
    document.getElementById('nl-quote-overlay').classList.remove('active');
    document.body.classList.remove('nl-modal-open');
  };

  window.openPurchaseModal = function () {
    document.getElementById('nl-purchase-overlay').classList.add('active');
    document.body.classList.add('nl-modal-open');
    document.getElementById('nl-purchase-form').reset();
    document.getElementById('nl-purchase-form-wrap').style.display = '';
    document.getElementById('nl-purchase-success').classList.remove('active');
    document.getElementById('nl-purchase-error').classList.remove('active');
  };
  window.closePurchaseModal = function () {
    document.getElementById('nl-purchase-overlay').classList.remove('active');
    document.body.classList.remove('nl-modal-open');
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeQuoteModal(); closePurchaseModal(); }
  });

  // ─── Submission Handlers ──────────────────────────────────────
  function setButtonLoading(btn, loading) {
    if (loading) {
      btn.disabled = true;
      btn._originalText = btn.innerText;
      btn.innerHTML = '<div class="nl-spinner"></div> PROCESSING...';
    } else {
      btn.disabled = false;
      btn.innerText = btn._originalText;
    }
  }

  async function handleQuoteSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('nl-quote-submit');
    const errorEl = document.getElementById('nl-quote-error');
    errorEl.classList.remove('active');

    const formData = {
      formType: 'quote',
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      needs: form.needs.value.trim()
    };

    setButtonLoading(btn, true);

    try {
      const res = await fetch('/api/lead-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed. Please try again.');
      
      document.getElementById('nl-quote-form-wrap').style.display = 'none';
      document.getElementById('nl-quote-success').classList.add('active');
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.classList.add('active');
    } finally {
      setButtonLoading(btn, false);
    }
  }

  // removed handlePurchaseSubmit as it is now handled by paypal.Buttons

  // Auto-initialize
  createQuoteModal();
  createPurchaseModal();

})();

