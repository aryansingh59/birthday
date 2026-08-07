const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const longWish = `"Happy Birthday to the most amazing person in the universe! 🌟 Every single day, I count my lucky stars because you are in my life. You bring an incredible amount of light, warmth, and pure joy into my world, and honestly, I don't know what I would do without you. Your smile has this magical way of brightening even the gloomiest of days, and your laughter is absolutely my favorite sound in the whole world. 💖

I want you to know how deeply I cherish every single moment we share. From our quiet, simple times to our craziest adventures, every memory with you is a treasure I hold close to my heart. You have this beautiful soul that makes everyone around you feel special, but I am the luckiest one because I get to call you mine. 

As you celebrate this special day, I wish for all your dreams to come true. May this coming year bring you boundless happiness, endless success, and all the love you truly deserve. I promise to be by your side through every high and low, cheering you on and loving you more with each passing day. You mean everything to me. Have the most incredible birthday ever, my love!"`;

content = content.replace(/"Happy Birthday to the most amazing person! You bring so much light and joy into my life. I cherish every moment we share and look forward to making countless more beautiful memories together. May this year bring you all the love, success, and happiness you truly deserve. You mean the world to me, and I hope this special day is as incredible as you are. Just remember, no matter where life takes us, my heart will always beat for you. Enjoy your day to the fullest!"/, longWish);

fs.writeFileSync('src/App.tsx', content);
