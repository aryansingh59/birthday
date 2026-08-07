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
             <p><TypewriterText text="Every moment with you is a gift. Your kindness, your laugh, your beautiful spirit—they all make the world a better place." delay={3} /></p>
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
              <button onClick={() => setIsOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--heading-color)]">✕</button>
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
          "Happy Birthday to the most amazing person in the universe! 🌟 Every single day, I count my lucky stars because you are in my life. You bring an incredible amount of light, warmth, and pure joy into my world, and honestly, I don't know what I would do without you. Your smile has this magical way of brightening even the gloomiest of days, and your laughter is absolutely my favorite sound in the whole world. 💖

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
          <AnimatePresence mode="wait">
            <motion.div 
              key={page}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="font-dancing text-3xl text-slate-800 leading-relaxed text-center px-2"
            >
              {pages[page]}
            </motion.div>
          </AnimatePresence>
          <span className="absolute bottom-6 right-8 text-sm font-inter text-[var(--text-muted)] font-medium">{page + 1}</span>
       </div>
       
       <div className="flex gap-8 mt-12">
         <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="w-14 h-14 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--heading-color)] hover:bg-white/10 transition-colors disabled:opacity-20 disabled:hover:bg-[var(--card-bg)]"><ChevronLeft size={24} /></button>
         <button onClick={() => setPage(Math.min(pages.length - 1, page + 1))} disabled={page === pages.length - 1} className="w-14 h-14 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--heading-color)] hover:bg-white/10 transition-colors disabled:opacity-20 disabled:hover:bg-[var(--card-bg)]"><ChevronRight size={24} /></button>
       </div>
    </section>
  )
}

