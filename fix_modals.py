import os
import glob
import re

public_dir = "public"
html_files = glob.glob(os.path.join(public_dir, "*.html"))

for filepath in html_files:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        encoding = "utf-8"
    except UnicodeDecodeError:
        with open(filepath, "r", encoding="windows-1252") as f:
            content = f.read()
        encoding = "windows-1252"

    if 'id="nas-modal-overlay"' not in content:
        continue

    # Fix CSS contrast for form labels
    content = re.sub(r'color: #666;', r'color: #AAA;', content)
    
    # Improve input background to make it look more like a field and easier to read
    content = re.sub(
        r'width: 100%; background: transparent; border: none; border-bottom: 1px solid #333;\s*padding: 0.8rem 0;',
        r'width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid #444; border-radius: 6px;\n    padding: 0.8rem 1rem;',
        content
    )
    # Re-apply the focus border color if it was replaced
    content = re.sub(r'\.nas-input:focus \{ border-color: #FFF; \}', r'.nas-input:focus { border-color: #FFF; background: rgba(255,255,255,0.1); outline: none; }', content)

    # Fix the copy to 5th grade reading level
    content = re.sub(r'Initiate Protocol', r'Let\'s Talk', content)
    content = re.sub(r'Provide the specifics of your initiative\. Our partners will evaluate your inquiry within 24 hours\.', r'Tell us what you need. We will get back to you in 24 hours.', content)
    content = re.sub(r'Commission Build', r'Send Message', content)
    content = re.sub(r'Transmitting\.\.\.', r'Sending...', content)
    content = re.sub(r'Transmission successful\. We will contact you shortly\.', r'Got it! We will reach out to you soon.', content)
    content = re.sub(r'An error occurred during transmission\.', r'Something went wrong. Please try again.', content)

    content = re.sub(r'Tell us a bit about your project\. We will get back to you within 24 hours\.', r'Tell us what you need. We will get back to you in 24 hours.', content)
    content = re.sub(r'Send My Info', r'Send Message', content)
    
    # Make modal title a bit bolder
    content = re.sub(r'\.nas-modal-title \{ font-size: 2rem; margin-bottom: 0\.5rem; font-weight: 300; \}', r'.nas-modal-title { font-size: 2rem; margin-bottom: 0.5rem; font-weight: 500; }', content)

    with open(filepath, "w", encoding=encoding) as f:
        f.write(content)

print("Modals updated.")
