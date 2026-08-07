const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const floatingHeartsComponent = `
const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      return Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: \`\${Math.random() * 100}vw\`,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        size: 10 + Math.random() * 20
      }));
    };
    setHearts(generateHearts());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, x: 0 }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.7, 0],
            x: [0, Math.random() * 100 - 50, 0]
          }}
          transition={{ 
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute text-pink-500/30"
          style={{ left: heart.left }}
        >
          <Heart size={heart.size} className="fill-pink-500/20" />
        </motion.div>
      ))}
    </div>
  );
};
`;

content = content.replace(
  /const ThemeToggle = /,
  `${floatingHeartsComponent}\n\nconst ThemeToggle = `
);

content = content.replace(
  /<div className=\{\`\$\{isDark \? 'dark' : ''\} min-h-screen bg-\[var\(--bg-main\)\] text-\[var\(--text-main\)\] font-inter pb-32 selection:bg-pink-500\/30 overflow-x-hidden transition-colors duration-500\`\}>\n\s*<ThemeToggle isDark=\{isDark\} setIsDark=\{setIsDark\} \/>/,
  `<div className={\`\${isDark ? 'dark' : ''} min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-inter pb-32 selection:bg-pink-500/30 overflow-x-hidden transition-colors duration-500\`}>\n      <FloatingHearts />\n      <ThemeToggle isDark={isDark} setIsDark={setIsDark} />`
);

fs.writeFileSync('src/App.tsx', content);
