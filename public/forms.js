/**
 * Naslogic — Brutalist API Modal Forms
 * Injects high-conversion modal forms for PayPal checkout and Resend requests.
 * Connects directly to Next.js API routes.
 */

(function () {
  'use strict';

  // ─── Inject Brutalist CSS ─────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* Modal Overlay */
    .nl-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(13, 13, 13, 0.95);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
      padding: 60px 20px;
      overflow-y: auto;
    }

    .nl-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    /* Modal Container */
    .nl-modal {
      background: #000;
      border: 1px solid #27272A;
      width: 100%;
      max-width: 600px;
      padding: 50px 40px;
      position: relative;
      transform: translateY(20px);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Inter', sans-serif;
    }

    .nl-modal-overlay.active .nl-modal {
      transform: translateY(0);
    }

    /* Close Button */
    .nl-modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      background: transparent;
      border: 1px solid #27272A;
      color: #A1A1AA;
      font-size: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      border-radius: 0;
    }

    .nl-modal-close:hover {
      background: #FFF;
      color: #000;
      border-color: #FFF;
    }

    /* Header */
    .nl-modal-badge {
      display: inline-block;
      padding: 4px 12px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 20px;
      border: 1px solid #FF3333;
      color: #FF3333;
    }

    .nl-modal-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.03em;
      color: #F4F4F5;
      margin: 0 0 10px 0;
      text-transform: uppercase;
    }

    .nl-modal-subtitle {
      color: #A1A1AA;
      font-size: 0.95rem;
      line-height: 1.5;
      margin: 0 0 30px 0;
    }

    .nl-price-amount {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 3rem;
      font-weight: 700;
      color: #F4F4F5;
      line-height: 1;
      margin-bottom: 30px;
    }

    /* Forms */
    .nl-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .nl-form-group {
      margin-bottom: 20px;
    }

    .nl-form-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #F4F4F5;
      margin-bottom: 8px;
    }

    .nl-form-label .required {
      color: #FF3333;
    }

    .nl-form-input,
    .nl-form-select,
    .nl-form-textarea {
      width: 100%;
      padding: 16px;
      background: transparent;
      border: 1px solid #27272A;
      color: #F4F4F5;
      font-size: 0.95rem;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s ease;
      outline: none;
      border-radius: 0;
    }

    .nl-form-input:focus,
    .nl-form-select:focus,
    .nl-form-textarea:focus {
      border-color: #F4F4F5;
    }

    .nl-form-input::placeholder,
    .nl-form-textarea::placeholder {
      color: #444;
    }

    .nl-form-select {
      appearance: none;
      cursor: pointer;
    }

    .nl-form-select option {
      background: #000;
      color: #F4F4F5;
    }

    .nl-form-textarea {
      min-height: 100px;
      resize: vertical;
    }

    /* Buttons */
    .nl-form-submit {
      width: 100%;
      padding: 20px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      border: none;
      border-radius: 0;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 10px;
    }

    .nl-btn-quote {
      background: #F4F4F5;
      color: #000;
    }

    .nl-btn-quote:hover:not(:disabled) {
      background: #FFF;
      transform: translateY(-2px);
    }

    .nl-btn-purchase {
      background: #0070BA; /* PayPal Blue */
      color: #FFF;
    }

    .nl-btn-purchase:hover:not(:disabled) {
      background: #005EA6;
      transform: translateY(-2px);
    }

    .nl-form-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    /* Spinner */
    .nl-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Feedbacks */
    .nl-form-feedback { display: none; text-align: center; padding: 40px 0; }
    .nl-form-feedback.active { display: block; }

    .nl-form-error {
      background: rgba(255,51,51,0.1);
      border: 1px solid #FF3333;
      padding: 12px 16px;
      color: #FF3333;
      font-size: 0.9rem;
      margin-bottom: 20px;
      display: none;
      text-transform: uppercase;
      font-weight: 600;
    }
    .nl-form-error.active { display: block; }

    /* PayPal Secure */
    .nl-secure-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
      color: #666;
      font-size: 0.8rem;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.05em;
    }
    .nl-secure-badge svg { width: 14px; height: 14px; fill: #666; }

    /* Fix scroll jump on body lock */
    body.nl-modal-open { overflow: hidden; padding-right: 8px; }

    @media (max-width: 600px) {
      .nl-modal { padding: 40px 20px; }
      .nl-form-row { grid-template-columns: 1fr; gap: 0; }
      .nl-modal-overlay { padding: 0; }
      .nl-modal { min-height: 100vh; transform: none; border: none; }
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
          <div class="nl-modal-badge">Application</div>
          <h2 class="nl-modal-title">Destroy Your Competitors.</h2>
          <p class="nl-modal-subtitle">Submit your intel below. We will review your numbers and provide a custom battle plan within 24 hours.</p>
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
            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Phone <span class="required">*</span></label>
                <input class="nl-form-input" type="tel" name="phone" required>
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Company / URL</label>
                <input class="nl-form-input" type="text" name="company">
              </div>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">Primary Offer <span class="required">*</span></label>
              <input class="nl-form-input" type="text" name="offer" placeholder="e.g. B2B SaaS, Roof Replacements, Legal Counsel" required>
            </div>

            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Traffic Source</label>
                <input class="nl-form-input" type="text" name="traffic" placeholder="Meta Ads, Google, SEO">
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Current CVR</label>
                <input class="nl-form-input" type="text" name="cvr" placeholder="e.g. 1.5%">
              </div>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">Biggest Roadblock <span class="required">*</span></label>
              <textarea class="nl-form-textarea" name="roadblock" placeholder="What is stopping you from scaling right now?" required></textarea>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">Competitor Kill List</label>
              <input class="nl-form-input" type="text" name="competitors" placeholder="URLs of competitors you want to beat">
            </div>

            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Budget Range</label>
                <select class="nl-form-select" name="budget">
                  <option value="$799 - $1,500">Core ($799 - $1,500)</option>
                  <option value="$1,500 - $2,500">Arsenal ($1,500 - $2,500)</option>
                  <option value="$2,500+">Enterprise ($2,500+)</option>
                </select>
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Timeline</label>
                <select class="nl-form-select" name="timeline">
                  <option value="ASAP">ASAP (Priority)</option>
                  <option value="2-4 weeks">2-4 Weeks</option>
                  <option value="Just Exploring">Just Exploring</option>
                </select>
              </div>
            </div>

            <button type="submit" class="nl-form-submit nl-btn-quote" id="nl-quote-submit">Submit Intel</button>
          </form>
        </div>

        <div class="nl-form-feedback" id="nl-quote-success">
          <h2 class="nl-modal-title">Intel Received.</h2>
          <p class="nl-modal-subtitle">We are analyzing your numbers. We will reach out within 24 hours.</p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeQuoteModal(); });
    document.getElementById('nl-quote-form').addEventListener('submit', handleQuoteSubmit);
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
          <div class="nl-modal-badge" style="border-color: #0070BA; color: #0070BA;">48-Hour Delivery</div>
          <h2 class="nl-modal-title">The Landing Page.</h2>
          <div class="nl-price-amount">$199</div>
          <div class="nl-form-error" id="nl-purchase-error"></div>
          
          <form id="nl-purchase-form">
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
            <div class="nl-form-row">
              <div class="nl-form-group">
                <label class="nl-form-label">Phone <span class="required">*</span></label>
                <input class="nl-form-input" type="tel" name="phone" required>
              </div>
              <div class="nl-form-group">
                <label class="nl-form-label">Brand URL</label>
                <input class="nl-form-input" type="url" name="website">
              </div>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">The Target (Service/Offer) <span class="required">*</span></label>
              <input class="nl-form-input" type="text" name="target" placeholder="e.g. Free Roof Inspections" required>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">The Mission (Primary Action) <span class="required">*</span></label>
              <input class="nl-form-input" type="text" name="mission" placeholder="e.g. Fill out lead form, Buy $50 product" required>
            </div>

            <div class="nl-form-group">
              <label class="nl-form-label">The Audience (Who is buying) <span class="required">*</span></label>
              <input class="nl-form-input" type="text" name="audience" placeholder="e.g. Local homeowners, B2B founders" required>
            </div>

            <button type="submit" class="nl-form-submit nl-btn-purchase" id="nl-purchase-submit">
              Pay $199 with PayPal
            </button>

            <div class="nl-secure-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              Encrypted Checkout Protocol
            </div>
          </form>
        </div>

        <div class="nl-form-feedback" id="nl-purchase-success">
          <h2 class="nl-modal-title">Initiating Secue Transfer.</h2>
          <p class="nl-modal-subtitle">You are being redirected to PayPal...</p>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePurchaseModal(); });
    document.getElementById('nl-purchase-form').addEventListener('submit', handlePurchaseSubmit);
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
      btn.innerHTML = '<div class="nl-spinner"></div> ENCRYPTING...';
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
      company: form.company.value.trim(),
      offer: form.offer.value.trim(),
      traffic: form.traffic.value.trim(),
      cvr: form.cvr.value.trim(),
      roadblock: form.roadblock.value.trim(),
      competitors: form.competitors.value.trim(),
      budget: form.budget.value,
      timeline: form.timeline.value
    };

    setButtonLoading(btn, true);

    try {
      const res = await fetch('/api/lead-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'System override failed. Try again.');
      
      document.getElementById('nl-quote-form-wrap').style.display = 'none';
      document.getElementById('nl-quote-success').classList.add('active');
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.classList.add('active');
    } finally {
      setButtonLoading(btn, false);
    }
  }

  async function handlePurchaseSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('nl-purchase-submit');
    const errorEl = document.getElementById('nl-purchase-error');
    errorEl.classList.remove('active');

    const formData = {
      formType: 'purchase',
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      website: form.website.value.trim(),
      target: form.target.value.trim(),
      mission: form.mission.value.trim(),
      audience: form.audience.value.trim()
    };

    setButtonLoading(btn, true);

    try {
      // Step 1: Dispatch Intel to server
      const leadRes = await fetch('/api/lead-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!leadRes.ok) throw new Error('Failed to cache intel. Connection dropped.');

      // Step 2: Initialize PayPal Checkout
      const paypalRes = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 199, formData }),
      });
      const paypalData = await paypalRes.json();
      if (!paypalRes.ok) throw new Error(paypalData.error || 'Payment gateway routing failed.');

      document.getElementById('nl-purchase-form-wrap').style.display = 'none';
      document.getElementById('nl-purchase-success').classList.add('active');
      
      setTimeout(() => { window.location.href = paypalData.approvalUrl; }, 1200);
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.classList.add('active');
    } finally {
      setButtonLoading(btn, false);
    }
  }

  // Auto-initialize
  createQuoteModal();
  createPurchaseModal();

})();
