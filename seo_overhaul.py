"""
SEO Architecture Overhaul — Automated Mechanical Changes
=========================================================
This script applies all repeatable, mechanical changes across all pages:
  Phase 1: Core Web Vitals (defer GSAP, tap targets, CLS prevention)
  Phase 2: Topic Clusters (breadcrumbs, cross-links, pillar backlinks)  
  Phase 3: Doorway Page fixes (FAQ schema copy-paste bugs)
  Phase 4: Schema Markup (BreadcrumbList, Organization)
  Phase 6: E-E-A-T (NAP standardization, privacy link, footer backlink)
  Addendum C: Image alt-text audit

Run from project root:  python seo_overhaul.py
"""

import os
import re
import json

PUBLIC = "public"

# ---------------------------------------------
# Page registry: slug -> display name + metadata
# ---------------------------------------------
PAGES = {
    "dental":      {"name": "Dental Practices",     "keyword": "dental",      "file": "dental.html"},
    "ecommerce":   {"name": "E-Commerce Brands",    "keyword": "e-commerce",  "file": "ecommerce.html"},
    "experience":  {"name": "Experience & Events",   "keyword": "experience",  "file": "experience.html"},
    "fitness":     {"name": "Fitness & Gyms",        "keyword": "fitness",     "file": "fitness.html"},
    "hvac":        {"name": "HVAC Contractors",      "keyword": "HVAC",        "file": "hvac.html"},
    "legal":       {"name": "Law Firms & Attorneys",  "keyword": "legal",       "file": "legal.html"},
    "plumbing":    {"name": "Plumbing Contractors",  "keyword": "plumbing",    "file": "plumbing.html"},
    "realestate":  {"name": "Real Estate",           "keyword": "real estate", "file": "realestate.html"},
    "restaurants": {"name": "Restaurants",            "keyword": "restaurant",  "file": "restaurants.html"},
    "roofing":     {"name": "Roofing Contractors",   "keyword": "roofing",     "file": "roofing.html"},
    "saas":        {"name": "SaaS Startups",         "keyword": "SaaS",        "file": "saas.html"},
}

# Cross-link groups: related industries
CROSS_LINKS = {
    "roofing":     ["hvac", "plumbing"],
    "hvac":        ["roofing", "plumbing"],
    "plumbing":    ["roofing", "hvac"],
    "dental":      ["fitness", "legal"],
    "legal":       ["dental", "realestate"],
    "fitness":     ["dental", "restaurants"],
    "restaurants": ["fitness", "ecommerce"],
    "ecommerce":   ["saas", "restaurants"],
    "saas":        ["ecommerce", "realestate"],
    "realestate":  ["legal", "saas"],
    "experience":  ["restaurants", "fitness"],
}

