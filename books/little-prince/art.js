/* Fallback illustrations: hand-composed SVG in a naive ink-and-watercolor manner.
   Shared primitives are composed per chapter. Used whenever images/chapter-NN.* is missing. */
window.LP_ART = (function () {
  const INK = '#3b3a4a';
  const W = 800, H = 600;

  // deterministic pseudo-random so the same chapter always draws the same picture
  function rng(seed) { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  const defs = `
  <defs>
    <filter id="wash" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2.2"/></filter>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="0.8"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0.35 0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0.09 0"/></filter>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3a75"/><stop offset="1" stop-color="#7b8bc7"/></linearGradient>
    <linearGradient id="day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd8ee"/><stop offset="1" stop-color="#eef3f0"/></linearGradient>
    <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d5a9e"/><stop offset=".55" stop-color="#e9a26b"/><stop offset="1" stop-color="#f6d98a"/></linearGradient>
    <linearGradient id="sandg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1d79c"/><stop offset="1" stop-color="#dcb56f"/></linearGradient>
  </defs>`;

  const wrap = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">${defs}
    <rect width="${W}" height="${H}" fill="#f7efdd"/>${body}<rect width="${W}" height="${H}" filter="url(#grain)" opacity=".9" pointer-events="none"/></svg>`;

  const ink = (extra = '') => `fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}`;

  function sky(kind, h = H) {
    const fill = { night: 'url(#night)', day: 'url(#day)', sunset: 'url(#sunset)' }[kind] || 'none';
    return `<rect x="0" y="0" width="${W}" height="${h}" fill="${fill}" opacity=".85"/>`;
  }
  function stars(n, seed, ymax = 320) {
    const r = rng(seed); let s = '';
    for (let i = 0; i < n; i++) {
      const x = r() * W, y = r() * ymax, k = 2 + r() * 4;
      s += `<path d="M${x} ${y - k} L${x + k * .3} ${y - k * .3} L${x + k} ${y} L${x + k * .3} ${y + k * .3} L${x} ${y + k} L${x - k * .3} ${y + k * .3} L${x - k} ${y} L${x - k * .3} ${y - k * .3}Z" fill="#fff3b0" opacity=".9"/>`;
    }
    return s;
  }
  function sun(cx, cy, r, color = '#f6c453') {
    return `<circle cx="${cx}" cy="${cy}" r="${r + 10}" fill="${color}" opacity=".35" filter="url(#wash)"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`;
  }
  function desert(y = 380, seed = 1) {
    return `<path d="M0 ${y + 40} C 150 ${y - 10}, 300 ${y + 60}, 450 ${y + 10} S 700 ${y - 20}, ${W} ${y + 30} L${W} ${H} L0 ${H}Z" fill="url(#sandg)"/>
      <path d="M0 ${y + 40} C 150 ${y - 10}, 300 ${y + 60}, 450 ${y + 10} S 700 ${y - 20}, ${W} ${y + 30}" ${ink()}/>
      <path d="M120 ${y + 120} C 220 ${y + 90}, 330 ${y + 130}, 460 ${y + 110}" ${ink('opacity=".45"')}/>
      <path d="M380 ${y + 170} C 480 ${y + 140}, 600 ${y + 190}, 760 ${y + 160}" ${ink('opacity=".35"')}/>`;
  }
  function planet(cx, cy, r, opt = {}) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r + 8}" fill="#c9b6d6" opacity=".35" filter="url(#wash)"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#e8dcc2"/><circle cx="${cx}" cy="${cy}" r="${r}" ${ink()}/>
      <path d="M${cx - r * .6} ${cy + r * .3} q ${r * .3} ${r * .25} ${r * .7} ${r * .05}" ${ink('opacity=".4"')}/>`;
    if (opt.volcanoes) {
      const v = (x, y, sc, smoke) => `<path d="M${x - 18 * sc} ${y} L${x - 7 * sc} ${y - 22 * sc} L${x + 7 * sc} ${y - 22 * sc} L${x + 18 * sc} ${y}Z" fill="#b48a6b" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>` +
        (smoke ? `<path d="M${x} ${y - 26 * sc} c -6 -10, 6 -14, 2 -26 c 8 -6, 4 -14, 0 -20" ${ink('opacity=".6"')}/>` : '');
      s += v(cx - r * .45, cy - r * .55, .9, true) + v(cx + r * .2, cy - r * .85, 1, true) + v(cx + r * .7, cy - r * .4, .6, false);
    }
    return s;
  }
  // The little prince: golden hair, green coat, long yellow scarf. pose: stand|sit|walk|look
  function prince(x, y, s = 1, pose = 'stand', opt = {}) {
    const flip = opt.flip ? -1 : 1;
    const hair = `<path d="M-16 -70 l-8 -14 l14 4 l2 -16 l10 10 l6 -14 l6 14 l10 -10 l2 16 l14 -4 l-8 14 Z" fill="#f2d16b" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`;
    const head = `<circle cx="0" cy="-58" r="14" fill="#fbe9cf" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="-5" cy="-60" r="1.4" fill="${INK}"/><circle cx="5" cy="-60" r="1.4" fill="${INK}"/>
      <path d="M-3 -52 q3 2 6 0" ${ink('stroke-width="1.2"')}/>`;
    const scarf = `<path d="M-10 -44 q 10 4 20 0 q 20 -6 44 -22" fill="none" stroke="#f2d16b" stroke-width="7" stroke-linecap="round"/>
      <path d="M-10 -44 q 10 4 20 0 q 20 -6 44 -22" ${ink('stroke-width="1.2" opacity=".6"')}/>`;
    let body;
    if (pose === 'sit') {
      body = `<path d="M-16 -44 L16 -44 L20 -2 L-20 -2 Z" fill="#7aa66c" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M-18 -4 L-34 4 M18 -4 L34 4" ${ink('stroke-width="2.4"')}/>
        <path d="M-15 -34 l-14 18 M15 -34 l14 18" ${ink('stroke-width="2.2"')}/>`;
    } else if (pose === 'walk') {
      body = `<path d="M-14 -44 L14 -44 L22 8 L-22 8 Z" fill="#7aa66c" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M-10 8 l-8 30 M10 8 l12 28" ${ink('stroke-width="2.4"')}/>
        <path d="M-14 -36 l-16 14 M14 -36 l18 10" ${ink('stroke-width="2.2"')}/>`;
    } else {
      body = `<path d="M-14 -44 L14 -44 L20 10 L-20 10 Z" fill="#7aa66c" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M-9 10 l0 28 M9 10 l0 28" ${ink('stroke-width="2.4"')}/>
        <path d="M-14 -36 l-12 22 M14 -36 l12 22" ${ink('stroke-width="2.2"')}/>`;
    }
    return `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})">${body}${scarf}${head}${hair}</g>`;
  }
  function rose(x, y, s = 1, opt = {}) {
    const stem = `<path d="M0 0 C -6 -30, 6 -50, 0 -80" ${ink('stroke-width="2"')} stroke="#5f8a4f"/>
      <path d="M0 -30 l-14 -6 M0 -50 l14 -8 M-2 -20 l10 -3" stroke="#5f8a4f" stroke-width="1.6" fill="none"/>
      <path d="M-1 -42 l-6 -3 M1 -60 l6 -3 M-1 -70 l-5 -2" stroke="${INK}" stroke-width="1.4"/>`;
    const bloom = `<g transform="translate(0 -88)"><ellipse cx="0" cy="4" rx="16" ry="12" fill="#e0574b" opacity=".9" filter="url(#soft)"/>
      <path d="M-14 4 c -2 -14, 8 -18, 12 -8 c 4 -12, 16 -8, 14 6 c 4 8, -6 16, -13 10 c -8 6, -18 0, -13 -8Z" fill="#c8453b" stroke="${INK}" stroke-width="1.3"/>
      <path d="M-4 0 q 6 -6 10 2 q -6 4 -10 -2Z" fill="#f28c7d"/></g>`;
    const globe = opt.globe ? `<path d="M-34 4 L34 4 L34 -110 A34 34 0 0 0 -34 -110 Z" fill="#dbeeff" opacity=".45"/>
      <path d="M-34 4 L34 4 L34 -110 A34 34 0 0 0 -34 -110 Z" ${ink('stroke-width="1.5"')}/>
      <line x1="-40" y1="4" x2="40" y2="4" ${ink()}/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${s})">${stem}${bloom}${globe}</g>`;
  }
  function baobab(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-14 0 C -18 -60, -30 -110, -18 -160 L 18 -160 C 30 -110, 18 -60, 14 0 Z" fill="#a67c58" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M-18 -160 c -30 -10, -60 -40, -70 -70 M-10 -160 c -10 -30, -30 -50, -20 -90 M10 -160 c 10 -30, 30 -50, 20 -90 M18 -160 c 30 -10, 60 -40, 70 -70 M0 -160 c 0 -30, 4 -60, 0 -100" ${ink('stroke-width="3"')}/>
      <path d="M-8 -30 c 0 -40, 6 -70, 2 -110" ${ink('opacity=".4"')}/>
      <ellipse cx="-70" cy="-235" rx="26" ry="14" fill="#8fae6b" opacity=".85"/><ellipse cx="70" cy="-235" rx="26" ry="14" fill="#8fae6b" opacity=".85"/>
      <ellipse cx="-30" cy="-255" rx="24" ry="13" fill="#8fae6b" opacity=".85"/><ellipse cx="30" cy="-255" rx="24" ry="13" fill="#8fae6b" opacity=".85"/><ellipse cx="0" cy="-265" rx="22" ry="12" fill="#a4c07f" opacity=".9"/>
    </g>`;
  }
  function fox(x, y, s = 1, flip = false) {
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
      <path d="M-50 0 C -60 -30, -30 -50, 0 -44 C 20 -44, 30 -30, 32 -12 L 40 -6 L 30 4 L -46 4 Z" fill="#e09a5a" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M-50 -6 c -30 -6, -50 20, -70 12 c 8 -18, 30 -30, 54 -30" fill="#e09a5a" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M-104 6 c -10 -6, -14 -14, -16 -20 c 10 2, 18 6, 22 12" fill="#fff" stroke="${INK}" stroke-width="1.4"/>
      <path d="M8 -44 l 6 -24 l 14 22 M28 -40 l 12 -20 l 6 24" fill="#e09a5a" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M22 -34 c 16 -6, 30 4, 40 8 c -6 10, -18 16, -30 12 Z" fill="#fff" opacity=".9"/>
      <circle cx="30" cy="-32" r="2" fill="${INK}"/><circle cx="60" cy="-20" r="2.6" fill="${INK}"/>
      <path d="M-30 4 l -4 20 M-10 4 l 0 20 M14 4 l 0 20 M28 2 l 6 20" ${ink('stroke-width="2.4"')}/>
    </g>`;
  }
  function snake(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-120 0 C -90 -30, -60 -30, -30 0 S 30 30, 60 0 S 100 -34, 120 -24 c 8 -4, 16 -2, 20 4 c -4 8, -12 10, -20 6" fill="none" stroke="#c9a54c" stroke-width="10" stroke-linecap="round"/>
      <path d="M-120 0 C -90 -30, -60 -30, -30 0 S 30 30, 60 0 S 100 -34, 120 -24 c 8 -4, 16 -2, 20 4 c -4 8, -12 10, -20 6" ${ink('stroke-width="1.6"')}/>
      <circle cx="132" cy="-22" r="1.6" fill="${INK}"/><path d="M142 -18 l 10 2 l -8 3" ${ink('stroke-width="1.2"')}/>
    </g>`;
  }
  function plane(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-90 0 L 60 -10 L 80 -4 L 60 8 L -90 12 Z" fill="#d9c7a6" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M-20 -6 L -40 -60 L 10 -60 L 18 -6 Z" fill="#e6d3b0" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M-30 -60 L -50 -74 L 20 -74 L 26 -60" ${ink()}/>
      <path d="M-90 0 L -110 -30 L -80 -28 L -70 0" fill="#d9c7a6" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M80 -4 l 18 -30 M80 -4 l 18 24" ${ink('stroke-width="3"')}/>
      <path d="M-14 12 l 0 20 M 20 12 l 0 20 M -22 32 l 16 0 M 12 32 l 16 0" ${ink('stroke-width="2.4"')}/>
      <circle cx="-14" cy="32" r="6" fill="${INK}"/><circle cx="20" cy="32" r="6" fill="${INK}"/>
      <path d="M-40 -6 l 60 0" ${ink('opacity=".5"')}/>
    </g>`;
  }
  // grown-up figure: opt.hat = crown|top|cap|none, opt.coat color, opt.prop = string of extra svg (in local coords)
  function grownup(x, y, s = 1, opt = {}) {
    const coat = opt.coat || '#9b6b8f';
    const hats = {
      crown: `<path d="M-16 -74 l 0 -18 l 8 8 l 8 -14 l 8 14 l 8 -8 l 0 18 Z" fill="#f2d16b" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`,
      top: `<rect x="-14" y="-104" width="28" height="30" fill="#4a4358" stroke="${INK}" stroke-width="1.5"/><rect x="-22" y="-78" width="44" height="6" fill="#4a4358" stroke="${INK}" stroke-width="1.5"/>`,
      cap: `<path d="M-16 -74 q 16 -18 32 0 Z" fill="#5b6e9e" stroke="${INK}" stroke-width="1.5"/><path d="M-20 -74 l 40 0" ${ink()}/>`,
      none: ''
    };
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-22 -50 L22 -50 L34 30 L-34 30 Z" fill="${coat}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="0" cy="-62" r="15" fill="#fbe9cf" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="-5" cy="-64" r="1.4" fill="${INK}"/><circle cx="5" cy="-64" r="1.4" fill="${INK}"/>
      ${opt.mustache ? `<path d="M-8 -56 q 8 -6 16 0" ${ink('stroke-width="2"')}/>` : `<path d="M-3 -55 q 3 2 6 0" ${ink('stroke-width="1.2"')}/>`}
      ${hats[opt.hat || 'none']}
      <path d="M-12 30 l 0 26 M 12 30 l 0 26" ${ink('stroke-width="2.6"')}/>
      ${opt.prop || ''}
    </g>`;
  }
  function tinyPlanetScene(cx, cy, r, figure) {
    return sky('night') + stars(40, cx + r) + planet(cx, cy, r) + figure;
  }
  function lamppost(x, y, s = 1, lit = true) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 l 0 -120" ${ink('stroke-width="3"')}/><path d="M-14 0 l 28 0" ${ink('stroke-width="3"')}/>
      <path d="M-12 -120 l 24 0 l -4 -30 l -16 0 Z" fill="${lit ? '#fff0a8' : '#cfc8b8'}" stroke="${INK}" stroke-width="1.6"/>
      <path d="M-8 -150 l 16 0 l -8 -8 Z" fill="${INK}"/>
      ${lit ? `<circle cx="0" cy="-134" r="30" fill="#ffe27a" opacity=".35" filter="url(#wash)"/>` : ''}
    </g>`;
  }
  function well(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="0" rx="60" ry="16" fill="#cbbfa8" stroke="${INK}" stroke-width="1.8"/>
      <path d="M-60 0 l 0 30 A 60 16 0 0 0 60 30 l 0 -30" fill="#bfae90" stroke="${INK}" stroke-width="1.8"/>
      <ellipse cx="0" cy="0" rx="42" ry="10" fill="#7f8fb8" opacity=".8"/>
      <path d="M-48 20 l 0 -120 M48 20 l 0 -120 M-52 -100 l 104 0" ${ink('stroke-width="3"')}/>
      <circle cx="0" cy="-100" r="16" fill="#e0c88e" stroke="${INK}" stroke-width="1.8"/><circle cx="0" cy="-100" r="4" fill="${INK}"/>
      <path d="M0 -84 l 0 60" ${ink('stroke-width="1.4" stroke-dasharray="3 3"')}/>
      <path d="M-10 -24 l 20 0 l -3 18 l -14 0 Z" fill="#8d8a80" stroke="${INK}" stroke-width="1.4"/>
    </g>`;
  }
  function mountains() {
    return `<path d="M0 420 L 120 220 L 200 300 L 320 120 L 440 300 L 520 200 L 640 330 L 720 250 L 800 380 L 800 600 L 0 600 Z" fill="#9a9db3" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M320 120 L 300 160 L 340 150 L 360 190" ${ink('opacity=".5"')}/><path d="M120 220 L 110 250 L 150 260" ${ink('opacity=".5"')}/>
      <path d="M520 200 L 500 240 L 540 250" ${ink('opacity=".5"')}/>`;
  }
  function chair(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-20 0 l 0 -50 l 40 0 M-20 -22 l 40 0 M-20 0 l 0 14 M20 -22 l 0 36" ${ink('stroke-width="2.6"')}/></g>`;
  }
  function birdsAndPrince(x, y) {
    const r = rng(9); let s = '';
    for (let i = 0; i < 9; i++) {
      const bx = x - 60 + r() * 220, by = y - 220 - r() * 120;
      s += `<path d="M${bx} ${by} q 8 -12 16 0 M${bx + 16} ${by} q 8 -12 16 0" ${ink('stroke-width="1.6"')}/>`;
      s += `<path d="M${bx + 16} ${by} L ${x + 4} ${y - 40}" ${ink('stroke-width=".8" opacity=".45"')}/>`;
    }
    return s;
  }
  function earth(cx, cy, r) {
    return `<circle cx="${cx}" cy="${cy}" r="${r + 12}" fill="#9fc3e6" opacity=".35" filter="url(#wash)"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#a9cbe4" stroke="${INK}" stroke-width="1.8"/>
      <path d="M${cx - 90} ${cy - 40} c 20 -40, 70 -50, 100 -20 c 30 10, 10 50, -20 60 c -30 10, -60 -10, -80 -40Z" fill="#9db98a" stroke="${INK}" stroke-width="1.4"/>
      <path d="M${cx + 30} ${cy + 20} c 30 -20, 70 0, 60 40 c -20 30, -60 20, -60 -40Z" fill="#9db98a" stroke="${INK}" stroke-width="1.4"/>
      <path d="M${cx - 30} ${cy + 60} c 10 -10, 40 -10, 50 10 c -10 20, -40 20, -50 -10Z" fill="#9db98a" stroke="${INK}" stroke-width="1.4"/>`;
  }
  function train(x, y) {
    let cars = '';
    for (let i = 0; i < 3; i++) {
      const cx = x + 150 + i * 130;
      cars += `<rect x="${cx}" y="${y - 70}" width="120" height="60" fill="#8a6f5a" stroke="${INK}" stroke-width="1.8"/>`;
      for (let w = 0; w < 4; w++) cars += `<rect x="${cx + 10 + w * 28}" y="${y - 58}" width="18" height="18" fill="#fff3c4" stroke="${INK}" stroke-width="1.2"/>`;
      cars += `<circle cx="${cx + 25}" cy="${y}" r="10" fill="${INK}"/><circle cx="${cx + 95}" cy="${y}" r="10" fill="${INK}"/>`;
    }
    return `<g>
      <rect x="${x}" y="${y - 80}" width="140" height="70" fill="#4d5f8a" stroke="${INK}" stroke-width="1.8"/>
      <rect x="${x + 20}" y="${y - 120}" width="30" height="40" fill="#4d5f8a" stroke="${INK}" stroke-width="1.8"/>
      <path d="M${x + 35} ${y - 122} c -10 -20, 10 -30, 0 -50 c 14 -10, 10 -24, 6 -34" ${ink('opacity=".55" stroke-width="2.4"')}/>
      <circle cx="${x + 30}" cy="${y}" r="14" fill="${INK}"/><circle cx="${x + 110}" cy="${y}" r="14" fill="${INK}"/>
      ${cars}
      <line x1="0" y1="${y + 12}" x2="${W}" y2="${y + 12}" ${ink('stroke-width="3"')}/>
      <line x1="0" y1="${y + 22}" x2="${W}" y2="${y + 22}" ${ink('stroke-width="3"')}/>
    </g>`;
  }
  function desertFlower(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 C -4 -30, 4 -50, 0 -80" stroke="#6e8a5a" stroke-width="2" fill="none"/>
      <path d="M0 -80 c -20 -8, -22 -30, -4 -30 c 2 -18, 18 -18, 14 0 c 20 -6, 24 20, 0 26 Z" fill="#f2c9d6" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
      <circle cx="2" cy="-92" r="4" fill="#f2d16b"/>
    </g>`;
  }
  function wall(x, y) {
    let s = `<rect x="${x}" y="${y - 160}" width="${W - x}" height="200" fill="#c9b79a" stroke="${INK}" stroke-width="1.8"/>`;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) {
      s += `<rect x="${x + c * 70 + (r % 2 ? 35 : 0)}" y="${y - 160 + r * 33}" width="70" height="33" ${ink('opacity=".25" stroke-width="1.2"')}/>`;
    }
    return s;
  }

  // ---------- chapter compositions ----------
  const chapters = {
    1: () => `${sky('day', 380)}<rect x="0" y="380" width="${W}" height="220" fill="#eee4cc"/>
      <g transform="translate(400 330)">
        <path d="M-230 0 C -200 -20, -160 -120, -40 -130 C 100 -140, 160 -60, 200 -20 C 220 -8, 240 0, 250 0 Z" fill="#b3893f" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M-230 0 L 250 0" ${ink('stroke-width="2.2"')}/>
        <g opacity=".55"><path d="M-40 -60 c 0 -40, 60 -60, 90 -40 c 40 4, 60 30, 40 40 l 0 40 l -30 0 l 0 -30 l -60 0 l 0 30 l -30 0 Z" fill="#8b7ba8" stroke="${INK}" stroke-width="1.4"/><path d="M90 -60 c 30 0, 40 20, 24 40" ${ink()}/></g>
      </g>
      <text x="400" y="430" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="22" fill="${INK}">Drawing Number One</text>`,
    2: () => `${sky('day', 380)}${desert(380, 2)}${plane(560, 400, 1.1)}${prince(220, 470, 1.1, 'stand')}
      <path d="M270 400 q 30 -30 60 -10" ${ink('opacity=".35"')}/>`,
    3: () => `${sky('day', 380)}${desert(380, 3)}${plane(300, 380, .9)}${prince(560, 480, 1.1, 'stand', { flip: true })}
      <path d="M470 330 q 40 -60 100 -30" ${ink('opacity=".5" stroke-dasharray="4 4"')}/>`,
    4: () => sky('night') + stars(40, 4) + planet(400, 400, 140, { volcanoes: true }) + prince(400, 262, 1.05, 'stand') + rose(490, 300, .7) +
      `<text x="400" y="565" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="20" fill="${INK}">Asteroid B-612</text>`,
    5: () => sky('night') + stars(30, 5) + planet(400, 520, 150) + baobab(300, 430, .9) + baobab(500, 415, 1) + baobab(400, 445, .55) + prince(230, 470, .6, 'stand'),
    6: () => sky('sunset') + sun(400, 330, 46, '#f39a5b') + planet(400, 560, 220) + chair(400, 350, 1) + prince(392, 350, .95, 'sit') +
      `<path d="M240 330 q 160 -20 320 0" ${ink('opacity=".2"')}/>`,
    7: () => `${sky('day', 380)}${desert(380, 7)}${plane(640, 430, .8)}${prince(300, 470, 1.1, 'stand')}
      <g transform="translate(470 470)"><path d="M0 0 c -4 -30, 4 -50, 0 -80" stroke="#5f8a4f" stroke-width="2" fill="none"/><path d="M-2 -20 l -8 -5 M2 -40 l 8 -5 M-1 -60 l -7 -4" ${ink()}/><circle cx="0" cy="-86" r="9" fill="#c8453b" stroke="${INK}" stroke-width="1.4"/></g>
      <path d="M340 380 l 12 -14 M362 372 l 6 -16 M384 374 l -2 -16" ${ink('opacity=".5"')}/>`,
    8: () => sky('night') + stars(30, 8) + planet(400, 520, 170) + rose(400, 400, 1.3, { globe: true }) + prince(560, 420, .85, 'stand', { flip: true }),
    9: () => sky('day') + `<circle cx="150" cy="120" r="34" fill="#f6c453"/>` + planet(400, 600, 150) + prince(400, 470, 1, 'stand') + birdsAndPrince(400, 470) +
      `<path d="M330 490 l -8 -8 M290 480 l 20 -4" ${ink('opacity=".4"')}/>` + `<g transform="translate(470 470)">${rose(0, 0, .8, { globe: true }).replace('translate(0 0)', 'translate(0 0)')}</g>`,
    10: () => tinyPlanetScene(400, 520, 200, '') + `<path d="M280 380 l 0 -120 l 240 0 l 0 120 Z" fill="#b53b3b" opacity=".85" stroke="${INK}" stroke-width="1.8"/>
      <path d="M280 260 q 120 -40 240 0" fill="#b53b3b" stroke="${INK}" stroke-width="1.8"/>
      <path d="M296 280 l 208 0 M296 300 l 208 0" stroke="#fff" stroke-width="10" opacity=".85"/><path d="M300 280 l 6 4 M340 280 l 6 4 M380 280 l 6 4 M420 280 l 6 4 M460 280 l 6 4" ${ink()}/>` +
      grownup(400, 340, 1.2, { hat: 'crown', coat: '#6e2a8a', mustache: true }) + prince(560, 400, .7, 'stand', { flip: true }),
    11: () => tinyPlanetScene(400, 560, 200, '') + grownup(400, 360, 1.25, { hat: 'top', coat: '#5a7f8f', prop: `<path d="M-40 -30 l -30 -30 M40 -30 l 30 -30" ${ink('stroke-width="2.4"')}/>` }) + prince(230, 400, .75, 'stand') +
      `<path d="M262 330 q 20 -12 40 0 M256 320 q 26 -20 52 0" ${ink('opacity=".4"')}/>`,
    12: () => tinyPlanetScene(400, 560, 200, '') + `<rect x="300" y="380" width="200" height="16" fill="#8b6b4a" stroke="${INK}" stroke-width="1.6"/>` +
      [0, 1, 2, 3, 4].map(i => `<rect x="${310 + i * 38}" y="${335 + (i % 2) * 8}" width="18" height="45" rx="4" fill="${i % 2 ? '#6c8f6c' : '#8a5c3b'}" stroke="${INK}" stroke-width="1.4"/>`).join('') +
      grownup(560, 400, 1.1, { hat: 'none', coat: '#7c5c4b', mustache: true, prop: `<path d="M-30 -20 l -20 -26 l -8 -16" ${ink('stroke-width="2.4"')}/>` }) + prince(240, 410, .8, 'stand'),
    13: () => tinyPlanetScene(400, 580, 220, '') + stars(50, 13, 260) + `<rect x="270" y="340" width="260" height="14" fill="#8b6b4a" stroke="${INK}" stroke-width="1.6"/><path d="M290 354 l 0 60 M510 354 l 0 60" ${ink('stroke-width="3"')}/>` +
      `<g transform="translate(300 320)">${[0, 1, 2, 3].map(i => `<rect x="${i * 44}" y="0" width="34" height="20" fill="#fff8e4" stroke="${INK}" stroke-width="1.2"/><text x="${i * 44 + 17}" y="15" font-size="11" text-anchor="middle" font-family="monospace" fill="${INK}">${[501, 622, 731, '...'][i]}</text>`).join('')}</g>` +
      grownup(430, 330, 1.1, { hat: 'none', coat: '#3f4a6e', prop: `<circle cx="-10" cy="-64" r="6" ${ink('stroke-width="1.2"')}/><circle cx="8" cy="-64" r="6" ${ink('stroke-width="1.2"')}/>` }) + prince(210, 400, .8, 'stand'),
    14: () => sky('night') + stars(40, 14) + planet(400, 520, 120) + lamppost(430, 430, 1, true) + grownup(360, 380, .95, { hat: 'cap', coat: '#5b6e9e', prop: `<path d="M20 -30 l 30 -50" ${ink('stroke-width="2.4"')}/>` }) + prince(590, 470, .7, 'stand', { flip: true }),
    15: () => tinyPlanetScene(400, 600, 260, '') + `<rect x="250" y="360" width="300" height="16" fill="#8b6b4a" stroke="${INK}" stroke-width="1.6"/><path d="M270 376 l 0 60 M530 376 l 0 60" ${ink('stroke-width="3"')}/>` +
      `<path d="M300 358 l 0 -30 l 90 -10 l 90 10 l 0 30 Z" fill="#fff8e4" stroke="${INK}" stroke-width="1.5"/><path d="M390 318 l 0 40" ${ink()}/><path d="M310 340 l 60 -6 M310 350 l 60 -6 M410 334 l 60 6 M410 344 l 60 6" ${ink('opacity=".5"')}/>` +
      grownup(400, 340, 1.1, { hat: 'none', coat: '#6b4f3f', mustache: true, prop: `<path d="M-18 -60 l 36 0" ${ink('stroke-width="1"')}/><circle cx="-14" cy="-70" r="2" fill="none" stroke="${INK}"/>` }) + prince(210, 420, .8, 'stand'),
    16: () => sky('night') + stars(70, 16, 600) + earth(400, 320, 190) + `<text x="400" y="560" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="20" fill="#fff3c4">The Earth</text>`,
    17: () => sky('night') + stars(50, 17) + `<circle cx="640" cy="110" r="42" fill="#fff3c4" opacity=".95"/><circle cx="626" cy="100" r="36" fill="#2c3a72" opacity=".9"/>` + desert(380, 17) + snake(430, 470, 1.1) + prince(200, 470, 1.05, 'stand'),
    18: () => sky('day', 380) + desert(380, 18) + desertFlower(520, 470, 1.4) + prince(300, 480, 1.05, 'stand'),
    19: () => sky('day') + mountains() + prince(560, 390, .55, 'stand', { flip: true }) + `<path d="M330 150 q -60 -40 -120 -10" ${ink('opacity=".3"')}/>` +
      `<text x="180" y="120" font-family="Georgia, serif" font-style="italic" font-size="18" fill="${INK}" opacity=".7">who are you… who are you… who are you…</text>`,
    20: () => sky('day', 380) + `<rect x="0" y="380" width="${W}" height="220" fill="#d9e3c1"/>` + `<path d="M40 380 l 0 -160 l 720 0 l 0 160" fill="#cdbca0" stroke="${INK}" stroke-width="1.6"/>` +
      (function () { const r = rng(20); let s = ''; for (let i = 0; i < 26; i++) { s += rose(70 + (i % 13) * 56 + r() * 10, 400 + Math.floor(i / 13) * 70 + r() * 20, .55 + r() * .25); } return s; })() +
      prince(400, 560, 1, 'stand') + `<path d="M380 460 q 20 -20 40 0" ${ink('opacity=".0"')}/>`,
    21: () => sky('day', 380) + `<rect x="0" y="380" width="${W}" height="220" fill="#e3d9b3"/>` + `<path d="M0 420 c 100 -30, 200 20, 300 0 s 200 -30, 500 0" ${ink('opacity=".3"')}/>` +
      `<g opacity=".9">${[0, 1, 2, 3].map(i => `<path d="M${640 + i * 30} 390 c -10 -50, 10 -80, 6 -120 M${646 + i * 30} 300 c 10 -20, 30 -20, 40 -10 M${640 + i * 30} 330 c -14 -16, -34 -16, -44 -4" ${ink('stroke-width="2.2"')} stroke="#8a9a5a"/>`).join('')}</g>` +
      fox(560, 500, 1.1, true) + prince(230, 500, 1.05, 'sit'),
    22: () => sky('night') + stars(40, 22) + train(60, 400) + grownup(720, 470, .9, { hat: 'cap', coat: '#5b6e9e', prop: `<rect x="-6" y="-100" width="12" height="40" fill="#f2d16b" stroke="${INK}" stroke-width="1.4"/>` }) + prince(170, 500, .8, 'stand'),
    23: () => sky('day', 380) + desert(380, 23) + grownup(560, 440, 1.1, { hat: 'top', coat: '#6c4b7a', mustache: true, prop: `<rect x="-60" y="-24" width="40" height="30" fill="#fff8e4" stroke="${INK}" stroke-width="1.4"/><circle cx="-50" cy="-12" r="3" fill="#c8453b"/><circle cx="-38" cy="-8" r="3" fill="#7fa0d6"/><circle cx="-30" cy="-16" r="3" fill="#7aa66c"/>` }) +
      prince(240, 470, 1.05, 'stand') + `<path d="M120 300 c 40 -20, 60 20, 100 0" ${ink('opacity=".3"')}/>`,
    24: () => sky('night') + stars(80, 24, 360) + desert(400, 24) + prince(430, 470, 1.05, 'sit') + grownup(280, 470, .95, { hat: 'none', coat: '#7a6a55', prop: '' }) +
      `<path d="M330 500 q 40 -40 80 -10" ${ink('opacity=".35"')}/>`,
    25: () => sky('sunset') + `<path d="M0 380 L ${W} 380 L ${W} 600 L 0 600Z" fill="url(#sandg)"/><path d="M0 380 L ${W} 380" ${ink()}/>` + well(400, 450, 1.2) + prince(230, 470, 1.05, 'stand') + `<path d="M270 400 l 40 -14" ${ink('opacity=".35"')}/>`,
    26: () => sky('sunset') + wall(200, 380) + `<path d="M0 420 L 200 420 L 200 600 L 0 600Z" fill="url(#sandg)"/><path d="M200 420 L ${W} 420 L ${W} 600 L 200 600Z" fill="url(#sandg)"/>` +
      prince(430, 222, .9, 'sit') + snake(420, 300, .7) + `<path d="M330 420 l -40 80" ${ink('opacity=".2"')}/>`,
    27: () => sky('night') + stars(60, 27, 400) + `<path d="M0 480 C 200 440, 400 500, 800 460 L 800 600 L 0 600 Z" fill="url(#sandg)"/>
      <path d="M0 480 C 200 440, 400 500, 800 460" ${ink()}/><path d="M0 540 C 250 510, 500 560, 800 530" ${ink('opacity=".4"')}/>
      <circle cx="560" cy="185" r="26" fill="#fff3c4" opacity=".35" filter="url(#wash)"/>
      <path d="M560 160 L565 180 L585 185 L565 190 L560 210 L555 190 L535 185 L555 180Z" fill="#fff8d6" stroke="#fff3c4" stroke-width="1.2"/>`
  };

  function cover() {
    return wrap(sky('night') + stars(90, 99, 600) + planet(400, 380, 120, { volcanoes: true }) + prince(400, 262, 1, 'stand') + rose(480, 300, .65));
  }

  function chapter(n) {
    const fn = chapters[n];
    if (!fn) return cover();
    try { return wrap(fn()); } catch (e) { console.warn('art failed', n, e); return cover(); }
  }

  return { chapter, cover };
})();
