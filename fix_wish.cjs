const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldWish = '<span className="text-xs text-[var(--text-muted)] font-medium pr-2">{formatTime(currentTime)} / {formatTime(duration)}</span>\\n        <p className="text-[10px] text-[var(--text-muted)] absolute -bottom-6 w-full text-center left-0">Happy Birthday to the most amazing person! You bring so much light and joy into my life. I cherish every moment we share and look forward to making countless more beautiful memories together. May this year bring you all the love, success, and happiness you truly deserve. You mean the world to me, and I hope this special day is as incredible as you are. Just remember, no matter where life takes us, my heart will always beat for you. Enjoy your day to the fullest!</p>\\n      </div>';

const newWish = `<span className="text-xs text-[var(--text-muted)] font-medium pr-2">{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
      <div className="mt-8 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl backdrop-blur-md text-left shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500" />
        <Quote className="text-pink-500/20 w-12 h-12 absolute -top-2 -left-2" />
        <p className="text-sm md:text-base text-[var(--text-main)] font-medium leading-relaxed relative z-10 italic">
          "Happy Birthday to the most amazing person! You bring so much light and joy into my life. I cherish every moment we share and look forward to making countless more beautiful memories together. May this year bring you all the love, success, and happiness you truly deserve. You mean the world to me, and I hope this special day is as incredible as you are. Just remember, no matter where life takes us, my heart will always beat for you. Enjoy your day to the fullest!"
        </p>
      </div>`;

content = content.replace(/<span className="text-xs text-\[var\(--text-muted\)\] font-medium pr-2">\{formatTime\(currentTime\)\} \/ \{formatTime\(duration\)\}<\/span>\s*<p[^>]*>.*?<\/p>\s*<\/div>/g, newWish);

fs.writeFileSync('src/App.tsx', content);
