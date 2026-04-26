import os
import re

PUBLIC_DIR = 'public'

pages = [
    'dental.html', 'ecommerce.html', 'experience.html', 'fitness.html', 
    'hvac.html', 'legal.html', 'medspa.html', 'plumbing.html', 
    'realestate.html', 'restaurants.html', 'roofing.html', 'saas.html'
]

# CTA Replacements (Exact matching where possible)
cta_replacements = {
    "Commission A Design Tasting": "See Menu Examples",
    "Commission Us": "Get A Free Quote",
    "Dispatch Team": "Contact Us",
    "Initiate Pipeline": "Start Getting Calls",
    "Commission A Build": "Get Pricing Now",
    "RETAIN US": "Get Legal Leads",
    "DECRYPT THE SOLUTION": "See How It Works",
    "SUBMIT FOR REVIEW": "Request A Free Quote",
    "Route Dispatch": "Contact Us",
    "Boot Sequence": "Get More Jobs Now",
    ">INITIATE<": ">Start Growing Today<",
    ">COMMISSION SITE<": ">Get A Free Quote<",
    "Deploy Framework": "Get Started",
    "Initialize Setup": "See Pricing",
    "Compile Final Build": "Get More Signups",
    "Initiate Overhaul": "Get Pricing Now",
    "Book Consultation": "Get A Free Quote",
    "COMMISSION A DESIGN": "Get Pricing Now",
    "LET'S TALK": "Contact Us",
    "Consultation": "Contact Us",
    "Get Started": "Get Pricing Now"
}

# SEO Block replacements
seo_replacements = {
    'dental': "People don't just want clean teeth. They want a smile they can be proud of. But if your website looks old or confusing, they will go to another dentist. We build beautiful websites that make your clinic look like the best choice in town. When they see your site, they will want to book a visit right away.",
    'ecommerce': "When someone visits your online store, they decide to stay or leave in just 3 seconds. If your site is slow or hard to use on a phone, you lose the sale. We build fast, simple online stores that make people want to buy. Our sites make it super easy for customers to add things to their cart and checkout.",
    'experience': "People want to have fun. If your event website looks boring or is hard to buy tickets on, they will just stay home. We build exciting websites that show off how great your event is. We make it so easy to buy a ticket that your events will sell out faster than ever.",
    'fitness': "People want to get in shape, but they are scared to take the first step. If your gym website looks intimidating or confusing, they won't sign up. We build friendly, motivating websites that make it easy for people to join. They will see your site and want to start working out with you today.",
    'hvac': "When the AC breaks in the middle of summer, people don't want to read a long website. They just want someone to fix it fast. They will call the first company they find that looks ready to help. We build fast websites with a big 'Call Now' button so you get the job before the other guys do.",
    'legal': "When people need a lawyer, they are usually stressed and worried. They need someone they can trust. If your website looks cheap or confusing, they will keep looking. We build professional websites that show you are an expert who can help. We make it easy for them to call you and get the help they need.",
    'medspa': "People go to a medspa to feel beautiful and relaxed. Your website needs to feel the exact same way. If it looks cheap, they won't trust you with their skin. We build stunning, clean websites that make your medspa look like a luxury getaway. When they see your site, they will want to book a treatment.",
    'plumbing': "A burst pipe doesn't wait for business hours. When water is everywhere, people don't read long paragraphs. They grab their phone and call the first plumber they find. We build fast, simple websites that put your phone number right at the top. You get the call because your site makes it the easiest thing to do.",
    'realestate': "Buying or selling a home is a big deal. People want an agent who looks successful and knows what they are doing. If your website looks like it's from 10 years ago, they won't trust you with their biggest purchase. We build premium websites that make you look like the top agent in your city.",
    'restaurants': "When people are hungry, they want to see what's on the menu fast. If your restaurant website is hard to read on a phone, they will just order from somewhere else. We build mouth-watering websites that show off your food and make it super simple to place an order or book a table.",
    'roofing': "Getting a new roof is expensive and stressful. Homeowners want to hire someone reliable. If your website looks untrustworthy, they will pick a different roofer. We build professional websites that show you are a serious, local business. We put a big 'Get a Quote' button so they know exactly what to do next.",
    'saas': "Your software might be the best in the world, but if people don't understand it, they won't buy it. A confusing website kills sales. We build clean, easy-to-read websites that explain exactly why your software is great. We make the 'Sign Up' button so clear that people can't help but click it."
}