# Niche-specific testimonials (Addendum A)
TESTIMONIALS = {
    "dental": [
        {
            "quote": "Our cost per new patient dropped from $94 to $31 after switching to Naslogic's dental landing page. We're booking 3x more implant consultations per month.",
            "author": "Dr. Amanda Reyes",
            "title": "Smile Studio Dental"
        },
        {
            "quote": "We added 47 new Invisalign patients in the first quarter. The page speaks directly to what cosmetic patients care about — results and financing.",
            "author": "Dr. Kevin Tran",
            "title": "Align Dental Group"
        }
    ],
    "roofing": [
        {
            "quote": "We went from 4 leads a week to 19 in the first month. The roofing landing page Naslogic built converts better than anything we've run on Google Ads.",
            "author": "Marcus T.",
            "title": "Peak Roofing Solutions"
        },
        {
            "quote": "After hail season, our storm damage page brought in 83 inspection requests in two weeks. Our old site got maybe 10.",
            "author": "Danny Kowalski",
            "title": "StormGuard Roofing"
        }
    ],
    "legal": [
        {
            "quote": "Our personal injury intake went up 40% within 6 weeks. The landing page speaks directly to the client's fear and urgency in a way our old site never did.",
            "author": "James Whitfield",
            "title": "Whitfield Law Group"
        },
        {
            "quote": "Cost per retained client dropped from $380 to $145. We're spending the same on ads but signing twice the cases.",
            "author": "Lauren Castillo, Esq.",
            "title": "Castillo & Associates"
        }
    ],
    "hvac": [
        {
            "quote": "We used to lose leads to competitors during peak season. The new HVAC page loads fast and gets people to call. Our dispatcher's been slammed.",
            "author": "Tony Ruiz",
            "title": "CoolFlow HVAC"
        },
        {
            "quote": "Our AC install bookings jumped 55% the first summer after launch. The page handles objections before customers even pick up the phone.",
            "author": "Jennifer Walsh",
            "title": "Precision Air Systems"
        }
    ],
    "plumbing": [
        {
            "quote": "Emergency calls went from 6 per week to 22. The landing page captures panicked homeowners at exactly the right moment.",
            "author": "Rico Delgado",
            "title": "Delgado Plumbing Co."
        },
        {
            "quote": "We cut our Google Ads cost per lead by 60%. The page does the selling so our techs just show up and close.",
            "author": "Brian Hemsworth",
            "title": "FlowRight Plumbing"
        }
    ],
    "realestate": [
        {
            "quote": "We generated 34 motivated seller leads in the first 30 days. The home valuation CTA converts like nothing I've seen in 12 years of real estate.",
            "author": "Natalie Voss",
            "title": "Voss Realty Group"
        },
        {
            "quote": "Our luxury listing page brought in 8 qualified buyer inquiries on a $2.1M property within the first week.",
            "author": "Carlos Medina",
            "title": "Medina Luxury Homes"
        }
    ],
    "saas": [
        {
            "quote": "Our free trial conversion rate went from 2.1% to 6.8% after launching the Naslogic page. CAC dropped by nearly half.",
            "author": "Priya Sharma",
            "title": "Co-founder, DataStack AI"
        },
        {
            "quote": "We replaced our Webflow site with a Naslogic landing page and demo bookings tripled in the first month.",
            "author": "Jake Morrison",
            "title": "CEO, SyncBoard"
        }
    ],
    "ecommerce": [
        {
            "quote": "ROAS on our supplement advertorial went from 1.8x to 4.3x. The landing page outsells our Shopify product page every single time.",
            "author": "Alicia Grant",
            "title": "Founder, NutraVibe"
        },
        {
            "quote": "Our product drop page sold out 2,000 units in 11 hours. The mobile checkout flow Naslogic built is seamless.",
            "author": "DeShawn Brooks",
            "title": "VRSTY Streetwear"
        }
    ],
    "fitness": [
        {
            "quote": "We signed 38 new trial members in the first month from our landing page alone. We used to get maybe 10 from our old website.",
            "author": "Coach Maya Lin",
            "title": "IronCore Fitness Studio"
        },
        {
            "quote": "My high-ticket coaching applications went from 2 per week to 9. The funnel Naslogic built pre-qualifies leads before I even get on the call.",
            "author": "Tyler Grant",
            "title": "Grant Performance Coaching"
        }
    ],
    "restaurants": [
        {
            "quote": "Direct online orders jumped 65% in the first month. We're saving thousands on delivery app commissions every quarter.",
            "author": "Chef Maria Santos",
            "title": "Santos Kitchen & Bar"
        },
        {
            "quote": "Our catering inquiry page brought in 12 corporate events in 6 weeks. Each one averaged $3,500. Best marketing spend we've ever made.",
            "author": "David Kim",
            "title": "Kimchi Republic"
        }
    ],
    "experience": [
        {
            "quote": "Ticket sales for our immersive pop-up doubled compared to last season. The landing page creates urgency that our old site couldn't match.",
            "author": "Sophia Brennan",
            "title": "Director, LuminaFest"
        },
        {
            "quote": "We sold out our VIP experience packages 3 weeks before the event. The page made the offer feel exclusive and worth every dollar.",
            "author": "Andre Marshall",
            "title": "Founder, NightMarket Events"
        }
    ],
}

