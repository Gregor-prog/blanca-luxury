const fs = require('fs');
const content = fs.readFileSync('c:/Users/HP/blanca-luxury/blanca-luxury-frontend/app/(public)/page.tsx', 'utf8');

const componentTags = content.match(/<[A-Z][a-zA-Z0-9]*/g) || [];
const uniqueTags = [...new Set(componentTags)].map(t => t.substring(1));

const imports = content.match(/import\s+.*\s+from\s+['"].*['"]/g) || [];

console.log('Unique Tags:', uniqueTags);
console.log('Imports found:', imports.length);

const missing = [];
uniqueTags.forEach(tag => {
  if (tag === 'Fragment' || tag === 'React') return;
  const regex = new RegExp(`import\\s+.*${tag}.*\\s+from`, 'i');
  if (!imports.some(imp => regex.test(imp))) {
    missing.push(tag);
  }
});

console.log('Potentially missing imports:', missing);
