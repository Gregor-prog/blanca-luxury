const fs = require('fs');
const path = require('path');

const compDir = 'c:/Users/HP/blanca-luxury/blanca-luxury-frontend/components';
const files = fs.readdirSync(compDir).filter(f => f.endsWith('.tsx'));

const graph = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(compDir, file), 'utf8');
  // Match relative imports like ./Something
  const imports = content.match(/import.*from\s+['"]\.\/(.*)['"]/g) || [];
  graph[file.replace(/\.tsx?$/, '')] = imports.map(imp => {
    const match = imp.match(/['"]\.\/(.*)['"]/);
    return match ? match[1] : null;
  }).filter(Boolean);
});

console.log('Component Dependency Graph:', JSON.stringify(graph, null, 2));

function hasCycle(node, visited = new Set(), pathStack = new Set()) {
  if (pathStack.has(node)) return true;
  if (visited.has(node)) return false;

  visited.add(node);
  pathStack.add(node);

  for (const neighbor of (graph[node] || [])) {
    if (hasCycle(neighbor, visited, pathStack)) {
      console.log('Cycle detected at:', node, '->', neighbor);
      return true;
    }
  }

  pathStack.delete(node);
  return false;
}

const nodes = Object.keys(graph);
let cycleFound = false;
for (const node of nodes) {
  if (hasCycle(node)) {
    cycleFound = true;
  }
}

if (!cycleFound) console.log('No circular dependencies found in root components directory.');
