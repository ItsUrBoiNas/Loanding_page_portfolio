import os

HTML_FILES = ['legal.html', 'roofing.html', 'realestate.html', 'medspa.html', 'dental.html', 'fitness.html', 'hvac.html', 'plumbing.html', 'saas.html', 'ecommerce.html', 'experience.html', 'restaurants.html']

MODAL_CODE = """
<!-- NASLOGIC UNIVERSAL INTAKE MODAL -->
<style>
#nas-modal-overlay {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(10px);
    z-index: 999999; display: flex; justify-content: center; align-items: center;
    opacity: 0; pointer-events: none; transition: opacity 0.4s ease;
    font-family: inherit;
}
#nas-modal-overlay.active { opacity: 1; pointer-events: auto; }
#nas-modal-content {
    background: #0A0A0A; border: 1px solid rgba(255,255,255,0.1);
    width: 90%; max-width: 500px; padding: 3rem; color: #FFF;
    position: relative; transform: translateY(20px); transition: transform 0.4s ease;
}
#nas-modal-overlay.active #nas-modal-content { transform: translateY(0); }
.nas-close-btn {
    position: absolute; top: 1.5rem; right: 1.5rem; color: #888;
    background: transparent; border: none; font-size: 1.5rem; cursor: pointer; transition: color 0.2s;
}
.nas-close-btn:hover { color: #FFF; }
.nas-modal-title { font-size: 2rem; margin-bottom: 0.5rem; font-weight: 300; }
.nas-modal-desc { color: #888; font-size: 0.9rem; margin-bottom: 2rem; line-height: 1.5; }
.nas-form-group { margin-bottom: 1.5rem; }
.nas-form-group label { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 0.5rem; }
.nas-input {
    width: 100%; background: transparent; border: none; border-bottom: 1px solid #333;
    padding: 0.8rem 0; color: #FFF; font-size: 1rem; font-family: inherit; outline: none; transition: border-color 0.3s;
}
.nas-input:focus { border-color: #FFF; }
.nas-submit-btn {
    width: 100%; background: #FFF; color: #000; border: none; padding: 1.2rem;
    font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px;
    font-weight: 600; cursor: pointer; margin-top: 1rem; transition: background 0.3s, color 0.3s;
}
.nas-submit-btn:hover { background: #CCC; }
.nas-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
#nas-form-status { margin-top: 1rem; font-size: 0.85rem; text-align: center; display: none; }
.nas-success { color: #10B981; }
.nas-error { color: #EF4444; }
</style>

<div id="nas-modal-overlay">
    <div id="nas-modal-content">
        <button class="nas-close-btn" id="nas-close-modal">&times;</button>
        <h3 class="nas-modal-title" style="font-family: inherit;">Initiate Protocol</h3>
        <p class="nas-modal-desc" style="font-family: inherit;">Provide the specifics of your initiative. Our partners will evaluate your inquiry within 24 hours.</p>
        
        <form id="nas-lead-form">
            <input type="hidden" name="formType" value="quote">
            <div class="nas-form-group">
                <label>Name</label>
                <input type="text" name="name" class="nas-input" required>
            </div>
            <div class="nas-form-group">
                <label>Email</label>
                <input type="email" name="email" class="nas-input" required>
            </div>
            <div class="nas-form-group">
                <label>Phone</label>
                <input type="tel" name="phone" class="nas-input" required>
            </div>
            <div class="nas-form-group">
                <label>Project Details</label>
                <input type="text" name="details" class="nas-input" required>
            </div>
            <button type="submit" class="nas-submit-btn" id="nas-submit-btn">Commission Build</button>
            <div id="nas-form-status"></div>
        </form>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('nas-modal-overlay');
    const closeBtn = document.getElementById('nas-close-modal');
    const form = document.getElementById('nas-lead-form');
    const statusDiv = document.getElementById('nas-form-status');
    const submitBtn = document.getElementById('nas-submit-btn');

    // Intercept mailto links
    document.querySelectorAll('a[href^="mailto:hello@naslogic.com"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('active');
        });
    });

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            statusDiv.style.display = 'none';
        });
    }

    if(overlay) {
        overlay.addEventListener('click', (e) => {
            if(e.target === overlay) {
                overlay.classList.remove('active');
                statusDiv.style.display = 'none';
            }
        });
    }

    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // UI updates
            submitBtn.disabled = true;
            submitBtn.innerText = 'Transmitting...';
            statusDiv.style.display = 'none';
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch('/api/lead-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                const result = await res.json();
                
                statusDiv.style.display = 'block';
                if(res.ok) {
                    statusDiv.className = 'nas-success';
                    statusDiv.innerText = 'Transmission successful. We will contact you shortly.';
                    form.reset();
                    setTimeout(() => {
                        overlay.classList.remove('active');
                        submitBtn.innerText = 'Commission Build';
                        submitBtn.disabled = false;
                        statusDiv.style.display = 'none';
                    }, 3000);
                } else {
                    throw new Error(result.error || 'Failed to submit');
                }
            } catch (err) {
                statusDiv.style.display = 'block';
                statusDiv.className = 'nas-error';
                statusDiv.innerText = err.message || 'An error occurred during transmission.';
                submitBtn.innerText = 'Commission Build';
                submitBtn.disabled = false;
            }
        });
    }
});
</script>
<!-- /NASLOGIC UNIVERSAL INTAKE MODAL -->
"""

for filename in HTML_FILES:
    path = os.path.join(r"C:\Users\nasir\OneDrive\Desktop\Projects\landing page portfolio\public", filename)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if "NASLOGIC UNIVERSAL INTAKE MODAL" not in content:
            # Insert right before </body>
            if "</body>" in content:
                content = content.replace("</body>", MODAL_CODE + "\n</body>")
            else:
                content += MODAL_CODE
                
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Inject success: {filename}")
        else:
            print(f"Already injected: {filename}")