const Journey = () => {
  const steps = [
    { icon: <Coffee size={20} />, label: 'A BEAUTIFUL DAY', title: 'The First Hello', desc: 'The moment that started it all, etched in time forever.' },
    { icon: <MessageCircle size={20} />, label: 'LATE NIGHTS & EARLY MORNINGS', title: 'Countless Conversations', desc: 'Hours feeling like seconds whenever we talk.' },
    { icon: <Sparkles size={20} />, label: 'EVERY SINGLE DAY', title: 'Creating Magic', desc: 'Every small moment with you feels like a grand adventure.' }
  ];
  return (
    <section className="py-20 px-6 max-w-md mx-auto">
      <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-16 text-center">Our Beautiful Journey</h2>
      <div className="space-y-12">
        {steps.map((step, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-[var(--card-bg)] border border-[var(--card-border)] p-6 md:p-8 rounded-3xl relative"
          >
             <div className="w-12 h-12 rounded-full bg-[var(--bg-alt)] border border-pink-500/30 flex items-center justify-center text-pink-400 absolute -top-6 -left-2 md:-left-6 shadow-lg">
               {step.icon}
             </div>
             <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-2 mt-2">{step.label}</div>
             <h3 className="font-playfair text-2xl text-[var(--heading-color)] mb-3">{step.title}</h3>
             <p className="text-[var(--text-muted)] text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 bg-gradient-to-b from-white/5 to-transparent border border-[var(--card-border)] p-8 rounded-3xl text-center"
      >
        <h3 className="font-playfair text-3xl text-[var(--heading-color)] mb-4">Our Connection</h3>
        <p className="text-[var(--text-muted)] text-sm mb-12">Distance means so little when someone means so much.</p>
        <div className="flex items-center justify-between relative px-2">
           <div className="flex flex-col items-center gap-3 z-10 bg-[var(--bg-main)] p-2 rounded-xl">
             <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400"><MapPin size={20} /></div>
             <span className="text-xs font-medium text-[var(--heading-color)] uppercase tracking-wider text-center">Mumbai<br/><span className="text-purple-400">(Me)</span></span>
           </div>
           <div className="absolute top-8 left-16 right-16 border-t-2 border-dashed border-[var(--card-border-strong)]">
             <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500 fill-pink-500 w-6 h-6 animate-pulse" />
           </div>
           <div className="flex flex-col items-center gap-3 z-10 bg-[var(--bg-main)] p-2 rounded-xl">
             <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400"><MapPin size={20} /></div>
             <span className="text-xs font-medium text-[var(--heading-color)] uppercase tracking-wider text-center">UP<br/><span className="text-pink-400">(Rita)</span></span>
           </div>
        </div>
      </motion.div>
    </section>
  )
}

const Quiz = () => {
  const [step, setStep] = useState(0);
  const questions = [
    { q: "Where did we first meet?", opts: ["At a cafe", "Through friends", "Online", "At work/school"], a: 2 },
    { q: "What is my favorite thing about you?", opts: ["Your smile", "Your intelligence", "Everything", "Your humor"], a: 2 },
    { q: "What do I always say to you?", opts: ["I love you", "You're the best", "You're my favorite", "You mean the world to me"], a: 1 }
  ];
  
  if (step >= questions.length) {
    return (
      <section className="py-24 px-6 text-center max-w-md mx-auto">
        <Heart className="mx-auto text-pink-500 fill-pink-500 mb-6 w-16 h-16" />
        <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-6">You did amazing!</h2>
        <p className="text-[var(--text-muted)] mb-10 leading-relaxed">But honestly, it doesn't matter what you answered. You're still my favorite person in the whole world.</p>
        <button onClick={() => setStep(0)} className="px-8 py-3 rounded-full border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-[var(--heading-color)] transition-colors font-medium">Play Again</button>
      </section>
    )
  }

  const q = questions[step];
  
  return (
    <section className="py-24 px-6 max-w-md mx-auto">
      <div className="text-center mb-12">
        <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-3">Let's Play A Game</div>
        <h2 className="font-playfair text-4xl text-[var(--heading-color)]">How well do<br/>you know us?</h2>
      </div>
      
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] p-6 md:p-8 rounded-[2rem] shadow-xl">
        <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-8 flex justify-between items-center">
          <span>Question {step + 1} of {questions.length}</span>
          <div className="flex gap-1.5">
             {questions.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-pink-500' : 'bg-white/10'}`} />)}
          </div>
        </div>
        <h3 className="font-playfair text-2xl text-[var(--heading-color)] mb-8">{q.q}</h3>
        <div className="space-y-3">
          {q.opts.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => {
                if (i === q.a) {
                  confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#ec4899', '#a855f7'] });
                }
                setTimeout(() => setStep(s => s + 1), 600);
              }}
              className="w-full p-4 md:p-5 text-left rounded-2xl border border-white/5 bg-[var(--card-bg)] hover:bg-white/10 hover:border-pink-500/50 text-[var(--text-main)] transition-all focus:bg-pink-500/20 focus:border-pink-500 text-lg font-medium"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

const Reasons = () => {
  const reasons = [
    "Your incredible kindness towards everyone around you.",
    "The way your smile lights up any room instantly.",
    "Your beautiful, genuine laugh that I could listen to all day.",
    "The way you care so deeply about the people you love.",
    "Your beautiful, genuine laugh that I could listen to all day." // Using a few from video
  ];
  return (
    <section className="py-24 px-6 text-center max-w-md mx-auto">
       <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-3">Just A Few Of The</div>
       <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-16">Reasons Why You're Special</h2>
       
       <div className="space-y-6">
         {reasons.map((r, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-[var(--card-bg)] border border-[var(--card-border)] p-8 rounded-3xl relative overflow-hidden"
           >
             <div className="absolute -top-4 -right-2 text-8xl font-playfair font-bold text-[var(--heading-color)]/[0.03] select-none pointer-events-none">
               {i + 1}
             </div>
             <Heart className="text-pink-500/50 w-6 h-6 mx-auto mb-4" />
             <p className="text-[var(--text-muted)] font-medium text-lg leading-relaxed relative z-10">{r}</p>
           </motion.div>
         ))}
       </div>
    </section>
  )
}

const OpenWhen = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const letters = [
    { label: "Open when you miss me", desc: "I'm always with you in your heart. Just close your eyes and you'll feel me there. I miss you too, more than words can say." },
    { label: "Open when you're stressed", desc: "Take a deep breath. You are incredibly strong and capable. Whatever it is, you've got this, and I've got you." },
    { label: "Open when you feel lonely", desc: "You are never alone. I am just a call or a thought away. I love you so much, Rita." },
    { label: "Open when you can't sleep", desc: "Think of our best memories. Think of how much I love you. Let my love wrap around you like a warm blanket." }
  ];
  return (
    <section className="py-24 px-6 max-w-md mx-auto">
      <div className="text-center mb-16">
        <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-3">For Every Mood</div>
        <h2 className="font-playfair text-4xl text-[var(--heading-color)]">Open When...<br/>Letters</h2>
      </div>
      
      <div className="space-y-4">
        {letters.map((l, i) => (
          <div key={i} className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl overflow-hidden transition-all duration-300">
             <button 
               onClick={() => setOpenIndex(openIndex === i ? null : i)}
               className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
             >
               <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shrink-0 ${openIndex === i ? 'bg-pink-500 text-[var(--heading-color)] shadow-lg shadow-pink-500/30' : 'bg-white/10 text-[var(--text-muted)]'}`}>
                 <Mail size={20} />
               </div>
               <span className="font-medium text-[var(--heading-color)] text-lg flex-1">{l.label}</span>
             </button>
             <AnimatePresence>
               {openIndex === i && (
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="px-6 pb-6 pt-2"
                 >
                   <div className="bg-[var(--card-bg)] p-4 rounded-2xl border border-white/5">
                     <Heart size={16} className="text-pink-500 fill-pink-500 mb-3" />
                     <p className="text-[var(--text-muted)] leading-relaxed text-sm">{l.desc}</p>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

const ScratchCard = () => {
  const [scratched, setScratched] = useState(false);
  return (
    <div className="mt-8 bg-[var(--card-bg)] border border-[var(--card-border)] p-8 rounded-[2rem] text-center shadow-xl">
      <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-3">A Hidden Surprise</div>
      <h3 className="font-playfair text-3xl text-[var(--heading-color)] mb-8">Scratch the Card</h3>
      
      <div 
        onClick={() => {
          if(!scratched) {
             setScratched(true);
             confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 }, colors: ['#a855f7', '#ec4899'] });
          }
        }}
        className={`w-full aspect-[2/1.2] rounded-2xl relative overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-1000 ${scratched ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-pink-500/30' : 'bg-[var(--bg-alt)] border border-[var(--card-border)] hover:border-pink-500/50'}`}
      >
        {!scratched ? (
           <div className="absolute inset-0 opacity-50 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]" />
        ) : null}
        
        {!scratched ? (
          <div className="relative z-10 flex flex-col items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><Star className="text-[var(--text-muted)]" /></div>
             <span className="text-[var(--text-muted)] font-medium tracking-wide">Scratch to Reveal</span>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-6 w-full h-full flex flex-col items-center justify-center bg-[var(--card-bg)] backdrop-blur-sm">
            <Sparkles className="text-pink-400 mb-3 w-8 h-8" />
            <h4 className="text-[var(--heading-color)] font-playfair text-2xl md:text-3xl mb-3">Free Hug Coupon</h4>
            <p className="text-[10px] uppercase tracking-widest text-pink-200/70 font-medium">Redeemable anytime. Valid forever.</p>
            <Heart className="mt-4 text-pink-500 fill-pink-500 w-4 h-4" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

const Surprise = () => {
  const [opened, setOpened] = useState(false);
  const [promise, setPromise] = useState<string | null>(null);

  const promises = [
    "I promise to always choose you, every single day.",
    "I promise to make you laugh when you're sad.",
    "I promise to always listen to you.",
    "I promise to be your biggest cheerleader."
  ];

  return (
    <section className="py-24 px-6 max-w-md mx-auto text-center relative">
      <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-3">A Little Surprise</div>
      <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-16">Open Your Gift</h2>
      
      {!opened ? (
        <button 
          onClick={() => {
            setOpened(true);
            confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
          }}
          className="w-56 h-56 mx-auto bg-gradient-to-br from-[#1a1a2e] to-[#2a1b38] border border-pink-500/30 rounded-[3rem] shadow-[0_0_50px_rgba(236,72,153,0.15)] flex flex-col items-center justify-center text-[var(--heading-color)] hover:scale-105 active:scale-95 transition-all group"
        >
          <Gift size={64} className="mb-6 text-pink-400 group-hover:text-pink-300 transition-colors drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
          <span className="font-bold tracking-widest text-[10px] uppercase text-pink-200">Tap to Open</span>
        </button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 text-left"
        >
           {/* A Promise to You */}
           <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-purple-500/30 rounded-[2rem] p-8 relative overflow-hidden shadow-xl">
             <Star className="absolute top-6 right-6 text-purple-400/20 w-24 h-24" />
             <h3 className="font-playfair text-2xl text-[var(--heading-color)] mb-4 relative z-10 text-center">A Promise to You</h3>
             <p className="text-sm text-purple-100 leading-relaxed relative z-10 text-center">
               I promise to always be there for you, to celebrate your victories, and to hold your hand through every challenge. My greatest gift is having you in my life.
             </p>
             <Heart className="w-5 h-5 mx-auto mt-6 text-purple-400 fill-purple-400" />
           </div>

           {/* Date Ticket */}
           <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-amber-500/40 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl">
             <div className="absolute -top-10 -right-10 opacity-5"><Ticket size={200} className="rotate-12" /></div>
             <div className="flex items-center gap-2 text-amber-400 mb-6">
               <Star size={16} className="fill-amber-400" />
               <span className="text-[10px] font-bold uppercase tracking-widest">VIP Access</span>
             </div>
             <h3 className="font-playfair text-3xl md:text-4xl text-amber-50 mb-4">Golden Date Ticket</h3>
             <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed max-w-[90%]">Valid for one unforgettable romantic evening, fully planned and paid for by Aryan.</p>
             
             <div className="space-y-6 border-t-2 border-dashed border-amber-500/20 pt-8">
               <div>
                 <div className="text-[10px] uppercase tracking-widest text-amber-500/60 font-bold mb-1">Passenger</div>
                 <div className="text-xl text-[var(--heading-color)] font-playfair tracking-wide">Rita Singh</div>
               </div>
               <div>
                 <div className="text-[10px] uppercase tracking-widest text-amber-500/60 font-bold mb-1">Destination</div>
                 <div className="text-xl text-[var(--heading-color)] font-playfair tracking-wide">Anywhere You Want</div>
               </div>
             </div>
             <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-amber-500/50">
               <Ticket size={24} />
               <span className="text-xs uppercase tracking-widest font-bold">Admit One</span>
               <Heart size={16} className="fill-current" />
             </div>
           </div>

           {/* Promise Jar */}
           <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[2rem] p-8 text-center shadow-xl">
             <div className="text-[10px] font-bold tracking-widest text-pink-400 uppercase mb-3">Pick A Note</div>
             <h3 className="font-playfair text-3xl text-[var(--heading-color)] mb-4">The Promise Jar</h3>
             
             <button 
               onClick={() => {
                 setPromise(promises[Math.floor(Math.random() * promises.length)]);
                 confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 }, colors: ['#ffffff', '#fbcfe8'] });
               }}
               className="w-32 h-44 mx-auto bg-[var(--card-bg)] border-[3px] border-[var(--card-border-strong)] rounded-t-xl rounded-b-[2rem] relative flex items-end justify-center pb-6 mt-10 cursor-pointer hover:bg-white/10 transition-colors group"
             >
               <div className="absolute -top-4 w-40 h-8 bg-white/20 rounded-lg backdrop-blur-md border border-white/30 left-1/2 -translate-x-1/2" />
               <div className="flex flex-wrap gap-2 justify-center px-4 opacity-70 group-hover:opacity-100 transition-opacity">
                 {[1,2,3,4,5,6].map(i => <div key={i} className="w-8 h-5 bg-pink-200/90 rounded border border-pink-300 shadow-sm rotate-[10deg]" />)}
               </div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="bg-[var(--bg-main)]/80 text-[var(--heading-color)] text-xs px-3 py-1 rounded-full font-medium tracking-wide">Tap Jar</span>
               </div>
             </button>
             
             <AnimatePresence>
               {promise && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   key={promise}
                   className="mt-10 bg-white p-6 rounded-2xl relative shadow-2xl"
                 >
                   <Sparkles className="absolute -top-3 -right-3 text-pink-500 bg-white rounded-full p-1 w-8 h-8 shadow-md" />
                   <p className="text-slate-800 font-dancing text-2xl leading-relaxed">"{promise}"</p>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
           
           <ScratchCard />
        </motion.div>
      )}
    </section>
  )
}

const Confession = () => {
  const [sealed, setSealed] = useState(true);
  
  return (
    <section className="py-24 px-6 max-w-md mx-auto text-center">
      <div className="text-[10px] font-bold tracking-widest text-red-400 uppercase mb-3">A Sealed Confession</div>
      <h2 className="font-playfair text-4xl text-[var(--heading-color)] mb-16">Open if you dare</h2>
      {sealed ? (
        <button 
          onClick={() => {
             setSealed(false);
             confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 }, colors: ['#991b1b', '#f43f5e'] });
          }}
          className="w-full aspect-[4/3] bg-gradient-to-br from-red-950 to-red-900 rounded-xl shadow-2xl relative flex items-center justify-center border border-red-500/20 group hover:scale-[1.02] transition-transform"
        >
          {/* Fake Envelope Flaps using borders */}
          <div className="absolute top-0 left-0 right-0 h-0 border-t-[100px] md:border-t-[120px] border-l-[160px] md:border-l-[200px] border-r-[160px] md:border-r-[200px] border-transparent border-t-[#450a0a] z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-0 border-b-[100px] md:border-b-[120px] border-l-[160px] md:border-l-[200px] border-r-[160px] md:border-r-[200px] border-transparent border-b-[#7f1d1d] z-10" />
          
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl z-20 group-hover:scale-110 transition-transform cursor-pointer border-4 border-[#450a0a]">
            <Heart className="text-[var(--heading-color)] fill-white w-8 h-8" />
          </div>
          <span className="absolute bottom-6 z-20 text-[10px] tracking-widest uppercase font-bold text-red-200">Break The Seal</span>
        </button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-[#fcfaf5] p-10 rounded-3xl shadow-[0_20px_50px_rgba(153,27,27,0.3)] relative"
        >
          <Mail className="text-red-300 w-12 h-12 absolute -top-6 -left-6 bg-white rounded-full p-2.5 shadow-xl" />
          <p className="font-dancing text-3xl md:text-4xl text-slate-800 leading-relaxed mb-8 mt-2">"No matter what happens, my heart is always yours."</p>
          <div className="flex justify-end pr-4">
             <p className="font-inter font-bold text-[var(--text-muted)] uppercase tracking-widest text-[10px]">— Aryan</p>
          </div>
        </motion.div>
      )}
    </section>
  )
}

const Celebration = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const diff = endOfDay.getTime() - now.getTime();
      
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 max-w-md mx-auto text-center border-t border-white/5">
      <div className="w-16 h-16 mx-auto bg-pink-500/10 border border-pink-500/20 rounded-full flex items-center justify-center mb-8">
        <Clock className="text-pink-400 w-6 h-6" />
      </div>
      <h2 className="font-playfair text-3xl text-[var(--heading-color)] mb-4">The Celebration Continues</h2>
      <p className="text-pink-400/80 text-[10px] font-bold mb-12 uppercase tracking-widest">Make every second count today</p>
      
      <div className="flex justify-center gap-4 mb-20">
        {[
          { label: 'Hours', val: timeLeft.hours },
          { label: 'Minutes', val: timeLeft.minutes },
          { label: 'Seconds', val: timeLeft.seconds }
        ].map((t, i) => (
          <div key={i} className="bg-[var(--bg-alt)] border border-white/5 p-4 rounded-2xl min-w-[80px] shadow-lg">
            <div className="text-3xl font-playfair text-[var(--heading-color)] mb-2">{t.val}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{t.label}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-[var(--card-bg)] p-8 rounded-3xl border border-white/5">
         <Key className="text-pink-400 mx-auto w-6 h-6 mb-4" />
         <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold mb-6">You found the secret lock</p>
         <div className="text-slate-500 text-sm leading-relaxed">
           Made with endless care, respect, and countless smiles <Heart size={14} className="inline text-pink-500 fill-pink-500 mx-1" />
           <br/><br/>
           <span className="tracking-widest uppercase text-[10px] font-bold text-[var(--text-muted)]">FOR RITA, FROM ARYAN</span>
         </div>
      </div>
    </section>
  )
}


const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      return Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
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


const ThemeToggle = ({ isDark, setIsDark }: { isDark: boolean, setIsDark: (val: boolean) => void }) => (
  <button 
    onClick={() => setIsDark(!isDark)} 
    className="fixed top-6 right-6 z-50 w-12 h-12 bg-[var(--card-bg)] backdrop-blur-md rounded-full flex items-center justify-center text-[var(--heading-color)] border border-[var(--card-border)] shadow-lg hover:scale-105 transition-transform"
  >
    {isDark ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>}
  </button>
);

export default function App() {
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3500);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-main)] transition-colors duration-500 flex flex-col items-center justify-center z-[100]">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <Heart size={64} className="text-pink-500 fill-pink-500 mb-8" />
        </motion.div>
        <h2 className="text-xl text-[var(--text-muted)] font-playfair mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Preparing your surprise...</h2>
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: '100%' }} 
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-inter pb-32 selection:bg-pink-500/30 overflow-x-hidden transition-colors duration-500`}>
      <FloatingHearts />
      <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      <Hero />
      <Letter />
      <VoiceFromHeart />
      <WrittenInStars />
      <Memories />
      <StoryBook />
      <Journey />
      <Quiz />
      <Reasons />
      <OpenWhen />
      <Surprise />
      <Confession />
      <Celebration />
      
      <AutoTourGuide />
      <AudioPlayer />
    </div>
  );
}