def process_file(filename):
    filepath = os.path.join(PUBLIC_DIR, filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filename}, not found.")
        return
    
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # 1. Replace CTAs
    for old_cta, new_cta in cta_replacements.items():
        # Careful not to replace things inside HTML tags if they are just substrings
        # But our CTAs are pretty unique phrases.
        content = content.replace(old_cta, new_cta)

    # 2. Replace SEO Block paragraphs
    niche = filename.replace('.html', '')
    if niche in seo_replacements:
        new_seo_text = seo_replacements[niche]
        
        # Find the h2 and the following p
        pattern = r'(<h2[^>]*>Why.*?Need a Custom Website.*?</h2>\s*<p[^>]*>)(.*?)(</p>)'
        
        def replace_seo_p(match):
            return match.group(1) + new_seo_text + match.group(3)
        
        content = re.sub(pattern, replace_seo_p, content, count=1, flags=re.DOTALL | re.IGNORECASE)

    # 3. Specifically fix Hero descriptions and other complex text on pages
    if niche == 'dental':
        content = content.replace("Patients buying cosmetic dentistry are not buying medical procedures; they are buying status, confidence, and absolute perfection. <br><br>We use 'Veneer Glassmorphism'—an ultra-clean, pristine design language that utilizes slow reveals, massive whitespace, and editorial typography to make your practice look undeniably premium.", 
                                  "People don't just buy dental work; they buy a confident smile. <br><br>We build beautiful, simple websites that make your clinic look like the best choice in town. No confusing menus, just a clean design that makes people want to book a visit.")
        content = content.replace("If you charge $30,000 for a full mouth restoration, your website cannot afford to look like a $500 template. We build digital <i>veneers</i>—flawless, high-converting architectures for cosmetic dentists.",
                                  "If you offer high-quality dental care, your website shouldn't look cheap. We build premium, easy-to-use websites that help you get more patients.")
        content = content.replace("CLINICAL LUXURY.", "BEAUTIFUL DESIGN.")
    elif niche == 'hvac':
        content = content.replace("A $15,000 smart climate system deserves a $15,000 digital presentation. As your prospective client scrolls, we utilize scroll-linked dynamic background rendering to literally visualize their problem being solved. We cool the room down. Psychological conversion.",
                                  "A great AC system needs a great website to match. We build sites that look fast, cool, and reliable. We show your customers exactly how you can solve their problem so they choose you instead of the other guys.")
        content = content.replace("We replace your generic contact form with a dead-simple dispatch system: emergency or scheduled? Service area? Phone number front and center. Homeowners in 105°F heat don't scroll — they call the number they see first.",
                                  "We get rid of long, confusing forms. We make a simple page that asks: Is it an emergency? Where are you? With a big phone number right at the top. When it is super hot outside, people don't want to search around. They just click to call.")
        content = content.replace("It's 95°F in Southwest Florida at 11 PM. A family's AC just died. They'll call the first HVAC company with a page that loads fast, shows a phone number front and center, and says \"24/7 Emergency Service.\" HVAC leads are won or lost in the first 3 minutes. Your page determines whether you get the call.",
                                  "When the AC breaks in the middle of summer, people don't want to read a long website. They just want someone to fix it fast. They will call the first company they find that looks ready to help. We build fast websites with a big 'Call Now' button so you get the job.")
        content = content.replace("SYSTEM ROUTING", "EASY BOOKING")
        content = content.replace("ACHIEVE OPTIMAL FLOW.", "GET MORE SERVICE CALLS.")
        content = content.replace("Initiate complete system overhaul procedures today.", "Let us build a site that gets your phones ringing.")
        content = content.replace("MASTER <br>THE CLIMATE.", "BEAT <br>THE HEAT.")
        content = content.replace("THE ARCHITECTURE", "THE DESIGN")
    elif niche == 'plumbing':
        content = content.replace("The average commercial plumbing contract is $50,000+. You cannot win commercial bids with a website built for residential toilet repairs. We build structural, aggressive digital footprints for master plumbers.",
                                  "When pipes burst, people don't read long websites. They call the first plumber they find online. We build fast, simple websites that put your phone number front and center, so you get the call before the other guys do.")
        content = content.replace("HYDRO<br>DYNAMIC.", "FAST<br>SERVICE.")
        content = content.replace("CLEAR THE BLOCKAGE.", "START GETTING MORE CALLS.")

    # You could add more niche specific replacements here if needed, 
    # but the above covers the ones we saw and global CTAs and SEO paragraphs cover the rest.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filename}")

for page in pages:
    process_file(page)

print("Done.")
