import fs from 'fs';

let certData = fs.readFileSync('src/components/portfolio/certifications/CertCarousel.tsx', 'utf-8');
certData = certData.replace(/\/uploads\//g, '/Assets/images/certifications/');
fs.writeFileSync('src/components/portfolio/certifications/CertCarousel.tsx', certData);

console.log('Fixed paths in CertCarousel.tsx');
