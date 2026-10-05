const fs = require('fs');
const https = require('https');
const path = require('path');

const lifestyleItems = JSON.parse(fs.readFileSync(path.join(__dirname, 'lifestyle_items.json'), 'utf8'));

const urls = new Set();

// 1. Items from lifestyle_items
for (const item of lifestyleItems) {
  if (item.file) urls.add(`/assets/repose-experience/${item.file}`);
  if (item.responsiveFile) urls.add(`/assets/repose-experience/${item.responsiveFile}`);
  if (item.jpegFile) urls.add(`/assets/repose-experience/${item.jpegFile}`);
  if (item.responsiveJpegFile) urls.add(`/assets/repose-experience/${item.responsiveJpegFile}`);
  if (item.avifFile) urls.add(`/assets/repose-experience/${item.avifFile}`);
  if (item.responsiveAvifFile) urls.add(`/assets/repose-experience/${item.responsiveAvifFile}`);
}

// 2. Extra images in repose-experience
const extraExp = [
  'walking-track-01.webp',
  'kids-play-01.webp',
  'open-terrace-01.webp',
  'pool-01.webp',
  'saion-logo.png',
  'tower-original.png',
  'current-last-frame.png',
  'current-reseption.png',
  'reception-original.png'
];
extraExp.forEach(f => urls.add(`/assets/repose-experience/${f}`));

// 3. Terrace plates
const terrace = [
  'plate-sports-court.webp',
  'plate-garden.webp',
  'plate-fitness.webp'
];
terrace.forEach(f => urls.add(`/assets/terrace/${f}`));

// 4. Interiors videos and stills
const interiors = [
  'living-room.mp4', 'living-room-card.webp', 'living-room-still.webp',
  'kitchen.mp4', 'kitchen-card.webp', 'kitchen-still.webp',
  'bedroom.mp4', 'bedroom-card.webp', 'bedroom-still.webp',
  'bathroom.mp4', 'bathroom-card.webp', 'bathroom-still.webp'
];
interiors.forEach(f => urls.add(`/assets/interiors/${f}`));

// 5. Amenity videos
const amenityVids = [
  'gym.mp4', 'gym.webp',
  'steam-room.mp4', 'steam-room.webp',
  'pool.mp4', 'pool.webp'
];
amenityVids.forEach(f => urls.add(`/assets/amenity-videos/${f}`));

// 6. Amenities web
const amenitiesWeb = [
  'kids-play-area.webp',
  'for-every-generation.webp',
  'jacuzzi.webp',
  'adults-outdoor-gym.webp',
  'cricket-simulator.webp'
];
amenitiesWeb.forEach(f => urls.add(`/assets/amenities/web/${f}`));
urls.add('/assets/amenities/map.webp');

// 7. Walkthroughs
const walkthroughs = [
  'one-bedroom-walkthrough.mp4',
  'one-bedroom-walkthrough-poster.webp',
  'two-bedroom-walkthrough.mp4',
  'two-bedroom-walkthrough-poster.webp'
];
walkthroughs.forEach(f => urls.add(`/assets/walkthrough/${f}`));

console.log('Total URLs to check:', urls.size);
fs.writeFileSync(path.join(__dirname, 'lifestyle_urls_to_fetch.json'), JSON.stringify(Array.from(urls).sort(), null, 2));