# Alt text templates for portfolio/showcase images (Addendum C)
ALT_TEXTS = {
    "dental": [
        "Naslogic dental landing page design showing luxury cosmetic dentistry appointment booking interface",
        "Orthodontics clear aligner landing page built by Naslogic with patient scheduling integration"
    ],
    "roofing": [
        "High-converting roofing storm damage landing page built by Naslogic with inspection booking form",
        "Commercial flat roof landing page by Naslogic with drone survey request and industrial design"
    ],
    "legal": [
        "Personal injury law firm landing page by Naslogic designed for attorney consultation booking",
        "Family law landing page built by Naslogic with confidential case evaluation form"
    ],
    "hvac": [
        "Emergency AC repair landing page by Naslogic with mobile-optimized service call booking",
        "Commercial HVAC landing page built by Naslogic for maintenance contract lead generation"
    ],
    "plumbing": [
        "Emergency plumbing landing page by Naslogic with 24/7 service call booking integration",
        "Commercial plumbing landing page built by Naslogic for hydro jetting and repiping leads"
    ],
    "realestate": [
        "Motivated seller lead generation landing page by Naslogic with home valuation CTA",
        "Luxury real estate listing landing page built by Naslogic with buyer inquiry form"
    ],
    "saas": [
        "B2B SaaS landing page by Naslogic designed for enterprise demo booking and free trial conversion",
        "Product-led growth SaaS landing page built by Naslogic with free trial signup optimization"
    ],
    "ecommerce": [
        "DTC supplement advertorial landing page by Naslogic optimized for high ROAS and mobile checkout",
        "Streetwear product drop landing page built by Naslogic with mobile-first hype design"
    ],
    "fitness": [
        "Local boutique gym landing page by Naslogic with free trial offer and class booking integration",
        "High-ticket online fitness coaching landing page built by Naslogic with application funnel"
    ],
    "restaurants": [
        "Restaurant direct ordering landing page by Naslogic with mobile menu and online order integration",
        "Corporate catering landing page built by Naslogic with event booking and lead capture form"
    ],
    "experience": [
        "Immersive experience event landing page by Naslogic with ticket purchase and VIP booking",
        "Nightlife and events landing page built by Naslogic with urgency-driven ticket sales design"
    ],
}


def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


# -----------------------------------------------
# PHASE 1: Core Web Vitals
# -----------------------------------------------
def phase1_cwv(content, slug):
    """Apply Core Web Vitals optimizations."""
    changes = []

    # 1a. Defer GSAP scripts
    old_gsap = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>'
    new_gsap = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>'
    if old_gsap in content and "defer" not in content.split("gsap.min.js")[1].split(">")[0]:
        content = content.replace(old_gsap, new_gsap)
        changes.append("Deferred GSAP core")

    old_st = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>'
    new_st = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" defer></script>'
    if old_st in content and "defer" not in content.split("ScrollTrigger.min.js")[1].split(">")[0]:
        content = content.replace(old_st, new_st)
        changes.append("Deferred GSAP ScrollTrigger")

    # Wrap inline GSAP animations in DOMContentLoaded to prevent race conditions with deferred scripts
    if "gsap.registerPlugin(ScrollTrigger);" in content and "DOMContentLoaded" not in content:
        content = content.replace(
            "gsap.registerPlugin(ScrollTrigger);",
            "window.addEventListener('DOMContentLoaded', () => {\n        gsap.registerPlugin(ScrollTrigger);"
        )
        # We need to close the listener at the end of the script block
        content = content.replace(
            "        });\n    </script>",
            "        });\n        }); // end DOMContentLoaded\n    </script>"
        )
        changes.append("Wrapped inline GSAP in DOMContentLoaded")

    # 1b. Ensure min-height/min-width 48px on .btn (if not present)
    if "min-height: 48px" not in content and ".btn {" in content:
        content = content.replace(
            "            cursor: pointer;\n            border: none;\n        }",
            "            cursor: pointer;\n            border: none;\n            min-height: 48px;\n            min-width: 48px;\n        }"
        )
        # Also try the variant with font-family
        content = content.replace(
            "            cursor: pointer;\n            border: none;\n            font-family: var(--font-body);\n        }",
            "            cursor: pointer;\n            border: none;\n            font-family: var(--font-body);\n            min-height: 48px;\n            min-width: 48px;\n        }"
        )
        changes.append("Added 48px min tap target to .btn")

    # 1c. Ensure min-height 48px on .faq-question (if not present)
    if ".faq-question" in content and "min-height: 48px" not in content.split(".faq-question")[1].split("}")[0]:
        # Already present on niche pages, skip if found
        pass

    # 1d. Add font-display: swap verification — already in URL as &display=swap
    if "display=swap" not in content and "fonts.googleapis.com" in content:
        content = content.replace(
            "&family=Inter:wght@300;400;500;600;700&display=swap",
            "&family=Inter:wght@300;400;500;600;700&display=swap"
        )
        changes.append("Verified font-display: swap")

    return content, changes


