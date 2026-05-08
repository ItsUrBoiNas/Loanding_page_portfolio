const fs = require('fs');

const file = 'c:\\Users\\nasir\\OneDrive\\Desktop\\Projects\\landing page portfolio\\public\\naslogic.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Unify Pricing
content = content.replace(/\$499/g, '$399');
content = content.replace(/\$199/g, '$399');
content = content.replace(/"499"/g, '"399"');

// 2. Nav CTA update
content = content.replace(
    'style="padding: 12px 24px;">Start Project</a>',
    'style="padding: 12px 24px;">Get a Free Quote</a>'
);

// 3. Remove fake scarcity - using regex to ignore whitespace variations
content = content.replace(/We only take on 5 new clients per month—/g, '');

// 4. Update Founder Section Text
content = content.replace(
    'I build these pages by hand. No templates, no churning out garbage.',
    'I personally oversee every page we build. We don\'t churn out garbage.'
);

// 5. Move Founder Section
const founderSectionRegex = /<!-- E-E-A-T: Author Bio \/ Meet the Builder -->[\s\S]*?<\/section>/;
const match = content.match(founderSectionRegex);
if (match) {
    const founderSection = match[0];
    content = content.replace(founderSection, ''); // remove it from its current position
    // insert it before pricing
    content = content.replace(
        '<!-- Pricing Strategy -->',
        founderSection + '\n\n            <!-- Pricing Strategy -->'
    );
}

fs.writeFileSync(file, content);
console.log('Update complete');
