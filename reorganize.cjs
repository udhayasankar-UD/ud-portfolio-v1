const fs = require('fs');
const path = require('path');

const dirsToCreate = [
    'src/components/portfolio/hero',
    'src/components/portfolio/about',
    'src/components/portfolio/projects',
    'src/components/portfolio/skills',
    'src/components/portfolio/certifications',
    'src/components/portfolio/contact',
    'src/components/portfolio/resume',
    'src/components/portfolio/footer',
    'public/assets/images/certifications',
    'public/assets/images/projects',
    'public/assets/resume'
];

dirsToCreate.forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
});

const moves = [
    // Hero
    ['src/components/portfolio/Hero3D.tsx', 'src/components/portfolio/hero/Hero3D.tsx'],

    // About
    ['src/components/portfolio/AboutSection.tsx', 'src/components/portfolio/about/AboutSection.tsx'],
    ['src/components/portfolio/AvatarParallax.tsx', 'src/components/portfolio/about/AvatarParallax.tsx'],

    // Projects
    ['src/components/portfolio/AlbumProjectsSection.tsx', 'src/components/portfolio/projects/AlbumProjectsSection.tsx'],
    ['src/components/portfolio/AlbumCase.tsx', 'src/components/portfolio/projects/AlbumCase.tsx'],
    ['src/components/portfolio/AlbumDetailsCard.tsx', 'src/components/portfolio/projects/AlbumDetailsCard.tsx'],
    ['src/components/portfolio/AlbumEndSlide.tsx', 'src/components/portfolio/projects/AlbumEndSlide.tsx'],
    ['src/components/portfolio/ProjectsSection.tsx', 'src/components/portfolio/projects/ProjectsSection.tsx'],

    // Skills
    ['src/components/portfolio/SkillsSection.tsx', 'src/components/portfolio/skills/SkillsSection.tsx'],
    ['src/components/portfolio/SkillsChart.tsx', 'src/components/portfolio/skills/SkillsChart.tsx'],
    ['src/components/portfolio/BrainExplorer.tsx', 'src/components/portfolio/skills/BrainExplorer.tsx'],
    ['src/components/portfolio/RegionButtons.tsx', 'src/components/portfolio/skills/RegionButtons.tsx'],
    ['src/components/portfolio/Hotspot.tsx', 'src/components/portfolio/skills/Hotspot.tsx'],
    ['src/components/portfolio/SkillDetailPanel.tsx', 'src/components/portfolio/skills/SkillDetailPanel.tsx'],

    // Certifications
    ['src/components/portfolio/CertificationsSection.tsx', 'src/components/portfolio/certifications/CertificationsSection.tsx'],
    ['src/components/portfolio/CertificationsList.tsx', 'src/components/portfolio/certifications/CertificationsList.tsx'],
    ['src/components/portfolio/CertCarousel.tsx', 'src/components/portfolio/certifications/CertCarousel.tsx'],
    ['src/components/portfolio/CertCard.tsx', 'src/components/portfolio/certifications/CertCard.tsx'],
    ['src/components/portfolio/CertModal.tsx', 'src/components/portfolio/certifications/CertModal.tsx'],

    // Contact
    ['src/components/portfolio/ContactSection.tsx', 'src/components/portfolio/contact/ContactSection.tsx'],
    ['src/components/portfolio/ContactModel3D.tsx', 'src/components/portfolio/contact/ContactModel3D.tsx'],

    // Resume
    ['src/components/portfolio/ResumeSection.tsx', 'src/components/portfolio/resume/ResumeSection.tsx'],

    // Footer
    ['src/components/portfolio/FooterSection.tsx', 'src/components/portfolio/footer/FooterSection.tsx'],

    // Resume File
    ['public/Assets/UdhayaSankar_Resume.pdf', 'public/assets/resume/UdhayaSankar_Resume.pdf']
];

moves.forEach(([src, dest]) => {
    if (fs.existsSync(src)) {
        fs.renameSync(src, dest);
        console.log(`Moved ${src} to ${dest}`);
    }
});

// Move uploads to certifications
if (fs.existsSync('public/uploads')) {
    const uploads = fs.readdirSync('public/uploads');
    uploads.forEach(file => {
        fs.renameSync(`public/uploads/${file}`, `public/assets/images/certifications/${file}`);
    });
    console.log('Moved public/uploads to public/assets/images/certifications');
    fs.rmdirSync('public/uploads');
}

// Move Project_img to projects
if (fs.existsSync('public/Assets/Project_img')) {
    const projImgs = fs.readdirSync('public/Assets/Project_img');
    projImgs.forEach(file => {
        fs.renameSync(`public/Assets/Project_img/${file}`, `public/assets/images/projects/${file}`);
    });
    console.log('Moved public/Assets/Project_img to public/assets/images/projects');
    fs.rmdirSync('public/Assets/Project_img');
}

// Keep other assets from public/Assets in public/assets/images/ if any? There's lucas.png, mozhiyaam.png, Civic Radar.png
if (fs.existsSync('public/Assets')) {
    const otherAssets = fs.readdirSync('public/Assets').filter(f => fs.statSync(`public/Assets/${f}`).isFile());
    otherAssets.forEach(file => {
        fs.renameSync(`public/Assets/${file}`, `public/assets/images/${file}`);
    });
    console.log('Moved loose assets from public/Assets to public/assets/images');
    fs.rmdirSync('public/Assets');
}

console.log('Done!');
