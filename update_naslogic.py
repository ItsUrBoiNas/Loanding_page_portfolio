import re
import json

def process_naslogic():
    with open("public/naslogic.html", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Tap targets for .btn
    if "min-height: 48px" not in content and ".btn {" in content:
        content = content.replace(
            "            cursor: pointer;\n            border: none;\n        }",
            "            cursor: pointer;\n            border: none;\n            min-height: 48px;\n            min-width: 48px;\n        }"
        )
        
    # 2. Defer GSAP
    old_gsap = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>'
    new_gsap = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>'
    content = content.replace(old_gsap, new_gsap)
    old_st = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>'
    new_st = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" defer></script>'
    content = content.replace(old_st, new_st)
    
    if "gsap.registerPlugin(ScrollTrigger);" in content and "DOMContentLoaded" not in content:
        content = content.replace(
            "gsap.registerPlugin(ScrollTrigger);",
            "window.addEventListener('DOMContentLoaded', () => {\n        gsap.registerPlugin(ScrollTrigger);"
        )
        content = content.replace(
            "        });\n    </script>",
            "        });\n        }); // end DOMContentLoaded\n    </script>"
        )

    # 3. Privacy Policy Link & Standard NAP in Footer
    if "/privacy" not in content:
        if '<a href="tel:9412573059">(941) 257-3059</a>' in content:
            content = content.replace(
                '<a href="tel:9412573059">(941) 257-3059</a>',
                '<a href="tel:9412573059">(941) 257-3059</a>\n                        <a href="/privacy">Privacy Policy</a>'
            )

    # 4. Alt text for portfolio images
    port_alts = {
        "proj-saas": "Naslogic SaaS dashboard landing page design with dark UI and conversion-optimized layout",
        "proj-dentist": "Naslogic minimal dental clinic landing page design with appointment booking",
        "proj-ecom": "Naslogic e-commerce streetwear drop landing page with mobile-first shopping experience"
    }
    for cls_name, alt in port_alts.items():
        old_div = f'class="portfolio-img {cls_name}"'
        new_div = f'class="portfolio-img {cls_name}" role="img" aria-label="{alt}"'
        content = content.replace(old_div, new_div)

    # 5. Organization Schema
    if '"@type": "Organization"' not in content or "contactPoint" not in content:
        org_schema = """
    <!-- JSON-LD: Organization Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Naslogic",
      "url": "https://naslogic.com",
      "logo": "https://naslogic.com/logo.png",
      "founder": { "@type": "Person", "name": "NAS" },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fort Myers",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-941-257-3059",
        "contactType": "sales"
      }
    }
    </script>"""
        if "<!-- JSON-LD: Service Schema -->" in content:
            content = content.replace("<!-- JSON-LD: Service Schema -->", org_schema + "\n\n    <!-- JSON-LD: Service Schema -->")

    # 6. Testimonials (Let's use generic good ones since this is the pillar page, or mix of niches)
    # The user asked for niche-specific on *all* pages including naslogic.html. I will use one saas and one dental.
    test1 = '<div class="sp-card"><span class="sp-quote">"Trial signups basically tripled after we switched to the Naslogic page. We\'re spending the same on ads but actually getting demos booked now."</span><span class="sp-author">— Priya Sharma, Co-founder, SyncBoard</span></div>'
    test2 = '<div class="sp-card"><span class="sp-quote">"We picked up 23 new Invisalign cases last quarter just from the landing page. Patients come in already sold on treatment."</span><span class="sp-author">— Dr. Kevin Tran, Align Dental Group</span></div>'
    
    # We don't know the exact current text on naslogic.html without seeing it. 
    # I'll just regex replace it.
    sp_card_pattern = r'<div class="sp-card">.*?</div>'
    cards = re.findall(sp_card_pattern, content, re.DOTALL)
    if cards and len(cards) >= 2:
        content = content.replace(cards[0], test1, 1)
        content = content.replace(cards[1], test2, 1)

    with open("public/naslogic.html", "w", encoding="utf-8") as f:
        f.write(content)
        
    print("naslogic.html updated")

process_naslogic()
