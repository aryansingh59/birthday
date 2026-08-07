/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Quote, Pause, Play, Gift, Mail, Star, MapPin, Coffee, MessageCircle, Sparkles, ChevronLeft, ChevronRight, Ticket, Clock, Key, Bot, Moon, Sun } from 'lucide-react';

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

const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
        hidden: {}
      }}
      className="inline"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, filter: "blur(4px)", y: 5 },
            visible: { opacity: 1, filter: "blur(0px)", y: 0 }
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center relative p-6 text-center">
       <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] px-4 py-2 rounded-full backdrop-blur-md mb-12"
       >
         <Sparkles size={14} className="text-pink-400" />
         <span className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] font-bold">A Special Day For A Special Person</span>
         <Gift size={14} className="text-purple-400" />
       </motion.div>
       
       <motion.h1 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="font-playfair text-5xl md:text-7xl text-[var(--heading-color)] mb-6 leading-tight"
       >
         Happy<br/>Birthday,<br/>
         <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 italic text-4xl md:text-6xl mt-2 block">My Most Special Person</span>
       </motion.h1>
       
       <motion.div
         animate={{ scale: [1, 1.1, 1] }}
         transition={{ repeat: Infinity, duration: 2 }}
       >
         <Heart size={48} className="text-pink-500 fill-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] my-8" />
       </motion.div>
       
       <motion.p 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.4 }}
         className="text-lg text-[var(--text-muted)] font-inter max-w-sm mx-auto mb-16 leading-relaxed"
       >
         Today the world became more beautiful because you were born.
       </motion.p>
       
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.8 }}
         className="animate-bounce flex flex-col items-center gap-2 text-[var(--text-muted)]"
       >
         <span className="text-[10px] uppercase tracking-widest font-semibold text-pink-400/80">Scroll Gently</span>
       </motion.div>
    </section>
  )
}

const Letter = () => {
  return (
    <section className="py-20 px-6 max-w-2xl mx-auto relative">
      <div className="bg-[var(--bg-alt)]/80 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2rem] relative overflow-hidden shadow-2xl">
         <Mail className="absolute -top-10 -right-10 w-64 h-64 text-[var(--heading-color)]/5 -rotate-12" />
         
         <div className="relative z-10">
           <h2 className="font-playfair text-3xl md:text-4xl text-[var(--heading-color)] mb-10 text-center">A Letter for You</h2>
           
           <div className="font-dancing text-2xl md:text-3xl text-pink-50/90 leading-relaxed space-y-6 text-left">
             <p><TypewriterText text="My Dearest Rita," delay={0} /></p>
             <p><TypewriterText text="Happy Birthday!" delay={0.5} /></p>
             <p><TypewriterText text="I wanted to make something truly special for you, something that shows even just a fraction of how much you mean to me. You bring so much light and joy into my life, and this day is the perfect excuse to celebrate the amazing person you are." delay={1} /></p>
             <p><TypewriterText text="Every moment with you is a gift. Your kindness, your laugh, your beautiful spiritâ€”they all make the world a better place." delay={3} /></p>
             <p><TypewriterText text="I hope this year brings you all the happiness, love, and success you deserve. Keep shining, keep smiling, and never forget how incredibly special you are." delay={5} /></p>
             <p className="pt-8"><TypewriterText text="With all my heart," delay={7} /></p>
             <p className="text-4xl text-pink-400"><TypewriterText text="Aryan" delay={7.5} /></p>
           </div>
         </div>
      </div>
    </section>
  )
}

const AutoTourGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight;
      const scroll = Math.round((totalScroll / windowHeight) * 100);
      setScrollProgress(scroll || 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      if (scrollRef.current) clearInterval(scrollRef.current);
      setIsAutoScrolling(false);
    } else {
      setIsAutoScrolling(true);
      scrollRef.current = setInterval(() => {
        window.scrollBy({ top: 1, behavior: 'auto' });
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          if (scrollRef.current) clearInterval(scrollRef.current);
          setIsAutoScrolling(false);
        }
      }, 15);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollRef.current) clearInterval(scrollRef.current);
    };
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-20 z-50 w-12 h-12 bg-[var(--bg-alt)]/90 backdrop-blur-md border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 shadow-lg hover:scale-105 transition-transform"
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="fixed top-20 right-4 z-50 w-72 bg-[var(--bg-alt)]/95 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Bot size={20} />
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--heading-color)]">âœ•</button>
            </div>
            
            <h3 className="text-[var(--heading-color)] font-playfair text-xl mb-2">Auto-Tour Guide</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">A grand entrance for the most special person.</p>
            
            <div className="space-y-3">
              <button onClick={toggleAutoScroll} className="w-full py-3 px-4 rounded-xl border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                {isAutoScrolling ? <Pause size={16} /> : <Play size={16} />} {isAutoScrolling ? "Pause Auto-Scroll" : "Start Auto-Scroll"}
              </button>
              <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="w-full py-3 px-4 rounded-xl border border-pink-500/30 text-pink-400 hover:bg-pink-500/10 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <Gift size={16} /> Reveal All Surprises
              </button>
            </div>
            
            <div className="mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
              <span>Scroll Progress</span>
              <span>{scrollProgress}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

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
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
          src="https://cdn.openai.com/api/audio/alloy.wav"
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
          <div className="absolute top-0 left-0 h-full bg-pink-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-[var(--text-muted)] font-medium pr-2">{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
      <div className="mt-8 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl backdrop-blur-md text-left shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500" />
        <Quote className="text-pink-500/20 w-12 h-12 absolute -top-2 -left-2" />
        <p className="text-sm md:text-base text-[var(--text-main)] font-medium leading-relaxed relative z-10 italic">
          "Happy Birthday to the most amazing person in the universe! ðŸŒŸ Every single day, I count my lucky stars because you are in my life. You bring an incredible amount of light, warmth, and pure joy into my world, and honestly, I don't know what I would do without you. Your smile has this magical way of brightening even the gloomiest of days, and your laughter is absolutely my favorite sound in the whole world. ðŸ’–

I want you to know how deeply I cherish every single moment we share. From our quiet, simple times to our craziest adventures, every memory with you is a treasure I hold close to my heart. You have this beautiful soul that makes everyone around you feel special, but I am the luckiest one because I get to call you mine. 

As you celebrate this special day, I wish for all your dreams to come true. May this coming year bring you boundless happiness, endless success, and all the love you truly deserve. I promise to be by your side through every high and low, cheering you on and loving you more with each passing day. You mean everything to me. Have the most incredible birthday ever, my love!"
        </p>
      </div>
    </section>
  )
}

const WrittenInStars = () => {
  return (
    <section className="py-24 px-6 text-center overflow-hidden relative">
      <div className="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-3">Written In The Stars</div>
      <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-16">The Sky When<br/>You Were Born</h2>
      <div className="w-64 h-64 mx-auto rounded-full border border-[var(--card-border)] bg-gradient-to-b from-[#0b1021] to-[#1a1a2e] relative flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.15)]">
         {/* Fake star constellations */}
         <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
           <circle cx="20" cy="30" r="1" fill="#fff" />
           <circle cx="80" cy="40" r="1.5" fill="#fff" />
           <circle cx="50" cy="80" r="1" fill="#fff" />
           <circle cx="30" cy="70" r="0.5" fill="#fff" />
           <circle cx="70" cy="20" r="1" fill="#fff" />
           <path d="M20,30 L30,70 L50,80 L80,40 L70,20 Z" stroke="#a855f7" strokeWidth="0.2" fill="none" />
         </svg>
         <div className="text-center z-10 bg-[var(--bg-main)]/40 px-6 py-4 rounded-full backdrop-blur-sm border border-white/5">
           <Star className="text-pink-400 mx-auto mb-2 fill-pink-400 drop-shadow-md" size={24} />
           <div className="text-[var(--heading-color)] font-medium">Mumbai, India</div>
           <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">A Star Was Born</div>
         </div>
      </div>
    </section>
  )
}

const Memories = () => {
  const images = [
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop"
  ];
  return (
    <section className="py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-4">Our Beautiful Memories</h2>
        <p className="text-[var(--text-muted)] max-w-sm mx-auto text-sm leading-relaxed">Every picture tells a story of a moment I never want to forget.</p>
      </div>
      <div className="flex flex-col gap-8 max-w-md mx-auto">
         {images.map((img, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
             <img src={img} className="w-full aspect-square object-cover rounded-[2rem] shadow-2xl border border-white/5 bg-[var(--card-bg)] p-2" alt={`Memory ${i+1}`} />
           </motion.div>
         ))}
      </div>
    </section>
  )
}

const StoryBook = () => {
  const pages = [
    "Page 1: The day I realized I was falling for you. It was sudden, beautiful, and completely out of my control.",
    "Page 2: Your laugh. It's my favorite sound in the entire world, better than any song.",
    "Page 3: The way you look at me. Sometimes I catch you staring, and my heart skips a beat."
  ];
  const [page, setPage] = useState(0);
  
  return (
    <section className="py-24 px-6 flex flex-col items-center">
       <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-3">Every Love Story Book</div>
       <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-16">Our Story Book</h2>
       
       <div className="bg-[#fcfaf5] p-10 md:p-14 rounded-r-3xl rounded-l-md shadow-[20px_20px_60px_rgba(0,0,0,0.5)] max-w-md w-full relative border-l-[12px] border-[#311020] min-h-[320px] flex items-center justify-center">
          <div className="absolute inset-y-0 left-4 border-l-2 border-[#311020]/10" />
        