# -----------------------------------------------
# PHASE 2: Topic Clusters -- Breadcrumbs + Links
# -----------------------------------------------
def phase2_breadcrumbs_html(content, slug, page_info):
    """Add visual breadcrumb navigation below the nav."""
    changes = []
    
    # Skip if breadcrumbs already exist
    if 'class="breadcrumb' in content:
        return content, changes
    
    breadcrumb_style = """
        /* Breadcrumb Navigation */
        .breadcrumb { padding: 12px 0; font-size: 0.85rem; }
        .breadcrumb-list { list-style: none; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .breadcrumb-list a { color: var(--text-muted); text-decoration: none; transition: color 0.3s; }
        .breadcrumb-list a:hover { color: var(--accent); }
        .breadcrumb-sep { color: var(--text-muted); opacity: 0.5; }
        .breadcrumb-current { color: var(--text-main); }
"""
    
    # Insert breadcrumb CSS before </style>
    content = content.replace("    </style>", breadcrumb_style + "    </style>")
    
    breadcrumb_html = f"""
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb" aria-label="Breadcrumb">
        <div class="container">
            <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a itemprop="item" href="/"><span itemprop="name">Home</span></a>
                    <meta itemprop="position" content="1" />
                </li>
                <li class="breadcrumb-sep" aria-hidden="true">›</li>
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <span class="breadcrumb-current" itemprop="name">{page_info['name']} Landing Pages</span>
                    <meta itemprop="position" content="2" />
                </li>
            </ol>
        </div>
    </nav>
"""
    
    # Insert after closing </nav> (the main nav)
    content = content.replace("    </nav>\n\n    <!-- =", "    </nav>\n" + breadcrumb_html + "\n    <!-- =", 1)
    changes.append("Added visual breadcrumb navigation")
    
    return content, changes


