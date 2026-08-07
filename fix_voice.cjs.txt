const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const voiceComponent = `
const VoiceFromHeart = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log('Voice play failed', e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
    }
  };

  return (
    <section className="py-16 px-6 max-w-md mx-auto text-center">
      <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-3">A Voice From My Heart</div>
      <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-10">Just For You</h2>
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full p-4 flex items-center gap-4 backdrop-blur-md">
        <audio 
          ref={audioRef} 
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/I_Love_You.ogg"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        <button onClick={togglePlay} className="w-12 h-12 bg-pink-500 hover:bg-pink-400 rounded-full flex items-center justify-center text-[var(--heading-color)] shrink-0 transition-colors shadow-lg shadow-pink-500/20">
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
        </button>
        <div 
          className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden cursor-pointer relative"
          onClick={handleProgressClick}
        >
          <div className="absolute top-0 left-0 h-full bg-pink-500 rounded-full" style={{ width: \`\${progress}%\` }} />
        </div>
        <span className="text-xs text-[var(--text-muted)] font-medium pr-2">{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
    </section>
  )
}
`;

content = content.replace(
  /const VoiceFromHeart = \(\) => \{\s*return \(\s*<section className="py-16 px-6 max-w-md mx-auto text-center">[\s\S]*?<\/section>\s*\)\s*\}/,
  voiceComponent.trim()
);

fs.writeFileSync('src/App.tsx', content);
