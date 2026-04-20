const fs = require('fs');
const path = require('path');

const storeDir = 'c:/Users/HP/blanca-luxury/blanca-luxury-frontend/lib/store';
const files = fs.readdirSync(storeDir).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

const graph = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(storeDir, file), 'utf8');
  const imports = content.match(/import.*from\s+['"]\.\/(.*)['"]/g) || [];
  graph[file.replace(/\.tsx?$/, '')] = imports.map(imp => {
    const match = imp.match(/['"]\.\/(.*)['"]/);
    return match ? match[1] : null;
  }).filter(Boolean);
});

console.log('Dependency Graph:', JSON.stringify(graph, null, 2));

function hasCycle(node, visited = new Set(), path = new Set()) {
  if (path.has(node)) return true;
  if (visited.has(node)) return false;

  visited.add(node);
  path.add(node);

  for (const neighbor of (graph[node] || [])) {
    if (hasCycle(neighbor, visited, path)) {
      console.log('Cycle detected at:', node, '->', neighbor);
      return true;
    }
  }

  path.delete(node);
  return false;
}

const nodes = Object.keys(graph);
let cycleFound = false;
for (const node of nodes) {
  if (hasCycle(node)) {
    cycleFound = true;
  }
}

if (!cycleFound) console.log('No circular dependencies found in lib/store.');
