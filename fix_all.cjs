const fs = require('fs');

// 1. Restore App.tsx
const map = JSON.parse(fs.readFileSync('sourcemap.json', 'utf8'));
let content = map.sourcesContent[0];

// 2. Replace the old AudioPlayer URL with the requested one
// Let's just do a simple string replace for the URL and logic
content = content.replace(
  /https:\/\/archive.org\/download\/canon-in-d-piano\/canon-in-d-piano.mp3/,
  'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3'
);
content = content.replace(
  /window.addEventListener\('click', playAudio, \{ once: true \}\);/g,
  'window.addEventListener("click", playAudio);'
);
content = content.replace(
  /window.addEventListener\('touchstart', playAudio, \{ once: true \}\);/g,
  'window.addEventListener("touchstart", playAudio);'
);
content = content.replace(
  /window.addEventListener\('scroll', playAudio, \{ once: true \}\);/g,
  'window.addEventListener("scroll", playAudio);'
);

// 3. Replace VoiceFromHeart URL
content = content.replace(
  /https:\/\/upload.wikimedia.org\/wikipedia\/commons\/1\/1f\/I_Love_You.ogg/,
  'https://cdn.openai.com/api/audio/alloy.wav'
);
content = content.replace(
  /<span className="text-xs text-\[var\(--text-muted\)\] font-medium pr-2">\{formatTime\(currentTime\)\} \/ \{formatTime\(duration\)\}<\/span>/,
  '<span className="text-xs text-[var(--text-muted)] font-medium pr-2">{formatTime(currentTime)} / {formatTime(duration)}</span>\\n        <p className="text-[10px] text-[var(--text-muted)] absolute -bottom-6 w-full text-center left-0">(OpenAI voice placeholder)</p>'
);

// Write it back
fs.writeFileSync('src/App.tsx', content);
