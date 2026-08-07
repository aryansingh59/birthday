const fs = require('fs');
const map = JSON.parse(fs.readFileSync('sourcemap.json', 'utf8'));
fs.writeFileSync('src/App.tsx', map.sourcesContent[0]);