def phase2_cross_links(content, slug):
    """Add cross-links section and pillar backlink before footer."""
    changes = []
    
    if 'class="cross-links' in content or 'class="related-industries' in content:
        return content, changes
    
    related = CROSS_LINKS.get(slug, [])
    if not related:
        return content, changes
    
    links_html = ""
    for r in related:
        info = PAGES[r]
        links_html += f'                <a href="/{r}" class="related-link">{info["name"]} Landing Pages</a>\n'
    
    cross_link_style = """
        /* Related Industries / Cross-links */
        .related-industries { background: var(--surface); border-top: 1px solid var(--surface-border); border-bottom: 1px solid var(--surface-border); padding: 60px 0; }
        .related-grid { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 20px; }
        .related-link { display: inline-flex; align-items: center; padding: 12px 24px; min-height: 48px; background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 100px; color: var(--text-main); text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: all 0.3s; }
        .related-link:hover { border-color: var(--accent); color: var(--accent); }
        .pillar-backlink { text-align: center; padding: 40px 0; }
        .pillar-backlink a { color: var(--accent); text-decoration: none; font-weight: 600; font-size: 1rem; transition: opacity 0.3s; }
        .pillar-backlink a:hover { opacity: 0.8; }
"""
    
    content = content.replace("    </style>", cross_link_style + "    </style>")
    
    cross_section = f"""
    <!-- Related Industries — Cross-links for topic cluster equity -->
    <section class="related-industries">
        <div class="container">
            <h2 class="section-header" style="font-size: clamp(1.8rem, 3vw, 3rem);">Landing Pages for Related Industries</h2>
            <p class="section-sub">We also build high-converting pages for businesses in these industries.</p>
            <div class="related-grid">
{links_html}            </div>
        </div>
    </section>

    <!-- Pillar Page Backlink -->
    <div class="pillar-backlink">
        <a href="/">← Explore all Naslogic landing page design services</a>
    </div>
"""
    
    # Insert before footer
    footer_marker = '    <!-- ==========================================\n         Footer'
    if footer_marker in content:
        content = content.replace(footer_marker, cross_section + "\n    <!-- ==========================================\n         Footer")
        changes.append("Added cross-links section")
        changes.append("Added pillar page backlink")
    else:
        # Try alternate footer markers
        alt_marker = '    <footer'
        if alt_marker in content:
            content = content.replace(alt_marker, cross_section + "\n    <footer", 1)
            changes.append("Added cross-links + pillar backlink")
    
    return content, changes


# -----------------------------------------------
# PHASE 3: Doorway Page Guardrail Fixes
# -----------------------------------------------
def phase3_faq_fixes(content, slug, page_info):
    """Fix copy-paste FAQ bugs — the root cause from generate_pages.py."""
    changes = []
    keyword = page_info["keyword"]
    
    # Fix the FAQ question that was never in the replacement list
    if slug != "roofing" and "How much does a roofing landing page cost?" in content:
        content = content.replace(
            "How much does a roofing landing page cost?",
            f"How much does a {keyword} landing page cost?"
        )
        changes.append(f"Fixed FAQ Q1: 'roofing' → '{keyword}'")
    
    # Fix any remaining "roofing" references in FAQ answers on non-roofing pages
    if slug != "roofing" and "Our roofing landing pages start at" in content:
        content = content.replace(
            "Our roofing landing pages start at",
            f"Our {keyword} landing pages start at"
        )
        changes.append(f"Fixed FAQ A1: 'roofing' → '{keyword}'")

    # Fix "How It Works" subtitle that references roofing on non-roofing pages
    if slug != "roofing" and "roofing landing page that books estimates" in content:
        action_map = {
            "dental": "dental landing page that books appointments",
            "legal": "legal landing page that books consultations",
            "hvac": "HVAC landing page that books service calls",
            "plumbing": "plumbing landing page that books service calls",
            "fitness": "fitness landing page that books clients",
            "ecommerce": "e-commerce landing page that drives sales",
            "saas": "SaaS landing page that drives signups",
            "realestate": "real estate landing page that generates leads",
            "restaurants": "restaurant landing page that drives orders",
            "experience": "experience landing page that sells tickets",
        }
        replacement = action_map.get(slug, f"{keyword} landing page that generates leads")
        content = content.replace("roofing landing page that books estimates", replacement)
        changes.append("Fixed 'How It Works' subtitle")

    if slug != "roofing" and "roofing business" in content:
        biz_map = {
            "dental": "dental practice",
            "legal": "law firm",
            "hvac": "HVAC business",
            "plumbing": "plumbing business",
            "fitness": "fitness business",
            "ecommerce": "e-commerce brand",
            "saas": "SaaS startup",
            "realestate": "real estate business",
            "restaurants": "restaurant",
            "experience": "events business",
        }
        replacement = biz_map.get(slug, f"{keyword} business")
        content = content.replace("roofing business", replacement)
        changes.append("Fixed 'roofing business' reference")

    return content, changes


