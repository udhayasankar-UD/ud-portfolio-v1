import fs from 'fs';

let data = fs.readFileSync('src/data/blog-data.ts', 'utf-8');

// Update the interface
data = data.replace(
    /tag: 'hero' \| 'recent' \| 'top-list' \| 'ai-dispatch' \| 'featured-essay' \| 'chain-of-thought' \| 'podcast' \| 'product-pick';/,
    "tag?: 'ai-dispatch' | 'featured-essay' | 'chain-of-thought' | 'podcast' | 'product-pick' | 'essay';"
);

// Add the config object after the interface
const configObj = `
export const blogLayoutConfig = {
  hero: '1',
  recent: ['2', 'new-unique-id'],
  topList: ['4', '5', '6', '7', '14']
};
`;

if (!data.includes('blogLayoutConfig')) {
    data = data.replace('export const mockBlogPosts: BlogPost[] = [', configObj + '\nexport const mockBlogPosts: BlogPost[] = [');
}

// Replace exact tags for the older entries
data = data.replace(/tag: 'hero'/g, "tag: 'essay'");
// Wait, id: '3' was recent but I replaced recent with 'new-unique-id' above? Let's just make sure all 'recent' go to 'essay'
data = data.replace(/tag: 'recent'/g, "tag: 'essay'");
data = data.replace(/tag: 'top-list'/g, "tag: 'essay'");

fs.writeFileSync('src/data/blog-data.ts', data);
console.log('Updated blog-data.ts with config array');
