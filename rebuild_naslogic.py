import os

FILE_PATH = 'c:/Users/nasir/OneDrive/Desktop/Projects/landing page portfolio/public/naslogic.html'

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the <head> SEO data up to Google Fonts
split_marker = "    <!-- Google Fonts -->"
if split_marker not in content:
    print("Could not find split marker.")
    exit(1)

head_part = content.split(split_marker)[0]

NEW_BODY = """    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">

    <style>
        /* Modern CSS Reset & Vars */
        :root {
            --bg: #0D0D0D;
            --text-main: #F4F4F5;
            --text-muted: #A1A1AA;
            --accent: #E1E1E1;
            --redline: #FF3333;
            --surface: #18181B;
            --surface-border: #27272A;
            --font-display: 'Space Grotesk', sans-serif;
            --font-body: 'Inter', sans-serif;
            --container: 1200px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color: transparent;
        }

        body {
            background-color: var(--bg);
            color: var(--text-main);
            font-family: var(--font-body);
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
        }

        ::selection {
            background: var(--text-main);
            color: var(--bg);
        }

        .container {
            max-width: var(--container);
            margin: 0 auto;
            padding: 0 5%;
        }

        .section-padding {
            padding: 180px 0;
        }

        /* Typography */
        h1, h2, h3, h4, .display-font {
            font-family: var(--font-display);
            line-height: 1;
            letter-spacing: -0.03em;
        }

        p {
            line-height: 1.6;
            color: var(--text-muted);
        }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 20px 40px;
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 1rem;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            border-radius: 0;
        }

        .btn-primary {
            background-color: var(--text-main);
            color: var(--bg);
        }

        .btn-primary:hover {
            background-color: #FFF;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(255,255,255,0.1);
        }

        .btn-outline {
            background-color: transparent;
            color: var(--text-main);
            border: 1px solid var(--surface-border);
        }

        .btn-outline:hover {
            border-color: var(--text-main);
            background-color: var(--text-main);
            color: var(--bg);
        }

        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 30px 0;
            background: rgba(13, 13, 13, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            z-index: 100;
            border-bottom: 1px solid var(--surface-border);
            transition: transform 0.4s ease;
        }

        .nav--hidden {
            transform: translateY(-100%);
        }

        .nav .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-logo {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-main);
            text-decoration: none;
            letter-spacing: -0.05em;
        }

        .nav-links {
            display: flex;
            gap: 40px;
            align-items: center;
        }

        .nav-links a:not(.btn) {
            color: var(--text-main);
            text-decoration: none;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            transition: color 0.3s;
        }

        .nav-links a:not(.btn):hover {
            color: var(--text-muted);
        }

        /* Hero */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding-top: 100px;
            position: relative;
        }

        .hero-bg-text {
            position: absolute;
            top: -5%;
            left: -5%;
            font-size: 40vw;
            font-family: var(--font-display);
            color: rgba(255, 255, 255, 0.02);
            white-space: nowrap;
            z-index: -1;
            pointer-events: none;
            user-select: none;
            font-weight: 700;
            letter-spacing: -0.05em;
        }

        .hero-title {
            font-size: clamp(3rem, 8vw, 8rem);
            margin-bottom: 40px;
            max-width: 1100px;
        }

        .hero-title span.strike {
            text-decoration: line-through;
            color: var(--text-muted);
            text-decoration-color: var(--redline);
        }

        .hero-sub {
            font-family: var(--font-display);
            font-size: clamp(1.2rem, 2vw, 1.8rem);
            font-weight: 400;
            max-width: 800px;
            margin-bottom: 60px;
            color: var(--text-muted);
        }

        /* Autopsy Section */
        .autopsy-section {
            background: #000;
            border-top: 1px solid var(--surface-border);
            border-bottom: 1px solid var(--surface-border);
            position: relative;
            overflow: hidden;
        }

        .autopsy-header {
            font-size: clamp(2rem, 5vw, 4rem);
            margin-bottom: 80px;
            max-width: 800px;
        }

        .wireframe-container {
            position: relative;
            background: #111;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 40px;
            height: 600px;
            margin-top: 60px;
        }

        .wf-hero {
            width: 100%;
            height: 200px;
            background: #1A1A1A;
            border: 2px dashed #444;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .wf-text {
            color: #666;
            font-family: monospace;
            font-size: 24px;
        }

        .wf-btn {
            width: 150px;
            height: 40px;
            background: #222;
            margin-top: 20px;
        }

        .redline-annotation {
            position: absolute;
            font-family: 'Indie Flower', cursive, sans-serif;
            color: var(--redline);
            font-size: 1.5rem;
            font-weight: 700;
            opacity: 0; /* GSAP reveals this */
            z-index: 10;
        }

        .red-arrow {
            position: absolute;
            color: var(--redline);
            opacity: 0;
        }

        /* Case Files */
        .case-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-top: 80px;
        }

        .case-row {
            display: grid;
            grid-template-columns: 1fr 1fr 0.5fr;
            padding: 40px 0;
            border-top: 1px solid var(--surface-border);
            align-items: center;
            transition: background-color 0.3s;
        }

        .case-row:hover {
            background-color: var(--surface);
        }

        .case-title {
            font-size: 2.5rem;
            font-weight: 500;
        }

        .case-niche {
            font-size: 1rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-top: 10px;
        }

        .case-data {
            font-family: var(--font-display);
        }

        .case-data-label {
            font-size: 0.8rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .case-data-value {
            font-size: 2rem;
            color: var(--text-main);
        }

        .case-data-value.lift {
            color: #4ADE80; /* Green indicator for positive delta */
        }

        /* Pricing Tactics */
        .pricing-section {
            background: #000;
            border-top: 1px solid var(--surface-border);
        }

        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            margin-top: 80px;
            border: 1px solid var(--surface-border);
        }

        .tier-card {
            padding: 60px 40px;
            border-right: 1px solid var(--surface-border);
            display: flex;
            flex-direction: column;
            position: relative;
        }

        .tier-card:last-child {
            border-right: none;
        }

        .tier-card.featured {
            background: var(--surface);
        }

        .tier-name {
            font-size: 1.5rem;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .tier-price {
            font-family: var(--font-display);
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 30px;
        }

        .tier-desc {
            font-size: 1rem;
            color: var(--text-muted);
            margin-bottom: 40px;
            min-height: 48px;
        }

        .tier-features {
            list-style: none;
            margin-bottom: 50px;
            flex-grow: 1;
        }

        .tier-features li {
            padding: 12px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            font-size: 0.95rem;
            color: var(--text-muted);
            display: flex;
            align-items: flex-start;
        }

        .tier-features li::before {
            content: '✓';
            color: var(--text-main);
            margin-right: 12px;
            font-family: var(--font-display);
        }

        /* Ultimatum CTA */
        .ultimatum {
            padding: 150px 5%;
            text-align: center;
        }

        .ultimatum-text {
            font-family: var(--font-display);
            font-size: clamp(3rem, 6vw, 6rem);
            max-width: 1000px;
            margin: 0 auto 60px;
            line-height: 1.1;
        }

        /* Footer */
        .footer {
            border-top: 1px solid var(--surface-border);
            padding: 60px 0;
            font-size: 0.9rem;
        }

        .footer .container {
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
        }

        .footer-logo {
            font-family: var(--font-display);
            font-size: 2rem;
            font-weight: 700;
            text-decoration: none;
            color: var(--text-main);
            letter-spacing: -0.05em;
        }

        .footer-links {
            display: flex;
            gap: 30px;
        }

        .footer-links a {
            color: var(--text-muted);
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            transition: color 0.3s;
        }

        .footer-links a:hover {
            color: var(--text-main);
        }

        @media (max-width: 1024px) {
            .pricing-grid {
                grid-template-columns: 1fr;
            }
            .tier-card {
                border-right: none;
                border-bottom: 1px solid var(--surface-border);
            }
            .tier-card:last-child {
                border-bottom: none;
            }
            .case-row {
                grid-template-columns: 1fr;
                gap: 20px;
                text-align: center;
            }
            .case-data {
                display: flex;
                justify-content: center;
                gap: 40px;
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            .wf-hero {
                height: 120px;
            }
            .footer .container {
                grid-template-columns: 1fr;
                gap: 30px;
                text-align: center;
            }
            .footer-links {
                justify-content: center;
                flex-wrap: wrap;
            }
        }
    </style>
</head>
<body>

    <!-- Navigation -->
    <nav class="nav">
        <div class="container">
            <a href="#" class="nav-logo">NASLOGIC</a>
            <div class="nav-links">
                <a href="#autopsy">The Truth</a>
                <a href="#pricing">Pricing</a>
                <a href="javascript:void(0)" onclick="openPurchaseModal()" class="btn btn-outline" style="padding: 12px 24px;">Start Project</a>
            </div>
        </div>
    </nav>

    <!-- Hero -->
    <section class="hero fade-in">
        <div class="container">
            <h1 class="hero-title" style="font-size: clamp(2.5rem, 6vw, 6rem);">
                You were told you need a website. You don't.<br>
                <span style="color: var(--text-muted); font-size: 0.9em;">You need a page that answers the phone.</span>
            </h1>
            <p class="hero-sub">
                Naslogic is a Fort Myers agency building custom landing pages for $199 flat. No 5-page digital brochures. Just one page that makes it easy for locals to hire you.
            </p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <a href="#pricing" class="btn btn-primary">View Pricing</a>
                <a href="#autopsy" class="btn btn-outline">Diagnose The Problem</a>
            </div>
        </div>
    </section>

    <!-- The Autopsy -->
    <section id="autopsy" class="autopsy-section section-padding">
        <div class="container">
            <h2 class="autopsy-header gs-reveal">The $2,000 Template Trap.</h2>
            <p class="hero-sub gs-reveal">This is the generic 5-page site other agencies will try to sell you. Here is why it won't get the phone to ring.</p>

            <div class="wireframe-container gs-wireframe">
                <div class="wf-hero">
                    <div style="display:flex;flex-direction:column;align-items:center;">
                        <div class="wf-text" style="font-size:32px;">"We provide services"</div>
                        <div class="wf-btn"></div>
                    </div>
                </div>

                <!-- Redlines -->
                <div class="redline-annotation" style="top: 50px; left: 10%; max-width: 250px;">
                    "We provide services." Tells the customer nothing about how fast you fix problems.
                </div>
                <div class="red-arrow" style="top: 80px; left: 30%; font-size:40px; transform: rotate(135deg);">↗</div>

                <div class="redline-annotation" style="top: 300px; left: 5%; max-width: 250px;">
                    Zero photos of your actual work. Fake stock smiles. Locals see right through this.
                </div>
                <div class="red-arrow" style="top: 250px; left: 20%; font-size:40px; transform: rotate(-45deg);">↖</div>

                <div class="redline-annotation" style="top: 150px; right: 5%; max-width: 280px;">
                    A 14-field form. Callers just want a button that says 'Call Now'.
                </div>
                
                <div style="margin-top:50px; text-align:center;">
                    <div style="width:100%; height:80px; background:#1A1A1A; border:2px dashed #444; margin-bottom:20px;"></div>
                    <div style="display:flex; gap:20px;">
                        <div style="flex:1; height:150px; background:#1A1A1A; border:2px dashed #444;"></div>
                        <div style="flex:1; height:150px; background:#1A1A1A; border:2px dashed #444;"></div>
                        <div style="flex:1; height:150px; background:#1A1A1A; border:2px dashed #444;"></div>
                    </div>
                </div>

                <div class="redline-annotation" style="bottom: 80px; right: 15%; max-width: 300px;">
                    The 'About Us' essay. Nobody reads paragraphs when their exact problem needs solving.
                </div>
            </div>
            
            <div style="margin-top: 100px; max-width: 800px;" class="gs-reveal">
                <p style="font-size: 1.5rem; color: var(--text-main);">Don't pay thousands of dollars for a digital brochure.</p>
                <p style="margin-top: 20px; font-size: 1.1rem;">Most local businesses get completely ripped off. We build hand-coded landing pages engineered to do one specific thing: turn a local visitor into a direct phone call. No bloated templates, no confusing menus. Just straightforward design that helps you get hired.</p>
            </div>
        </div>
    </section>

    <!-- Pricing Strategy -->
    <section id="pricing" class="pricing-section section-padding">
        <div class="container">
            <h2 class="autopsy-header gs-reveal" style="margin-bottom: 20px;">The $199 Page.</h2>
            <p class="hero-sub gs-reveal" style="max-width: 600px;">No tier lists. No recurring subscriptions. Just one price for a page that works.</p>

            <div class="pricing-grid gs-reveal" style="grid-template-columns: 1fr; max-width: 600px; margin: 80px auto 0;">
                
                <div class="tier-card featured" style="border: none;">
                    <h3 class="tier-name">Complete Landing Page</h3>
                    <div class="tier-price">$199</div>
                    <p class="tier-desc">A custom HTML/CSS landing page built directly in Fort Myers. Perfect for first-time buyers.</p>
                    <ul class="tier-features" style="text-align: left;">
                        <li>1 Custom Designed Page</li>
                        <li>Mobile Responsive Layout</li>
                        <li>One-click "Call Now" buttons</li>
                        <li>Delivered in 48 Hours</li>
                        <li>Zero recurring software fees</li>
                    </ul>
                    <a href="javascript:void(0)" onclick="openPurchaseModal()" class="btn btn-outline" style="width: 100%; border-color: #444;">Purchase Now - $199</a>
                </div>

            </div>
        </div>
    </section>

    <!-- Ultimatum -->
    <section class="ultimatum">
        <div class="container">
            <h2 class="ultimatum-text gs-reveal">Stop losing calls to competitors with better websites.</h2>
            <div class="gs-reveal">
                <a href="javascript:void(0)" onclick="openPurchaseModal()" class="btn btn-primary">Fix It Now</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <a href="#" class="footer-logo">NASLOGIC.</a>
            <div class="footer-links">
                <a href="tel:9412573059">(941) 257-3059</a>
                <a href="/privacy">Privacy Policy</a>

            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="/forms.js"></script>

    <script>
        document.addEventListener("DOMContentLoaded", (event) => {
            gsap.registerPlugin(ScrollTrigger);

            // Nav scroll hide
            let lastScroll = 0;
            const nav = document.querySelector('.nav');
            
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                if (currentScroll <= 0) {
                    nav.classList.remove('nav--hidden');
                    return;
                }
                if (currentScroll > lastScroll) {
                    nav.classList.add('nav--hidden');
                } else {
                    nav.classList.remove('nav--hidden');
                }
                lastScroll = currentScroll;
            });

            // Standard Reveals
            gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
                gsap.fromTo(elem, 
                    { y: 50, opacity: 0 }, 
                    {
                        y: 0, 
                        opacity: 1, 
                        duration: 1, 
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });

            // Autopsy Redline Animation
            const tlAutopsy = gsap.timeline({
                scrollTrigger: {
                    trigger: ".gs-wireframe",
                    start: "top 60%",
                    toggleActions: "play none none none"
                }
            });

            tlAutopsy.to(".redline-annotation, .red-arrow", {
                opacity: 1,
                duration: 0.5,
                stagger: 0.2,
                ease: "power2.out"
            });
        });
    </script>
</body>
</html>
"""

# Write the final file safely!
with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(head_part + NEW_BODY)

print("Conversion to brutalist layout successful. Preserved all SEO head tags.")
