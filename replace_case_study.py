import sys
import re

filepath = r'c:\Users\nasir\OneDrive\Desktop\Projects\landing page portfolio\public\naslogic.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'<h2 class="autopsy-header gs-reveal" style="margin-bottom: 20px;">Client Case Studies\.</h2>.*?<!-- CTA Strip -->.*?</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)

replacement = """<h2 class="autopsy-header gs-reveal" style="font-size: clamp(2rem, 4vw, 3.5rem); margin-bottom: 20px;">How We Turned a Dead Website Into a Lead Machine.</h2>
                <p class="hero-sub gs-reveal" style="max-width: 800px; margin-bottom: 50px; font-size: 1.2rem;">Stop wondering why your phone isn't ringing. We build dead-simple pages that make you the obvious choice and force people to call you.</p>

                <div class="case-grid">
                    <div class="case-row gs-reveal" style="background: var(--surface); border: 1px solid var(--surface-border); border-radius: 12px; overflow: hidden; padding: 40px;">
                        <div style="display: flex; flex-wrap: wrap; gap: 50px; align-items: stretch;">
                            
                            <!-- Left: Before / After Visuals -->
                            <div style="flex: 1 1 400px; display: flex; flex-direction: column; gap: 30px;">
                                <!-- BEFORE -->
                                <div>
                                    <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 15px; padding: 6px 14px; background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.2); border-radius: 20px;">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--redline)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                        <div style="font-size: 0.85rem; font-weight: 700; color: var(--redline); text-transform: uppercase; letter-spacing: 0.05em;">Before: Clunky &amp; Confusing</div>
                                    </div>
                                    <div style="border-radius: 8px; overflow: hidden; border: 1px solid rgba(217, 83, 79, 0.3); background: #fff; height: 300px;">
                                        <img src="/showcase/vending-screenshot-before.png" alt="Before Design" style="width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: 0.9;">
                                    </div>
                                </div>

                                <!-- AFTER -->
                                <div>
                                    <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 15px; padding: 6px 14px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px;">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.05em;">After: Built for Phone Calls</div>
                                    </div>
                                    <div style="border-radius: 8px; overflow: hidden; border: 1px solid var(--accent); height: 350px;">
                                        <a href="https://vending-machine-finder.vercel.app/index.html" target="_blank" rel="noopener" style="display: block; width: 100%; height: 100%;">
                                            <img src="/showcase/vending-screenshot-hero.png" alt="After Design" style="width: 100%; height: 100%; object-fit: cover; object-position: top;">
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: The Story & CTA -->
                            <div style="flex: 1 1 450px; display: flex; flex-direction: column; justify-content: center;">
                                
                                <div style="margin-bottom: 30px;">
                                    <h3 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 10px; font-weight: 700; display: flex; align-items: center; gap: 10px;">
                                        <span style="color: var(--redline); font-size: 1.8rem;">&times;</span> The Problem
                                    </h3>
                                    <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; padding-left: 32px;">Waking up every day hoping the phone rings, but losing every job to competitors because they looked unprofessional online.</p>
                                </div>

                                <div style="margin-bottom: 30px;">
                                    <h3 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 10px; font-weight: 700; display: flex; align-items: center; gap: 10px;">
                                        <span style="color: #FBBF24; font-size: 1.8rem;">&#9881;</span> The Fix
                                    </h3>
                                    <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; padding-left: 32px;">We built a dead-simple page focused purely on getting people to call.</p>
                                </div>

                                <div style="margin-bottom: 40px; background: rgba(16, 185, 129, 0.05); padding: 25px; border-radius: 8px; border-left: 4px solid #10B981;">
                                    <h3 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 10px; font-weight: 700; display: flex; align-items: center; gap: 10px;">
                                        <span style="color: #10B981; font-size: 1.8rem;">&#10003;</span> The Result
                                    </h3>
                                    <p style="font-size: 1.15rem; color: var(--text-main); line-height: 1.6; font-weight: 600;">The phone started ringing 3-4 times a day. Finally had the cash flow to buy that Porsche 911.</p>
                                </div>

                                <a href="javascript:void(0)" onclick="openQuoteModal()" class="btn btn-primary" style="background: #2563EB; color: white; border: none; padding: 18px 30px; font-size: 1.1rem; font-weight: 700; text-align: center; border-radius: 6px; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3); text-decoration: none;">
                                    Discover The Exact Formula We Use (Zero Obligation)
                                </a>
                            </div>

                        </div>
                    </div>
                </div>"""

if re.search(pattern, content):
    new_content = re.sub(pattern, replacement, content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced successfully.")
else:
    print("Pattern not found.")
