const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('roast-fort-myers-web-design-custom-landing-pag-004e5g49.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => console.error(err));
