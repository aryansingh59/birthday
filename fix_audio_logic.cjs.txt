const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the AudioPlayer logic completely
const newAudioPlayer = `
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = 0.4;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Autoplay prevented", e));
      }
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log('Audio play failed', e));
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--bg-alt)]/90 backdrop-blur-xl border border-[var(--card-border)] rounded-full px-6 py-3 flex items-center gap-4 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3" preload="auto" />
      <div className="flex flex-col text-left">
         <span className="text-[10px] uppercase tracking-wider text-pink-400 font-bold">Playing</span>
         <span className="text-sm font-medium text-[var(--text-main)]">Our Song</span>
      </div>
      <button onClick={togglePlay} className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all">
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
      </button>
      <div className="flex gap-[3px] items-end h-5">
        {[1,2,3,4,5].map(i => (
          <motion.div key={i} animate={isPlaying ? { height: ['20%', '100%', '20%'] } : { height: '20%' }} transition={{ repeat: Infinity, duration: 0.4 + i*0.1 }} className="w-1 bg-pink-400 rounded-full" />
        ))}
      </div>
    </div>
  )
}
`;

content = content.replace(/const AudioPlayer = \(\) => \{[\s\S]*?return \([\s\S]*?<\/div>\s*<\/div>\s*\)\s*\}/, newAudioPlayer.trim());

fs.writeFileSync('src/App.tsx', content);
