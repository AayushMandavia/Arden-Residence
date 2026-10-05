# Arden Residence

A complete, pixel-perfect, fully-functioning local replica of the luxury residential showcase for **Arden Residence**, featuring cinematic frame sequence scrubbing, interactive 3D floor explorer, 3D terrace model rendering (Three.js/GLTF), lifestyle tours, and interior walkthrough video streaming.

## Features

- **Cinematic Approach Film**: Dual 440-frame high-resolution WebP sequence synchronized to viewport scroll via GSAP ScrollTrigger and Lenis smooth scrolling.
- **Interactive Floor Explorer**: Full architectural floorplates, 3D unit models, level selector, and residential unit breakdowns.
- **3D Interactive Terrace**: Three.js WebGL experience loading `models/repose-terrace.glb` with interactive amenity hotspots.
- **Lifestyle & Amenities Suite**: Full media experience with streaming walkthrough MP4 videos (with HTTP 206 range request support for fluid scrubbing), audio/visual presentations, and high-fidelity photo gallery.
- **Custom Branding**: Fully customized to **Arden Residence** across titles, meta tags, SVG favicon, dialogues, badges, and WhatsApp communication channels.

## Running Locally

The local server is already running on **http://localhost:3000**.

To start or restart the server manually:

```bash
# Using npm
npm start

# Or directly with Node.js
node server.js
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.
