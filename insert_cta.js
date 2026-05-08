const fs = require('fs');

const file = 'c:\\Users\\nasir\\OneDrive\\Desktop\\Projects\\landing page portfolio\\public\\naslogic.html';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `site in just 48 hours. Backed by our 100% money back guarantee.</p>\n                        </div>`;

const newStr = `site in just 48 hours. Backed by our 100% money back guarantee.</p>\n                            <div style="margin-top: 40px;">\n                                <a href="javascript:void(0)" onclick="openQuoteModal()" class="btn btn-primary"\n                                    style="background: #FBBF24; color: #000; border: none; padding: 16px 32px; font-weight: 700; font-family: var(--font-display);">Get a Free Quote</a>\n                            </div>\n                        </div>`;

// Or an even simpler replacement in case of carriage returns
const regex = /site in just 48 hours\. Backed by our 100% money back guarantee\.<\/p>[\s]*<\/div>/;

content = content.replace(regex, newStr);

fs.writeFileSync(file, content);
console.log('Update complete');
