
(function () {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Palette config ──────────────────────────────────────────────────
  const THEME_PALETTES = {
    'cute-mode':   ['#ff69b4','#da70d6','#ffb6c1','#c084fc','#fbbf24','#f9a8d4'],
    'classy-mode': ['#d4af37','#b8862e','#64a090','#dcc88c','#9b7ec8','#e8c96a'],
    'dark-mode':   ['#6040ff','#0090ff','#00e4ff','#b040ff','#40ffcc','#8080ff'],
  };
  const CUSTOM_PALETTES = {
    sunset:  ['#ff6446','#ffaa3c','#dc5096','#ffd264','#c83c50'],
    ocean:   ['#00aaf0','#00dcc8','#3c78ff','#00f0ff','#2864c8'],
    forest:  ['#3cc85a','#78f082','#00a06e','#c8f03c','#287846'],
    galaxy:  ['#c83cff','#3c78ff','#ff3cc8','#7828ff','#28dcff'],
    rose:    ['#ff6e82','#ffa0be','#dc5070','#ffbed2','#c83c5a'],
    sunrise: ['#ffb43c','#ff7850','#ffe064','#ffa078','#c8643c'],
  };

  window.BG = {
    speed: 1, orbCount: 5, customPalette: null,
    setSpeed(v)       { window.BG.speed = parseFloat(v); },
    setOrbCount(n)    { window.BG.orbCount = parseInt(n); },
    setPalette(name)  { window.BG.customPalette = CUSTOM_PALETTES[name] || null; },
    clearPalette()    { window.BG.customPalette = null; },
  };

  function getPalette() {
    return window.BG.customPalette || THEME_PALETTES[document.body.className] || THEME_PALETTES['cute-mode'];
  }

  let W, H, cx, cy;
  const FOV = 380;

  // ── 3D projection ───────────────────────────────────────────────────
  function project(x, y, z) {
    const dz = z + FOV;
    if (dz <= 0) return null;
    const d = FOV / dz;
    return { sx: cx + x * d, sy: cy + y * d, d };
  }

  // ── STARFIELD ───────────────────────────────────────────────────────
  function mkStar() {
    return {
      x: (Math.random() - 0.5) * W * 2.5,
      y: (Math.random() - 0.5) * H * 2.5,
      z: Math.random() * 600 + 10,
      speed: 1.4 + Math.random() * 2.2,
    };
  }

  let stars = [];
  function initStars() {
    stars = Array.from({ length: 180 }, mkStar);
  }

  function tickStars() {
    const pal = getPalette();
    stars.forEach(s => {
      s.z -= s.speed * window.BG.speed * 1.4;
      if (s.z <= 2) { Object.assign(s, mkStar()); s.z = 600; }
      const p = project(s.x, s.y, s.z);
      if (!p) return;
      const size = Math.max(0.3, p.d * 2.8);
      const alpha = Math.min(1, p.d * 1.4);
      const col = pal[Math.floor((s.x + s.y + 9999) % pal.length)];
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
      ctx.fillStyle = col + Math.floor(alpha * 255).toString(16).padStart(2,'0');
      ctx.fill();
    });
  }

  // ── 3D WIREFRAME SHAPES ─────────────────────────────────────────────
  function rotX(v, a) { return [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)]; }
  function rotY(v, a) { return [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)]; }
  function rotZ(v, a) { return [v[0]*Math.cos(a)-v[1]*Math.sin(a), v[0]*Math.sin(a)+v[1]*Math.cos(a), v[2]]; }

  const CUBE_V = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  const CUBE_E = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];

  const OCT_V  = [[0,1.4,0],[0,-1.4,0],[1.4,0,0],[-1.4,0,0],[0,0,1.4],[0,0,-1.4]];
  const OCT_E  = [[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[4,3],[3,5],[5,2]];

  const STAR_V = (function(){
    const v=[]; const n=5;
    for(let i=0;i<n;i++){
      const a=i*2*Math.PI/n - Math.PI/2;
      const b=a+Math.PI/n;
      v.push([Math.cos(a)*1.2,Math.sin(a)*1.2,0]);
      v.push([Math.cos(b)*0.5,Math.sin(b)*0.5,0]);
    }
    return v;
  })();
  const STAR_E = (function(){
    const e=[]; const n=STAR_V.length;
    for(let i=0;i<n;i++) e.push([i,(i+1)%n]);
    return e;
  })();

  const SHAPES = [
    { verts:CUBE_V, edges:CUBE_E },
    { verts:OCT_V,  edges:OCT_E  },
    { verts:STAR_V, edges:STAR_E },
  ];

  function mkShape() {
    const def = SHAPES[Math.floor(Math.random()*SHAPES.length)];
    return {
      def,
      x: (Math.random()-0.5)*W*1.2,
      y: (Math.random()-0.5)*H*1.2,
      z: 80 + Math.random()*320,
      scale: 28 + Math.random()*55,
      rx: 0, ry: 0, rz: 0,
      drx: (Math.random()-0.5)*0.012,
      dry: (Math.random()-0.5)*0.016,
      drz: (Math.random()-0.5)*0.008,
      speed: 0.18 + Math.random()*0.28,
      palIdx: Math.floor(Math.random()*6),
    };
  }

  let shapes = [];
  function initShapes() {
    shapes = Array.from({ length: 9 }, mkShape);
  }

  function tickShapes() {
    const pal = getPalette();
    shapes.forEach(sh => {
      sh.z -= sh.speed * window.BG.speed;
      if (sh.z < 10) { Object.assign(sh, mkShape()); sh.z = 380; }
      sh.rx += sh.drx * window.BG.speed;
      sh.ry += sh.dry * window.BG.speed;
      sh.rz += sh.drz * window.BG.speed;

      const col = pal[sh.palIdx % pal.length];
      const depth = FOV / (sh.z + FOV);
      const alpha = Math.min(0.7, depth * 1.6);

      const verts2d = sh.def.verts.map(v => {
        let p = rotX(v, sh.rx);
        p = rotY(p, sh.ry);
        p = rotZ(p, sh.rz);
        p = [p[0]*sh.scale + sh.x, p[1]*sh.scale + sh.y, p[2]*sh.scale + sh.z];
        return project(p[0], p[1], p[2]);
      });

      ctx.save();
      ctx.strokeStyle = col + Math.floor(alpha * 255).toString(16).padStart(2,'0');
      ctx.lineWidth = Math.max(0.5, depth * 2.5);
      ctx.shadowColor = col;
      ctx.shadowBlur = 10 * depth;
      sh.def.edges.forEach(([a, b]) => {
        const pa = verts2d[a], pb = verts2d[b];
        if (!pa || !pb) return;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      });
      ctx.restore();
    });
  }

  // ── FLOATING KAWAII SPRITES ─────────────────────────────────────────
  const SPRITES = ['♥','★','✦','❋','⬡','✿','◈','⟡'];
  function mkSprite() {
    return {
      icon: SPRITES[Math.floor(Math.random()*SPRITES.length)],
      x: (Math.random()-0.5)*W*1.8,
      y: (Math.random()-0.5)*H*1.8,
      z: 60 + Math.random()*400,
      speed: 0.6 + Math.random()*1.2,
      palIdx: Math.floor(Math.random()*6),
    };
  }

  let sprites = [];
  function initSprites() {
    sprites = Array.from({ length: 28 }, mkSprite);
  }

  function tickSprites() {
    const pal = getPalette();
    sprites.forEach(sp => {
      sp.z -= sp.speed * window.BG.speed;
      if (sp.z < 5) { Object.assign(sp, mkSprite()); sp.z = 420; }
      const p = project(sp.x, sp.y, sp.z);
      if (!p || p.sx < -60 || p.sx > W+60 || p.sy < -60 || p.sy > H+60) return;
      const alpha = Math.min(0.85, p.d * 2);
      const sz = Math.max(8, p.d * 44);
      const col = pal[sp.palIdx % pal.length];
      ctx.save();
      ctx.font = `${sz}px serif`;
      ctx.fillStyle = col + Math.floor(alpha * 255).toString(16).padStart(2,'0');
      ctx.shadowColor = col;
      ctx.shadowBlur = sz * 0.8;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sp.icon, p.sx, p.sy);
      ctx.restore();
    });
  }

  // ── BIG SOFT GLOWING ORBS ───────────────────────────────────────────
  let orbs = [];
  function initOrbs() {
    const pal = getPalette();
    const n = 4 + window.BG.orbCount;
    orbs = Array.from({ length: n }, (_, i) => ({
      x: W * (0.1 + (i/(n-1||1))*0.8),
      y: H * (0.15 + Math.random()*0.7),
      r: Math.min(W,H) * (0.22 + Math.random()*0.2),
      col: pal[i % pal.length],
      phase: Math.random()*Math.PI*2,
      spd: 0.003 + Math.random()*0.003,
      ampX: W*0.1, ampY: H*0.08,
      baseX: 0, baseY: 0,
    }));
    orbs.forEach(o => { o.baseX = o.x; o.baseY = o.y; });
  }

  function tickOrbs(t) {
    const pal = getPalette();
    orbs.forEach((o, i) => {
      o.col = pal[i % pal.length];
      o.phase += o.spd * window.BG.speed;
      o.x = o.baseX + Math.sin(o.phase*1.3+i)*o.ampX;
      o.y = o.baseY + Math.cos(o.phase+i*0.7)*o.ampY;
      const pulse = 0.82 + 0.18*Math.sin(o.phase*2.2+i);
      const rad = o.r * pulse;
      const g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,rad);
      g.addColorStop(0,   hexAlpha(o.col, 0.55));
      g.addColorStop(0.5, hexAlpha(o.col, 0.16));
      g.addColorStop(1,   hexAlpha(o.col, 0));
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.beginPath();
      ctx.arc(o.x,o.y,rad,0,Math.PI*2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    });
  }

  function hexAlpha(hex, a) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  // ── RESIZE & INIT ───────────────────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cx = W/2; cy = H/2;
    initStars();
    initShapes();
    initSprites();
    initOrbs();
  }

  // ── MAIN LOOP ───────────────────────────────────────────────────────
  let t = 0;
  function draw() {
    ctx.clearRect(0,0,W,H);
    t += 0.016;

    tickOrbs(t);    // soft glowing color blobs behind everything
    tickStars();    // flying star particles with depth
    tickShapes();   // 3D wireframe rotating shapes
    tickSprites();  // floating kawaii icons in 3D

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
