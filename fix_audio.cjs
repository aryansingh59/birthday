const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix AudioPlayer background song
const audioPlayerMatch = content.match(/const AudioPlayer = \(\) => \{[\s\S]*?return \([\s\S]*?<\//);
if (audioPlayerMatch) {
  // We'll just replace the whole AudioPlayer to be bulletproof
}

const improvedAudioPlayer = `
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

    // Try to play on any click anywhere in the document until it plays
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent document click from overriding
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
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ height: isPlaying ? ["20%", "100%", "20%"] : "20%" }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-1 bg-pink-500 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};
`;

content = content.replace(/const AudioPlayer = \(\) => \{[\s\S]*?return \([\s\S]*?<\/div>\s*\);\s*\};/, improvedAudioPlayer.trim());

// 2. Fix VoiceFromHeart
const improvedVoiceFromHeart = `
const VoiceFromHeart = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log('Voice play failed', e));
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  return (
    <section className="py-16 px-6 max-w-md mx-auto text-center">
      <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-3">A Voice From My Heart</div>
      <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-10">Just For You</h2>
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full p-4 flex items-center gap-4 backdrop-blur-md">
        <audio 
          ref={audioRef} 
          /* I have added the standard OpenAI TTS voice preview here as a placeholder for the "openai wala" audio */
          src="https://cdn.openai.com/api/audio/alloy.wav"
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => { setIsPlaying(false); setProgress(0); setCurrentTime(0); }}
        />
        <button onClick={togglePlay} className="w-12 h-12 bg-pink-500 hover:bg-pink-400 rounded-full flex items-center justify-center text-white shrink-0 transition-colors shadow-lg shadow-pink-500/20">
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
        </button>
        <div 
          className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden cursor-pointer relative"
          onClick={handleProgressClick}
        >
          <div className="absolute top-0 left-0 h-full bg-pink-500 rounded-full transition-all duration-100 ease-linear" style={{ width: \`\${progress}%\` }} />
        </div>
        <span className="text-xs text-[var(--text-muted)] font-medium pr-2 w-16 text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <p className="text-xs text-[var(--text-muted)] mt-4">
        (Here is the OpenAI voice note placeholder. If you have the file, you can upload it in the File Explorer on the left!)
      </p>
    </section>
  )
}
`;

content = content.replace(/const VoiceFromHeart = \(\) => \{[\s\S]*?return \([\s\S]*?<\/section>\s*\)\s*\}/, improvedVoiceFromHeart.trim());

fs.writeFileSync('src/App.tsx', content);
