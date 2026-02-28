import fs from 'fs';

let data = fs.readFileSync('src/data/blog-data.ts', 'utf-8');
data = data.replace(/layout:/g, 'tag:');
fs.writeFileSync('src/data/blog-data.ts', data);

let blogPage = fs.readFileSync('src/pages/BlogPage.tsx', 'utf-8');
blogPage = blogPage.replace(/post\.layout ===/g, 'post.tag ===');
fs.writeFileSync('src/pages/BlogPage.tsx', blogPage);

let blogPostPage = fs.readFileSync('src/pages/BlogPostPage.tsx', 'utf-8');
blogPostPage = blogPostPage.replace(/post\.layout ===/g, 'post.tag ===');
fs.writeFileSync('src/pages/BlogPostPage.tsx', blogPostPage);

console.log('Refactored layout to tag');
