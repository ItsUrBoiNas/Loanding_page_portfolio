/**
 * NASLOGIC SEO INJECTION SCRIPT
 * Injects meta tags, JSON-LD schema, SEO content blocks, and footer cross-links
 * into all niche HTML pages.
 * 
 * Run: node seo-inject.js
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://naslogic.com';
const PUBLIC_DIR = path.join(__dirname, 'public');

// ─── SEO DATA PER PAGE ─────────────────────────────────────────────────────────
const pages = [
  {
    file: 'roofing.html',
    slug: 'roofing',
    title: 'Roofing Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom roofing websites & landing pages built to generate leads. Custom-built, mobile-first designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'Roofing Website Design & Lead Generation Landing Pages',
    niche: 'Roofing',
    serviceType: 'Roofing Website Design',
    faq: [
      { q: 'How much does a roofing website cost?', a: 'At Naslogic, a custom-built roofing landing page starts at just $199 with 48-hour delivery. This includes mobile-first design, conversion-optimized copywriting, and deployment.' },
      { q: 'Do roofers need a website or a landing page?', a: 'Both serve different purposes. A website provides full company information, while a landing page is laser-focused on converting paid traffic (Google Ads, Meta Ads) into phone calls and form submissions. Most roofers running ads need a landing page.' },
      { q: 'What should a roofing company website include?', a: 'A high-converting roofing website needs a clear headline, trust signals (license numbers, insurance), before/after photos, customer testimonials, a prominent phone number, and a simple contact form above the fold.' },
    ],
    contentH2: 'Why Roofing Companies Need a Custom Website (Not a Template)',
    contentP: 'When a homeowner\'s roof starts leaking at 2 AM, they\'re searching "emergency roofer near me" on their phone. If your website takes 5 seconds to load, uses stock photos of generic houses, and buries your phone number at the bottom of the page, you\'ve already lost that $15,000 job to the competitor whose site loaded instantly and had a click-to-call button front and center. A custom-coded roofing landing page eliminates every friction point between a panicked homeowner and your dispatch line. We build mobile-first, fast-loading pages that put your phone number, service area, and trust signals (license, insurance, reviews) exactly where anxious homeowners need them.',
    crossLinks: [
      { slug: 'hvac', label: 'HVAC Website Design' },
      { slug: 'plumbing', label: 'Plumber Website Design' },
    ],
  },
  {
    file: 'dental.html',
    slug: 'dental',
    title: 'Dental Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom dental practice websites & landing pages that convert. Custom-built, mobile-first designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'Dental Website Design & Patient Acquisition Landing Pages',
    niche: 'Dental',
    serviceType: 'Dental Website Design',
    faq: [
      { q: 'How much does a dental website cost?', a: 'Naslogic builds custom dental landing pages starting at $199 with 48-hour delivery. Unlike template dental websites that cost $3,000-$10,000, our Custom-built pages are optimized specifically for converting new patient inquiries.' },
      { q: 'What makes a good dental website?', a: 'A high-converting dental website needs trust-building elements: before/after smile galleries, patient testimonials, clear service descriptions (implants, cosmetic, Invisalign), insurance information, and an easy online booking or phone CTA.' },
      { q: 'Do dentists need a landing page for Google Ads?', a: 'Absolutely. Sending Google Ads traffic to your main website dilutes conversions. A dedicated dental landing page focuses the visitor on ONE action — booking a consultation — and typically converts 3-5x better than a generic website.' },
    ],
    contentH2: 'Why Dental Practices Need a Custom Website (Not a Template)',
    contentP: 'Patients choosing a new dentist don\'t just compare prices — they judge trust, cleanliness, and professionalism in the first 3 seconds of seeing your website. A cookie-cutter template with stock photos of smiling models and a cluttered navigation instantly signals "budget dentist." A custom-coded dental landing page with refined typography, real patient results, and a seamless booking flow signals the kind of practice that charges premium for cosmetic procedures and gets booked weeks in advance. We engineer dental websites that filter out price-shoppers and attract patients who value quality care.',
    crossLinks: [
      { slug: 'medspa', label: 'MedSpa Website Design' },
      { slug: 'legal', label: 'Attorney Website Design' },
    ],
  },
  {
    file: 'legal.html',
    slug: 'legal',
    title: 'Law Firm Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom attorney & law firm websites that command authority. Custom-built, conversion-first designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'Law Firm Website Design & Legal Landing Pages',
    niche: 'Legal',
    serviceType: 'Law Firm Website Design',
    faq: [
      { q: 'How much does a law firm website cost?', a: 'Naslogic builds custom law firm landing pages starting at $199 with 48-hour delivery. Traditional legal marketing agencies charge $5,000-$25,000 for websites that look identical to every other firm\'s. Our approach is radically different.' },
      { q: 'What should an attorney website include?', a: 'A high-converting law firm website needs: a strong headline addressing the client\'s pain, practice area clarity, case results or settlement amounts, attorney credentials, client testimonials, and a phone number/intake form above the fold.' },
      { q: 'Do personal injury lawyers need a landing page?', a: 'Yes. Personal injury is the most competitive legal advertising category. Sending PPC traffic to a generic firm website wastes ad spend. A dedicated PI landing page with a case evaluation form converts 3-8x better.' },
    ],
    contentH2: 'Why Law Firms Need a Custom Website (Not a Template)',
    contentP: 'When someone has been in a car accident or needs a criminal defense attorney, they\'re making one of the most stressful decisions of their life. They\'re going to call the attorney whose website instantly communicates authority, credibility, and competence. A templated WordPress site with a gavel stock photo and "Fighting for Justice" tagline looks exactly like the 200 other firms they scrolled past. A custom-coded legal landing page with stark editorial typography, strategic psychological tension, and a confidential intake flow makes your firm feel like the only serious choice.',
    crossLinks: [
      { slug: 'dental', label: 'Dental Website Design' },
      { slug: 'realestate', label: 'Realtor Website Design' },
    ],
  },
  {
    file: 'hvac.html',
    slug: 'hvac',
    title: 'HVAC Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom HVAC contractor websites built to capture emergency leads. Custom-built, mobile-first designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'HVAC Website Design & Emergency Lead Generation Pages',
    niche: 'HVAC',
    serviceType: 'HVAC Website Design',
    faq: [
      { q: 'How much does an HVAC website cost?', a: 'Naslogic builds custom HVAC landing pages starting at $199 with 48-hour delivery. These are custom-built, mobile-first pages optimized specifically for emergency AC repair and installation leads.' },
      { q: 'What should an HVAC website include?', a: 'Emergency HVAC websites need: a click-to-call phone number front and center, service area coverage, 24/7 availability signals, licensing info, fast page load speed (homeowners in 105° heat won\'t wait), and a simple service request form.' },
      { q: 'How can HVAC companies get more leads from their website?', a: 'Stop sending traffic to a generic 10-page website. Use a dedicated landing page with one clear CTA (call or schedule), add urgency signals, show real response times, and make the phone number the largest element on mobile.' },
    ],
    contentH2: 'Why HVAC Companies Need a Custom Website (Not a Template)',
    contentP: 'When a family\'s AC dies in the middle of a Florida summer, they need help NOW — not in 5 minutes, not after navigating a 7-page website. They\'re searching "AC repair near me" on a phone with sweat on their fingers. If your website doesn\'t load in 2 seconds with a giant phone number and a "Call Now for Emergency Service" button, that $8,000 system replacement just went to your competitor. We build HVAC landing pages that are brutally efficient: instant load times, zero distractions, and every single element engineered to convert a panicked homeowner into a dispatched service call.',
    crossLinks: [
      { slug: 'roofing', label: 'Roofing Website Design' },
      { slug: 'plumbing', label: 'Plumber Website Design' },
    ],
  },
  {
    file: 'plumbing.html',
    slug: 'plumbing',
    title: 'Plumber Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom plumbing company websites built to generate service calls. Custom-built, mobile-first designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'Plumber Website Design & Service Call Landing Pages',
    niche: 'Plumbing',
    serviceType: 'Plumber Website Design',
    faq: [
      { q: 'How much does a plumber website cost?', a: 'Naslogic builds custom plumbing landing pages starting at $199 with 48-hour delivery. Unlike template websites, our pages are custom-built and optimized specifically for converting emergency plumbing calls and commercial bids.' },
      { q: 'Do plumbers need a website?', a: 'Absolutely. 97% of consumers search online before calling a local service provider. Without a website, you\'re invisible to every homeowner and property manager searching "plumber near me" — handing all those jobs to competitors who do.' },
      { q: 'What makes a good plumbing website?', a: 'A good plumbing website loads fast, has a prominent phone number, clearly lists services and service areas, shows real customer reviews, displays licensing/insurance info, and makes it dead simple to request a quote or schedule service.' },
    ],
    contentH2: 'Why Plumbing Companies Need a Custom Website (Not a Template)',
    contentP: 'A burst pipe doesn\'t wait for business hours. When water is flooding someone\'s kitchen at midnight, they\'re not comparing five different plumber websites — they\'re calling the first one that answers. Your website needs to be that first result AND convert instantly. Generic template sites with cartoon pipe graphics and "Welcome to our plumbing company" copy don\'t cut it when a commercial property manager needs a $50,000 repiping job done right. We build plumbing landing pages that position you as the premium, reliable choice — whether it\'s an emergency dispatch or a major commercial contract.',
    crossLinks: [
      { slug: 'hvac', label: 'HVAC Website Design' },
      { slug: 'roofing', label: 'Roofing Website Design' },
    ],
  },
  {
    file: 'realestate.html',
    slug: 'realestate',
    title: 'Realtor Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom real estate agent websites & listing landing pages. Custom-built, cinematic designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'Realtor Website Design & Luxury Real Estate Landing Pages',
    niche: 'Real Estate',
    serviceType: 'Realtor Website Design',
    faq: [
      { q: 'How much does a real estate website cost?', a: 'Naslogic builds custom real estate landing pages starting at $199 with 48-hour delivery. These are cinematic, luxury-grade pages that make your listings look like $20M estates — not Zillow clones.' },
      { q: 'Do realtors need their own website?', a: 'Yes. Relying solely on Zillow and Realtor.com means you\'re competing on the same page as every other agent. Your own website establishes authority, captures leads directly, and positions you as a luxury-tier agent.' },
      { q: 'What should a real estate website include?', a: 'A high-converting real estate site needs stunning property photography, cinematic video walkthroughs, neighborhood insights, an easy property search, agent bio/credentials, and a low-friction contact form or scheduling tool.' },
    ],
    contentH2: 'Why Realtors Need a Custom Website (Not a Template)',
    contentP: 'You sell $2M waterfront properties, but your website looks like a Zillow listing page. Luxury buyers don\'t want to scroll through a generic IDX feed — they want an experience that matches the caliber of the homes you represent. A custom-coded real estate landing page with cinematic imagery, dark luxury aesthetics, and smooth parallax interactions tells high-net-worth clients that you operate at their level. We build realtor websites that function like digital open houses — immersive, exclusive, and designed to make buyers reach out before the listing even hits the MLS.',
    crossLinks: [
      { slug: 'legal', label: 'Attorney Website Design' },
      { slug: 'medspa', label: 'MedSpa Website Design' },
    ],
  },
  {
    file: 'restaurants.html',
    slug: 'restaurants',
    title: 'Restaurant Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom restaurant & fine dining websites built to fill tables. Custom-built, immersive designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'Restaurant Website Design & Fine Dining Landing Pages',
    niche: 'Restaurant',
    serviceType: 'Restaurant Website Design',
    faq: [
      { q: 'How much does a restaurant website cost?', a: 'Naslogic builds custom restaurant landing pages starting at $199 with 48-hour delivery. From fine dining to fast casual, our Custom-built pages are designed to fill your tables, not just look pretty.' },
      { q: 'What should a restaurant website include?', a: 'A high-converting restaurant website needs: an appetizing menu (not a PDF link), hours and location with maps, online reservation integration (Resy, OpenTable), high-quality food photography, and mobile-first design for on-the-go diners.' },
      { q: 'Why is website design important for restaurants?', a: 'Your website is often the first impression before someone walks through your door. A slow, cluttered site with a PDF menu signals "casual chain." A cinematic, immersive web experience signals "destination dining worth a reservation."' },
    ],
    contentH2: 'Why Restaurants Need a Custom Website (Not a Template)',
    contentP: 'Your tasting menu is a $300-per-head experience, but your website looks like a takeout menu. In the restaurant industry, presentation IS everything — and your digital presence is no exception. Template restaurant websites with stock food photos, auto-playing background music, and a PDF menu download are the web equivalent of a sticky laminated menu under fluorescent lights. We build restaurant landing pages with Michelin-grade aesthetics: spotlight-lit dish photography, tasting-menu-style content pacing, and seamless reservation integration that makes booking feel as exclusive as the meal itself.',
    crossLinks: [
      { slug: 'ecommerce', label: 'E-Commerce Website Design' },
      { slug: 'medspa', label: 'MedSpa Website Design' },
    ],
  },
  {
    file: 'fitness.html',
    slug: 'fitness',
    title: 'Fitness & Gym Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom gym, fitness & personal trainer websites. High-intensity designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'Gym & Fitness Website Design & Membership Landing Pages',
    niche: 'Fitness',
    serviceType: 'Gym Website Design',
    faq: [
      { q: 'How much does a gym website cost?', a: 'Naslogic builds custom fitness landing pages starting at $199 with 48-hour delivery. Whether you\'re a boutique studio, CrossFit box, or personal training facility, our pages are built to convert visitors into members.' },
      { q: 'Do personal trainers need a website?', a: 'Yes. A professional website separates you from Instagram-only trainers. It gives potential clients a place to learn about your methodology, see transformations, and sign up — all without DM-ing back and forth.' },
      { q: 'What should a fitness website include?', a: 'A converting fitness website needs: bold, energetic design, class schedules, trainer bios, transformation photos, membership pricing transparency, and a simple sign-up or trial class booking form.' },
    ],
    contentH2: 'Why Fitness Businesses Need a Custom Website (Not a Template)',
    contentP: 'If your facility charges $3,000 for elite coaching programs, your website can\'t look like a $10/month Planet Fitness clone. High-intent clients — the ones willing to invest in personal training, contest prep, or specialized programs — judge your entire operation by your digital presence before they ever walk in. A template site with cheesy gym stock photos and a "JOIN NOW" pop-up screams commodity. A custom-coded fitness landing page with kinetic energy, aggressive typography, and a frictionless intake process projects the same intensity and professionalism as your actual training floor.',
    crossLinks: [
      { slug: 'medspa', label: 'MedSpa Website Design' },
      { slug: 'saas', label: 'SaaS Website Design' },
    ],
  },
  {
    file: 'saas.html',
    slug: 'saas',
    title: 'SaaS Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom SaaS product & startup landing pages engineered to convert. Custom-built, minimal designs delivered in 48 hours for $199.',
    h1_hidden: 'SaaS Website Design & Product Landing Pages',
    niche: 'SaaS',
    serviceType: 'SaaS Website Design',
    faq: [
      { q: 'How much does a SaaS landing page cost?', a: 'Naslogic builds custom SaaS landing pages starting at $199 with 48-hour delivery. These are engineering-grade pages with dark minimal aesthetics, micro-interactions, and conversion-optimized layouts.' },
      { q: 'What makes a good SaaS landing page?', a: 'A high-converting SaaS page needs: a clear value proposition headline, feature breakdowns with visual demos, social proof (logos, testimonials, metrics), pricing transparency, and a low-friction CTA (free trial or demo request).' },
      { q: 'Do startups need a custom landing page?', a: 'Yes. Your landing page is often the first interaction investors and users have with your product. A polished, custom-coded page signals technical competence and product maturity — both critical for conversions and fundraising.' },
    ],
    contentH2: 'Why SaaS Companies Need a Custom Website (Not a Template)',
    contentP: 'CTOs and engineering leaders don\'t buy "magic" — they buy precision, specs, and flawless execution. When your product charges $5,000/year per seat, the landing page needs to look like the dashboard of a $50M enterprise system, not a Wix template with gradient buttons. Template SaaS sites with floating illustrations and "Supercharge your workflow!" copy are invisible in a market flooded with AI tools. A custom-coded SaaS landing page with dark minimal aesthetics, interactive quantum-grid backgrounds, and glassmorphic feature cards communicates the same engineering excellence as your actual product.',
    crossLinks: [
      { slug: 'ecommerce', label: 'E-Commerce Website Design' },
      { slug: 'fitness', label: 'Fitness Website Design' },
    ],
  },
  {
    file: 'ecommerce.html',
    slug: 'ecommerce',
    title: 'E-Commerce Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom online store & e-commerce landing pages that seduce buyers. Custom-built editorial designs delivered in 48 hours for $199.',
    h1_hidden: 'E-Commerce Website Design & Product Landing Pages',
    niche: 'E-Commerce',
    serviceType: 'E-Commerce Website Design',
    faq: [
      { q: 'How much does an e-commerce website cost?', a: 'Naslogic builds custom e-commerce landing pages starting at $199 with 48-hour delivery. These aren\'t basic Shopify templates — they\'re editorial, runway-grade product experiences designed to increase average order value.' },
      { q: 'Is a landing page the same as an online store?', a: 'No. An online store (Shopify, WooCommerce) is a full catalog. A landing page is a single, focused page designed to sell one product or collection with maximum conversion. Both work together — ads drive to the landing page, the landing page drives to the store.' },
      { q: 'How can I make my online store look more premium?', a: 'Ditch the standard product grid. Use editorial-style layouts with dramatic photography, asymmetric masonry, scroll-triggered animations, and high-end typography. When your site looks like a Vogue spread, customers stop comparing prices.' },
    ],
    contentH2: 'Why E-Commerce Brands Need a Custom Website (Not a Template)',
    contentP: 'If you\'re selling $300 garments or premium home goods, a standard Shopify grid with white backgrounds and a "Quick View" popup is actively devaluing your brand. Every luxury fashion house, from Jacquemus to Bottega Veneta, invests in bespoke web experiences because they understand that the digital storefront IS the brand. A custom-coded e-commerce landing page with editorial lookbook layouts, scroll-velocity parallax, and cinematic product reveals doesn\'t just display products — it creates desire. The result: higher AOV, fewer discount seekers, and customers who buy because they\'re emotionally invested.',
    crossLinks: [
      { slug: 'restaurants', label: 'Restaurant Website Design' },
      { slug: 'saas', label: 'SaaS Website Design' },
    ],
  },
  {
    file: 'experience.html',
    slug: 'experience',
    title: 'Event & Experience Website Design | Fort Myers | Naslogic',
    description: 'Custom event, experience & entertainment landing pages. Immersive, 3D-tunnel designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'Event & Experience Website Design & Immersive Landing Pages',
    niche: 'Experience',
    serviceType: 'Experience Website Design',
    faq: [
      { q: 'How much does an event website cost?', a: 'Naslogic builds custom experience and event landing pages starting at $199 with 48-hour delivery. These are fully immersive, 3D-rendered scroll experiences designed to sell tickets and build hype.' },
      { q: 'What should an event website include?', a: 'A high-converting event page needs: immersive visuals that capture the atmosphere, clear date/time/venue info, artist or performer lineups, tiered ticket pricing, social proof (past event photos/videos), and a frictionless checkout.' },
      { q: 'Why do events need a dedicated landing page?', a: 'Social media posts disappear in feeds. A dedicated landing page gives your event a permanent home with SEO visibility, all the details in one place, and a direct ticket purchase flow — no algorithm deciding who sees it.' },
    ],
    contentH2: 'Why Events Need a Custom Website (Not a Template)',
    contentP: 'You\'re selling an experience — not a product, not a service, but a feeling. A Eventbrite listing with bullet points and a stock image doesn\'t create excitement. It doesn\'t make someone picture themselves there. A custom-coded experience landing page with 3D tunnel navigation, neon-lit scroll interactions, and cinematic pacing sells the atmosphere before the ticket is even purchased. We build event pages that function as digital trailers — immersive previews that make the experience feel so tangible, buying a ticket feels inevitable.',
    crossLinks: [
      { slug: 'restaurants', label: 'Restaurant Website Design' },
      { slug: 'fitness', label: 'Fitness Website Design' },
    ],
  },
  {
    file: 'medspa.html',
    slug: 'medspa',
    title: 'MedSpa Website Design & Landing Pages | Fort Myers | Naslogic',
    description: 'Custom MedSpa & aesthetics clinic websites that attract premium clients. Custom-built luxury designs delivered in 48 hours for $199. Fort Myers, FL.',
    h1_hidden: 'MedSpa Website Design & Aesthetics Clinic Landing Pages',
    niche: 'MedSpa',
    serviceType: 'MedSpa Website Design',
    faq: [
      { q: 'How much does a MedSpa website cost?', a: 'Naslogic builds custom MedSpa landing pages starting at $199 with 48-hour delivery. These are luxury-grade, conversion-optimized pages designed specifically for aesthetics clinics offering Botox, fillers, and cosmetic treatments.' },
      { q: 'What should a MedSpa website include?', a: 'A high-converting MedSpa website needs: luxury aesthetics that match your clinic\'s ambiance, service menus with pricing ranges, before/after galleries, practitioner credentials, patient testimonials, and an easy consultation booking form.' },
      { q: 'How can a MedSpa get more clients from their website?', a: 'Stop using clinical, sterile designs. MedSpa clients are buying a luxury experience, not a medical procedure. Use silk textures, rose-gold accents, editorial photography, and a discreet intake form that makes booking feel like scheduling a spa day, not a doctor\'s appointment.' },
    ],
    contentH2: 'Why MedSpas Need a Custom Website (Not a Template)',
    contentP: 'When a client is ready to spend $3,000 on Botox and fillers, they don\'t want a website that looks like a hospital brochure. They want hyper-luxury — the same feeling they get walking into your clinic with marble floors, ambient lighting, and carefully curated music. A template MedSpa site with clinical stock photos and a blue-and-white color scheme screams "dental office," not "exclusive aesthetics experience." A custom-coded MedSpa landing page with liquid silk textures, rose-gold accents, and a fluid consultation flow signals the kind of premium practice that charges — and delivers — top tier results.',
    crossLinks: [
      { slug: 'dental', label: 'Dental Website Design' },
      { slug: 'realestate', label: 'Realtor Website Design' },
    ],
  },
];


// ─── GENERATE SEO HEAD INJECTION ────────────────────────────────────────────────
function generateHeadTags(page) {
  return `
    <!-- SEO META TAGS -->
    <meta name="description" content="${page.description}">
    <link rel="canonical" href="${DOMAIN}/${page.slug}">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.description}">
    <meta property="og:url" content="${DOMAIN}/${page.slug}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Naslogic">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${page.title}">
    <meta name="twitter:description" content="${page.description}">
    <meta name="robots" content="index, follow">
    <!-- /SEO META TAGS -->`;
}


// ─── GENERATE JSON-LD SCHEMA ────────────────────────────────────────────────────
function generateSchema(page) {
  const schemaArr = [
    // WebPage
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": page.title.split(' |')[0],
      "description": page.description,
      "url": `${DOMAIN}/${page.slug}`,
      "isPartOf": { "@type": "WebSite", "name": "Naslogic", "url": DOMAIN },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN },
          { "@type": "ListItem", "position": 2, "name": `${page.niche} Website Design`, "item": `${DOMAIN}/${page.slug}` }
        ]
      }
    },
    // Service
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": page.serviceType,
      "description": page.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Naslogic",
        "url": DOMAIN,
        "telephone": "(941) 257-3059",
        "address": { "@type": "PostalAddress", "addressLocality": "Fort Myers", "addressRegion": "FL", "addressCountry": "US" }
      },
      "areaServed": { "@type": "Country", "name": "US" },
      "offers": {
        "@type": "Offer",
        "price": "199",
        "priceCurrency": "USD",
        "description": "Custom-built landing page delivered in 48 hours"
      }
    },
    // FAQPage
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": page.faq.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  ];

  return `
    <!-- JSON-LD SCHEMA -->
    <script type="application/ld+json">${JSON.stringify(schemaArr[0])}</script>
    <script type="application/ld+json">${JSON.stringify(schemaArr[1])}</script>
    <script type="application/ld+json">${JSON.stringify(schemaArr[2])}</script>
    <!-- /JSON-LD SCHEMA -->`;
}


// ─── GENERATE SEO CONTENT BLOCK + FOOTER ────────────────────────────────────────
function generateFooterBlock(page) {
  const crossLinksHTML = page.crossLinks.map(cl =>
    `<a href="/${cl.slug}" style="color: #aaa; text-decoration: none; border-bottom: 1px solid #333; padding-bottom: 2px; transition: color 0.3s;">${cl.label}</a>`
  ).join(' &nbsp;·&nbsp; ');

  return `
<!-- NASLOGIC SEO CONTENT BLOCK -->
<section class="naslogic-seo-block" style="background: #0a0a0a; color: #ccc; padding: 5rem 5%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; position: relative; z-index: 50;">
  <div style="max-width: 800px; margin: 0 auto;">
    <h1 style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 3px; color: #555; margin-bottom: 3rem; font-weight: normal;">Naslogic › ${page.niche} Web Design</h1>
    
    <h2 style="font-size: 1.8rem; color: #fff; margin-bottom: 1.5rem; font-weight: 400;">${page.contentH2}</h2>
    <p style="font-size: 1rem; color: #999; margin-bottom: 3rem; max-width: 700px;">${page.contentP}</p>
    
    <h2 style="font-size: 1.5rem; color: #fff; margin-bottom: 2rem; font-weight: 400;">Frequently Asked Questions</h2>
    ${page.faq.map((f, i) => `
    <details style="border-bottom: 1px solid #222; padding: 1.5rem 0; cursor: pointer;" ${i === 0 ? 'open' : ''}>
      <summary style="font-size: 1.05rem; color: #eee; font-weight: 500; list-style: none; display: flex; justify-content: space-between; align-items: center;">${f.q}<span style="color:#555; font-size: 1.5rem;">+</span></summary>
      <p style="margin-top: 1rem; font-size: 0.95rem; color: #888; max-width: 650px;">${f.a}</p>
    </details>`).join('')}
  </div>
</section>

<!-- NASLOGIC SEO FOOTER -->
<footer style="background: #050505; color: #777; padding: 3rem 5%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.85rem; position: relative; z-index: 50;">
  <div style="max-width: 800px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1.5rem;">
    <div>
      <a href="/" style="color: #fff; text-decoration: none; font-weight: 600; font-size: 1rem;">Naslogic</a>
      <span style="margin-left: 0.5rem; color: #555;">— Fort Myers Web Design Agency</span>
    </div>
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center;">
      <a href="/" style="color: #aaa; text-decoration: none;">Home</a>
      ${crossLinksHTML}
      <a href="/privacy" style="color: #555; text-decoration: none;">Privacy</a>
    </div>
  </div>
  <div style="max-width: 800px; margin: 1.5rem auto 0; padding-top: 1.5rem; border-top: 1px solid #111; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
    <span>© 2026 Naslogic. Fort Myers, FL. <a href="tel:+19412573059" style="color: #aaa; text-decoration: none;">(941) 257-3059</a></span>
    <span style="color: #333;">Custom-built with precision.</span>
  </div>
</footer>
<!-- /NASLOGIC SEO FOOTER -->`;
}


// ─── PROCESS ALL FILES ──────────────────────────────────────────────────────────
let successCount = 0;
let errorCount = 0;

pages.forEach(page => {
  const filePath = path.join(PUBLIC_DIR, page.file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${page.file}`);
    errorCount++;
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. INJECT HEAD TAGS — Replace existing <title> line with title + SEO meta
  const titleRegex = /<title>.*?<\/title>/;
  const titleMatch = html.match(titleRegex);
  if (titleMatch) {
    html = html.replace(titleMatch[0], `<title>${page.title}</title>${generateHeadTags(page)}${generateSchema(page)}`);
  }

  // 2. INJECT SEO CONTENT BLOCK + FOOTER — Insert before closing </body>
  // Check if already injected
  if (!html.includes('NASLOGIC SEO CONTENT BLOCK')) {
    html = html.replace('</body>', `${generateFooterBlock(page)}\n</body>`);
  }

  // 3. ADD HIDDEN H1 for SEO — append right after <body> if no SEO h1 exists
  if (!html.includes('naslogic-seo-h1')) {
    const h1Tag = `\n<!-- SEO H1 (visually hidden, for search engines) -->\n<h1 class="naslogic-seo-h1" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;">${page.h1_hidden}</h1>\n`;
    html = html.replace('<body>', `<body>${h1Tag}`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ ${page.file} — SEO injected`);
  successCount++;
});

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✅ ${successCount} pages updated successfully`);
if (errorCount > 0) console.log(`❌ ${errorCount} errors`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
