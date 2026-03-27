/**
 * Naslogic — Shared Payment & Quote Form Module
 * Injects premium modal forms for PayPal checkout and quote requests.
 * Usage: Add <script src="/forms.js"></script> before </body> in any page.
 * Then call openQuoteModal() or openPurchaseModal() from CTAs.
 */

(function () {
  'use strict';

  // ─── Inject CSS ───────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* =============================================
       Modal Overlay
       ============================================= */
    .nl-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.35s ease, visibility 0.35s ease;
      padding: 20px;
    }

    .nl-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    /* =============================================
       Modal Container
       ============================================= */
    .nl-modal {
      background: #111111;
      border: 1px solid #222222;
      border-radius: 24px;
      width: 100%;
      max-width: 560px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 48px 40px 40px;
      position: relative;
      transform: translateY(30px) scale(0.97);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      scrollbar-width: thin;
      scrollbar-color: #333 transparent;
    }

    .nl-modal::-webkit-scrollbar { width: 6px; }
    .nl-modal::-webkit-scrollbar-track { background: transparent; }
    .nl-modal::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

    .nl-modal-overlay.active .nl-modal {
      transform: translateY(0) scale(1);
    }

    /* =============================================
       Close Button
       ============================================= */
    .nl-modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #333;
      background: transparent;
      color: #aaa;
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: border-color 0.3s, color 0.3s, background 0.3s;
      z-index: 2;
    }

    .nl-modal-close:hover {
      border-color: #6EFF6A;
      color: #6EFF6A;
      background: rgba(110, 255, 106, 0.05);
    }

    /* =============================================
       Modal Header
       ============================================= */
    .nl-modal-badge {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 16px;
    }

    .nl-badge-quote {
      background: rgba(110, 255, 106, 0.12);
      color: #6EFF6A;
      border: 1px solid rgba(110, 255, 106, 0.2);
    }

    .nl-badge-purchase {
      background: rgba(59, 130, 246, 0.12);
      color: #60A5FA;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }

    .nl-modal-title {
      font-family: 'Anton', 'Impact', sans-serif;
      font-size: 2.2rem;
      text-transform: uppercase;
      line-height: 0.95;
      letter-spacing: 0.02em;
      color: #F0EDE8;
      margin: 0 0 8px 0;
    }

    .nl-modal-subtitle {
      color: #888;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0 0 32px 0;
    }

    /* Price highlight */
    .nl-price-tag {
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 24px;
    }

    .nl-price-amount {
      font-family: 'Anton', 'Impact', sans-serif;
      font-size: 3.5rem;
      color: #F0EDE8;
      line-height: 1;
    }

    .nl-price-desc {
      color: #888;
      font-size: 0.9rem;
    }

    /* =============================================
       Form Styles
       ============================================= */
    .nl-form-group {
      margin-bottom: 20px;
    }

    .nl-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .nl-form-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #aaa;
      margin-bottom: 8px;
    }

    .nl-form-label .required {
      color: #6EFF6A;
    }

    .nl-form-input,
    .nl-form-select,
    .nl-form-textarea {
      width: 100%;
      padding: 14px 16px;
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 12px;
      color: #F0EDE8;
      font-size: 0.95rem;
      font-family: 'Inter', system-ui, sans-serif;
      transition: border-color 0.3s, box-shadow 0.3s;
      outline: none;
    }

    .nl-form-input:focus,
    .nl-form-select:focus,
    .nl-form-textarea:focus {
      border-color: #6EFF6A;
      box-shadow: 0 0 0 3px rgba(110, 255, 106, 0.1);
    }

    .nl-form-input::placeholder,
    .nl-form-textarea::placeholder {
      color: #555;
    }

    .nl-form-select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      padding-right: 40px;
      cursor: pointer;
    }

    .nl-form-select option {
      background: #1a1a1a;
      color: #F0EDE8;
    }

    .nl-form-textarea {
      min-height: 110px;
      resize: vertical;
    }

    /* =============================================
       Buttons
       ============================================= */
    .nl-form-submit {
      width: 100%;
      padding: 18px 32px;
      border: none;
      border-radius: 100px;
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Inter', system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 8px;
    }

    .nl-btn-quote {
      background: #6EFF6A;
      color: #000;
      box-shadow: 0 0 24px rgba(110, 255, 106, 0.3);
    }

    .nl-btn-quote:hover:not(:disabled) {
      box-shadow: 0 0 40px rgba(110, 255, 106, 0.5);
      transform: translateY(-2px);
    }

    .nl-btn-purchase {
      background: linear-gradient(135deg, #3B82F6, #2563EB);
      color: #fff;
      box-shadow: 0 0 24px rgba(59, 130, 246, 0.3);
    }

    .nl-btn-purchase:hover:not(:disabled) {
      box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
      transform: translateY(-2px);
    }

    .nl-form-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }

    /* Spinner */
    .nl-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: nlSpin 0.7s linear infinite;
    }

    @keyframes nlSpin {
      to { transform: rotate(360deg); }
    }

    /* =============================================
       Feedback States
       ============================================= */
    .nl-form-feedback {
      text-align: center;
      padding: 40px 20px;
      display: none;
    }

    .nl-form-feedback.active {
      display: block;
    }

    .nl-feedback-icon {
      font-size: 3.5rem;
      margin-bottom: 16px;
      display: block;
    }

    .nl-feedback-title {
      font-family: 'Anton', 'Impact', sans-serif;
      font-size: 1.8rem;
      text-transform: uppercase;
      color: #F0EDE8;
      margin: 0 0 12px 0;
    }

    .nl-feedback-text {
      color: #888;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
    }

    .nl-feedback-text a {
      color: #6EFF6A;
      text-decoration: none;
    }

    /* Error */
    .nl-form-error {
      background: rgba(255, 68, 68, 0.08);
      border: 1px solid rgba(255, 68, 68, 0.2);
      border-radius: 12px;
      padding: 12px 16px;
      color: #ff6b6b;
      font-size: 0.88rem;
      margin-bottom: 20px;
      display: none;
    }

    .nl-form-error.active {
      display: block;
    }

    /* =============================================
       PayPal Secure Badge
       ============================================= */
    .nl-secure-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 16px;
      color: #666;
      font-size: 0.8rem;
    }

    .nl-secure-badge svg {
      width: 14px;
      height: 14px;
      fill: #666;
    }

    /* =============================================
       Responsive
       ============================================= */
    @media (max-width: 600px) {
      .nl-modal {
        padding: 36px 24px 28px;
        border-radius: 18px;
        max-height: 95vh;
      }

      .nl-modal-title {
        font-size: 1.7rem;
      }

      .nl-form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .nl-price-amount {
        font-size: 2.8rem;
      }
    }
  `;
  document.head.appendChild(style);

  // ─── Build Quote Modal HTML ───────────────────────────────────
  function createQuoteModal() {
    const overlay = document.createElement('div');
    overlay.className = 'nl-modal-overlay';
    overlay.id = 'nl-quote-overlay';
    overlay.innerHTML = `
      <div class="nl-modal" role="dialog" aria-labelledby="nl-quote-title">
        <button class="nl-modal-close" aria-label="Close" onclick="closeQuoteModal()">&times;</button>

        <!-- Form -->
        <div id="nl-quote-form-wrap">
          <div class="nl-modal-badge nl-badge-quote">Free Consultation</div>
          <h2 class="nl-modal-title" id="nl-quote-title">Get a Free Quote</h2>
          <p class="nl-modal-subtitle">Tell us about your project. We'll send you a custom proposal within 24 hours.</p>

          <div class="nl-form-error" id="nl-quote-error"></div>

          <form id="nl-quote-form" autocomplete="on">
            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Name <span class="required">*</span></label>
                <input class="nl-form-input" type="text" name="name" placeholder="John Smith" required autocomplete="name">
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Email <span class="required">*</span></label>
                <input class="nl-form-input" type="email" name="email" placeholder="john@company.com" required autocomplete="email">
              </div>
            </div>

            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Phone <span class="required">*</span></label>
                <input class="nl-form-input" type="tel" name="phone" placeholder="(555) 123-4567" required autocomplete="tel">
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Company</label>
                <input class="nl-form-input" type="text" name="company" placeholder="Company name" autocomplete="organization">
              </div>
            </div>

            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Website</label>
                <input class="nl-form-input" type="url" name="website" placeholder="https://yoursite.com" autocomplete="url">
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Budget Range</label>
                <select class="nl-form-select" name="budget">
                  <option value="">Select budget</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $1,000">$500 – $1,000</option>
                  <option value="$1,000 - $2,500">$1,000 – $2,500</option>
                  <option value="$2,500 - $5,000">$2,500 – $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
              </div>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">Timeline</label>
              <select class="nl-form-select" name="timeline">
                <option value="">Select timeline</option>
                <option value="ASAP">ASAP (Rush)</option>
                <option value="1-2 weeks">1–2 weeks</option>
                <option value="2-4 weeks">2–4 weeks</option>
                <option value="1+ months">1+ months</option>
                <option value="Just exploring">Just exploring</option>
              </select>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">Project Details <span class="required">*</span></label>
              <textarea class="nl-form-textarea" name="details" placeholder="Describe your project, goals, and any specific requirements..." required></textarea>
            </div>

            <button type="submit" class="nl-form-submit nl-btn-quote" id="nl-quote-submit">
              Send My Request
            </button>
          </form>
        </div>

        <!-- Success -->
        <div class="nl-form-feedback" id="nl-quote-success">
          <span class="nl-feedback-icon">🚀</span>
          <h3 class="nl-feedback-title">Quote Request Sent!</h3>
          <p class="nl-feedback-text">We've received your project details. Expect a custom proposal in your inbox within 24 hours.<br><br>Need it faster? Call us at <a href="tel:9412573059">(941) 257-3059</a></p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeQuoteModal();
    });

    // Form submission
    document.getElementById('nl-quote-form').addEventListener('submit', handleQuoteSubmit);
  }

  // ─── Build Purchase Modal HTML ────────────────────────────────
  function createPurchaseModal() {
    const overlay = document.createElement('div');
    overlay.className = 'nl-modal-overlay';
    overlay.id = 'nl-purchase-overlay';
    overlay.innerHTML = `
      <div class="nl-modal" role="dialog" aria-labelledby="nl-purchase-title">
        <button class="nl-modal-close" aria-label="Close" onclick="closePurchaseModal()">&times;</button>

        <!-- Form -->
        <div id="nl-purchase-form-wrap">
          <div class="nl-modal-badge nl-badge-purchase">Single Page • 2-Day Delivery</div>
          <h2 class="nl-modal-title" id="nl-purchase-title">Order Your Landing Page</h2>

          <div class="nl-price-tag">
            <span class="nl-price-amount">$199</span>
            <span class="nl-price-desc">one-time payment</span>
          </div>

          <div class="nl-form-error" id="nl-purchase-error"></div>

          <form id="nl-purchase-form" autocomplete="on">
            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Name <span class="required">*</span></label>
                <input class="nl-form-input" type="text" name="name" placeholder="John Smith" required autocomplete="name">
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Email <span class="required">*</span></label>
                <input class="nl-form-input" type="email" name="email" placeholder="john@company.com" required autocomplete="email">
              </div>
            </div>

            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Phone <span class="required">*</span></label>
                <input class="nl-form-input" type="tel" name="phone" placeholder="(555) 123-4567" required autocomplete="tel">
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Company</label>
                <input class="nl-form-input" type="text" name="company" placeholder="Company name" autocomplete="organization">
              </div>
            </div>

            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Website</label>
                <input class="nl-form-input" type="url" name="website" placeholder="https://yoursite.com" autocomplete="url">
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Location</label>
                <input class="nl-form-input" type="text" name="location" placeholder="City, State" autocomplete="address-level2">
              </div>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">What Do You Need? <span class="required">*</span></label>
              <textarea class="nl-form-textarea" name="needs" placeholder="Describe your business, target audience, and what you want the landing page to achieve..." required></textarea>
            </div>

            <button type="submit" class="nl-form-submit nl-btn-purchase" id="nl-purchase-submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              Pay $199 with PayPal
            </button>

            <div class="nl-secure-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              Secure checkout via PayPal — 256-bit encryption
            </div>
          </form>
        </div>

        <!-- Success (redirect to PayPal) -->
        <div class="nl-form-feedback" id="nl-purchase-success">
          <span class="nl-feedback-icon">✅</span>
          <h3 class="nl-feedback-title">Redirecting to PayPal...</h3>
          <p class="nl-feedback-text">You're being redirected to PayPal to complete your payment. If not redirected automatically, <a href="#" id="nl-paypal-link">click here</a>.</p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePurchaseModal();
    });

    // Form submission
    document.getElementById('nl-purchase-form').addEventListener('submit', handlePurchaseSubmit);
  }

  // ─── Modal Open / Close ───────────────────────────────────────
  window.openQuoteModal = function () {
    const overlay = document.getElementById('nl-quote-overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Reset state
    document.getElementById('nl-quote-form').reset();
    document.getElementById('nl-quote-form-wrap').style.display = '';
    document.getElementById('nl-quote-success').classList.remove('active');
    document.getElementById('nl-quote-error').classList.remove('active');
    document.getElementById('nl-quote-error').textContent = '';
  };

  window.closeQuoteModal = function () {
    document.getElementById('nl-quote-overlay').classList.remove('active');
    document.body.style.overflow = '';
  };

  window.openPurchaseModal = function () {
    const overlay = document.getElementById('nl-purchase-overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Reset state
    document.getElementById('nl-purchase-form').reset();
    document.getElementById('nl-purchase-form-wrap').style.display = '';
    document.getElementById('nl-purchase-success').classList.remove('active');
    document.getElementById('nl-purchase-error').classList.remove('active');
    document.getElementById('nl-purchase-error').textContent = '';
  };

  window.closePurchaseModal = function () {
    document.getElementById('nl-purchase-overlay').classList.remove('active');
    document.body.style.overflow = '';
  };

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuoteModal();
      closePurchaseModal();
    }
  });

  // ─── Form Handlers ───────────────────────────────────────────
  function showError(elementId, message) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.classList.add('active');
  }

  function setButtonLoading(btn, loading) {
    if (loading) {
      btn.disabled = true;
      btn._originalHTML = btn.innerHTML;
      btn.innerHTML = '<div class="nl-spinner"></div> Processing...';
    } else {
      btn.disabled = false;
      btn.innerHTML = btn._originalHTML;
    }
  }

  async function handleQuoteSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('nl-quote-submit');
    const errorEl = 'nl-quote-error';

    // Clear previous errors
    document.getElementById(errorEl).classList.remove('active');

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      company: form.company.value.trim(),
      website: form.website.value.trim(),
      budget: form.budget.value,
      timeline: form.timeline.value,
      details: form.details.value.trim(),
      formType: 'quote',
    };

    if (!formData.name || !formData.email || !formData.phone || !formData.details) {
      showError(errorEl, 'Please fill in all required fields.');
      return;
    }

    setButtonLoading(btn, true);

    try {
      const res = await fetch('/api/lead-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      // Show success
      document.getElementById('nl-quote-form-wrap').style.display = 'none';
      document.getElementById('nl-quote-success').classList.add('active');
    } catch (err) {
      showError(errorEl, err.message);
    } finally {
      setButtonLoading(btn, false);
    }
  }

  async function handlePurchaseSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('nl-purchase-submit');
    const errorEl = 'nl-purchase-error';

    // Clear previous errors
    document.getElementById(errorEl).classList.remove('active');

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      company: form.company.value.trim(),
      website: form.website.value.trim(),
      location: form.location.value.trim(),
      needs: form.needs.value.trim(),
      formType: 'purchase',
    };

    if (!formData.name || !formData.email || !formData.phone || !formData.needs) {
      showError(errorEl, 'Please fill in all required fields.');
      return;
    }

    setButtonLoading(btn, true);

    try {
      // Step 1: Submit lead form (for admin email notification)
      const leadRes = await fetch('/api/lead-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!leadRes.ok) {
        const leadData = await leadRes.json();
        throw new Error(leadData.error || 'Failed to submit your details.');
      }

      // Step 2: Create PayPal order
      const paypalRes = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 199, formData }),
      });

      const paypalData = await paypalRes.json();

      if (!paypalRes.ok) {
        throw new Error(paypalData.error || 'Failed to create PayPal order. Please try again.');
      }

      // Show success & redirect
      document.getElementById('nl-purchase-form-wrap').style.display = 'none';
      document.getElementById('nl-purchase-success').classList.add('active');
      document.getElementById('nl-paypal-link').href = paypalData.approvalUrl;

      // Auto-redirect after short delay
      setTimeout(() => {
        window.location.href = paypalData.approvalUrl;
      }, 1500);
    } catch (err) {
      showError(errorEl, err.message);
    } finally {
      setButtonLoading(btn, false);
    }
  }

  // ─── Initialize ───────────────────────────────────────────────
  createQuoteModal();
  createPurchaseModal();
})();