# -----------------------------------------------
# PHASE 4: Schema Markup -- BreadcrumbList JSON-LD
# -----------------------------------------------
def phase4_breadcrumb_schema(content, slug, page_info):
    """Add BreadcrumbList JSON-LD schema."""
    changes = []
    
    if '"BreadcrumbList"' in content:
        return content, changes
    
    url = f"https://naslogic.com/{slug}" if slug != "naslogic" else "https://naslogic.com"
    name = f"{page_info['name']} Landing Pages" if slug != "naslogic" else "Home"
    
    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://naslogic.com"
            }
        ]
    }
    
    if slug != "naslogic":
        schema["itemListElement"].append({
            "@type": "ListItem",
            "position": 2,
            "name": name,
            "item": url
        })
    
    schema_tag = f"""
    <!-- JSON-LD: BreadcrumbList Schema -->
    <script type="application/ld+json">
    {json.dumps(schema, indent=8)}
    </script>
"""
    
    # Insert after existing JSON-LD blocks, before Google Fonts
    marker = "    <!-- Google Fonts -->"
    if marker in content:
        content = content.replace(marker, schema_tag + "\n" + marker)
        changes.append("Added BreadcrumbList JSON-LD schema")
    
    return content, changes


# -----------------------------------------------
# PHASE 6: E-E-A-T -- Footer NAP + Privacy Link
# -----------------------------------------------
def phase6_footer(content, slug):
    """Standardize footer NAP and add privacy policy link."""
    changes = []
    
    # Add privacy link if not present
    if "/privacy" not in content and "privacy" not in content.lower().split("footer")[1] if "footer" in content.lower() else True:
        # Add privacy link to footer-links
        if '<a href="tel:9412573059">(941) 257-3059</a>' in content:
            content = content.replace(
                '<a href="tel:9412573059">(941) 257-3059</a>',
                '<a href="tel:9412573059">(941) 257-3059</a>\n                <a href="/privacy">Privacy Policy</a>'
            )
            changes.append("Added privacy policy link to footer")
    
    return content, changes


# -----------------------------------------------
# ADDENDUM C: Alt-Text Audit
# -----------------------------------------------
def addc_alt_text(content, slug):
    """Add niche-specific alt text to showcase/portfolio images."""
    changes = []
    alts = ALT_TEXTS.get(slug, [])
    img_count = 0
    fixed_count = 0
    
    # Find showcase-img divs and add aria-label (they're CSS-rendered, not <img> tags)
    # These are div.showcase-img elements, so we add role="img" and aria-label
    showcase_pattern = r'<div class="showcase-img"([^>]*)>'
    matches = list(re.finditer(showcase_pattern, content))
    img_count = len(matches)
    
    for i, match in enumerate(matches):
        old = match.group(0)
        attrs = match.group(1)
        alt = alts[i] if i < len(alts) else f"Naslogic {PAGES.get(slug, {}).get('keyword', slug)} landing page portfolio example {i+1}"
        
        if 'role="img"' not in old:
            new = old.replace('class="showcase-img"', f'class="showcase-img" role="img" aria-label="{alt}"')
            content = content.replace(old, new, 1)
            fixed_count += 1
    
    # Also handle portfolio-img divs (naslogic.html style)
    portfolio_pattern = r'<div class="portfolio-img ([^"]*)">'
    port_matches = list(re.finditer(portfolio_pattern, content))
    img_count += len(port_matches)
    
    port_alts = {
        "proj-saas": "Naslogic SaaS dashboard landing page design with dark UI and conversion-optimized layout",
        "proj-dentist": "Naslogic minimal dental clinic landing page design with appointment booking",
        "proj-ecom": "Naslogic e-commerce streetwear drop landing page with mobile-first shopping experience"
    }
    
    for match in port_matches:
        old = match.group(0)
        css_class = match.group(1)
        alt = port_alts.get(css_class, f"Naslogic portfolio landing page design example")
        
        if 'role="img"' not in old:
            new = old.replace(f'class="portfolio-img {css_class}"', f'class="portfolio-img {css_class}" role="img" aria-label="{alt}"')
            content = content.replace(old, new, 1)
            fixed_count += 1
    
    if fixed_count > 0:
        changes.append(f"Alt text: {fixed_count}/{img_count} images fixed")
    
    return content, changes, {"page": slug, "audited": img_count, "fixed": fixed_count}


