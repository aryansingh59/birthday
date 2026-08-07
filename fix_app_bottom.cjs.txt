const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /export default function App\(\) \{\s+const \[isDark, setIsDark\] = useState\(true\);\s+useEffect\(\(\) => \{\s+if \(isDark\) \{\s+document.documentElement.classList.add\('dark'\);\s+\} else \{\s+document.documentElement.classList.remove\('dark'\);\s+\}\s+\}, \[isDark\]\);\s+const \[isDark, setIsDark\] = useState\(true\);/,
  `export default function App() {\n  const [isDark, setIsDark] = useState(true);\n  \n  useEffect(() => {\n    if (isDark) {\n      document.documentElement.classList.add('dark');\n    } else {\n      document.documentElement.classList.remove('dark');\n    }\n  }, [isDark]);`
);

fs.writeFileSync('src/App.tsx', content);