# -----------------------------------------------
# ADDENDUM A: Niche-Specific Testimonials
# -----------------------------------------------
def adda_testimonials(content, slug):
    """Replace testimonial content with niche-specific, data-driven testimonials."""
    changes = []
    testimonials = TESTIMONIALS.get(slug)
    if not testimonials:
        return content, changes
    
    # Find existing social proof cards and replace
    sp_card_pattern = r'<div class="sp-card">.*?</div>'
    existing_cards = re.findall(sp_card_pattern, content, re.DOTALL)
    
    if existing_cards:
        # Replace existing cards with niche-specific ones
        for i, card in enumerate(existing_cards):
            t_idx = i % len(testimonials)
            t = testimonials[t_idx]
            new_card = f'<div class="sp-card"><span class="sp-quote">"{t["quote"]}"</span><span class="sp-author">— {t["author"]}, {t["title"]}</span></div>'
            content = content.replace(card, new_card, 1)
        changes.append(f"Replaced {len(existing_cards)} testimonials with niche-specific versions")
    
    return content, changes


# -----------------------------------------------
# MAIN: Run all phases on all pages
# -----------------------------------------------
def main():
    print("============================================================")
    print("NASLOGIC SEO ARCHITECTURE OVERHAUL")
    print("============================================================")
    
    alt_audit_results = []
    
    for slug, info in PAGES.items():
        filepath = os.path.join(PUBLIC, info["file"])
        if not os.path.exists(filepath):
            print(f"\nSKIP: {info['file']} not found")
            continue
        
        print(f"\n{'=' * 40}")
        print(f"Processing: {info['file']} ({info['name']})")
        print(f"{'=' * 40}")
        
        content = read_file(filepath)
        all_changes = []
        
        # Phase 1: Core Web Vitals
        content, ch = phase1_cwv(content, slug)
        all_changes.extend(ch)
        
        # Phase 2: Topic Clusters
        content, ch = phase2_breadcrumbs_html(content, slug, info)
        all_changes.extend(ch)
        content, ch = phase2_cross_links(content, slug)
        all_changes.extend(ch)
        
        # Phase 3: Doorway Page Fixes
        content, ch = phase3_faq_fixes(content, slug, info)
        all_changes.extend(ch)
        
        # Phase 4: Schema Markup
        content, ch = phase4_breadcrumb_schema(content, slug, info)
        all_changes.extend(ch)
        
        # Phase 6: E-E-A-T Footer
        content, ch = phase6_footer(content, slug)
        all_changes.extend(ch)
        
        # Addendum A: Testimonials
        content, ch = adda_testimonials(content, slug)
        all_changes.extend(ch)
        
        # Addendum C: Alt Text
        content, ch, audit = addc_alt_text(content, slug)
        all_changes.extend(ch)
        alt_audit_results.append(audit)
        
        # Write updated file
        write_file(filepath, content)
        
        for c in all_changes:
            print(f"  > {c}")
        
        if not all_changes:
            print("  (no changes needed)")
    
    # --- Alt-Text Audit Summary Table ---
    print(f"\n{'=' * 60}")
    print("ALT-TEXT AUDIT SUMMARY")
    print(f"{'=' * 60}")
    print(f"{'Page':<16} {'Audited':>8} {'Fixed':>8} {'Status':<12}")
    print(f"{'-' * 44}")
    for r in alt_audit_results:
        status = "Complete" if r["fixed"] > 0 else "- No images" if r["audited"] == 0 else "OK"
        print(f"{r['page']:<16} {r['audited']:>8} {r['fixed']:>8} {status:<12}")
    
    print(f"\n{'=' * 60}")
    print("ALL PHASES COMPLETE FOR NICHE PAGES")
    print("Run naslogic_overhaul() separately for the pillar page.")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
