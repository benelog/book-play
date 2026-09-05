/* Original illustrations for the Little Prince reading edition. */
(function () {
  'use strict';

  var INK = '#233d5d';
  var SOFT_INK = '#41627b';
  var GOLD = '#e9b949';
  var SAND = '#e8bd78';
  var ROSE = '#d95c69';
  var GREEN = '#6e9b78';
  var PAPER = '#f7efda';

  function fixed(n) {
    return Math.round(n * 10) / 10;
  }

  function random(seed) {
    var a = seed >>> 0;
    return function () {
      a += 0x6D2B79F5;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function defs() {
    return '<defs>' +
      '<linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#102849"/><stop offset="0.62" stop-color="#31536d"/><stop offset="1" stop-color="#98786c"/></linearGradient>' +
      '<linearGradient id="deepNight" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0c213e"/><stop offset="1" stop-color="#294d69"/></linearGradient>' +
      '<linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#8ba9bd"/><stop offset="0.56" stop-color="#efc899"/><stop offset="1" stop-color="#f4ddad"/></linearGradient>' +
      '<linearGradient id="day" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b9d7df"/><stop offset="1" stop-color="#f5e4bd"/></linearGradient>' +
      '<linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#425b79"/><stop offset="0.5" stop-color="#d98972"/><stop offset="1" stop-color="#f2c36b"/></linearGradient>' +
      '<linearGradient id="cream" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fbf5e7"/><stop offset="1" stop-color="#e9ddc4"/></linearGradient>' +
      '<linearGradient id="earth" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#6fabc1"/><stop offset="1" stop-color="#315c88"/></linearGradient>' +
      '<radialGradient id="planet" cx="38%" cy="25%"><stop stop-color="#f4d88b"/><stop offset="1" stop-color="#bb765b"/></radialGradient>' +
      '<radialGradient id="lampGlow"><stop stop-color="#fff6b8" stop-opacity="0.9"/><stop offset="0.45" stop-color="#f6ce64" stop-opacity="0.3"/><stop offset="1" stop-color="#f6ce64" stop-opacity="0"/></radialGradient>' +
      '<filter id="grain" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="17" result="noise"/><feColorMatrix in="noise" type="matrix" values=".22 0 0 0 .55 0 .20 0 0 .58 0 0 .18 0 .62 0 0 0 .15 0"/></filter>' +
      '<filter id="soft"><feGaussianBlur stdDeviation="8"/></filter>' +
      '</defs>';
  }

  function wrap(background, body, quiet) {
    var texture = quiet ? '' : '<rect x="0" y="0" width="800" height="600" fill="#fff" opacity="0.28" filter="url(#grain)" pointer-events="none"/>';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img">' + defs() +
      '<rect x="0" y="0" width="800" height="600" fill="url(#' + background + ')"/>' + body + texture + '</svg>';
  }

  function stars(seed, count, x0, y0, x1, y1) {
    var r = random(seed);
    var out = '<g fill="#fff3bd">';
    var i;
    x0 = x0 == null ? 28 : x0;
    y0 = y0 == null ? 24 : y0;
    x1 = x1 == null ? 772 : x1;
    y1 = y1 == null ? 390 : y1;
    for (i = 0; i < count; i += 1) {
      var x = fixed(x0 + r() * (x1 - x0));
      var y = fixed(y0 + r() * (y1 - y0));
      var size = fixed(0.8 + r() * 2.2);
      var alpha = fixed(0.45 + r() * 0.5);
      if (i % 9 === 0) {
        out += '<path d="M' + fixed(x - size * 2) + ' ' + y + 'h' + fixed(size * 4) + 'M' + x + ' ' + fixed(y - size * 2) + 'v' + fixed(size * 4) + '" fill="none" stroke="#fff3bd" stroke-width="1" opacity="' + alpha + '"/>';
      } else {
        out += '<circle cx="' + x + '" cy="' + y + '" r="' + size + '" opacity="' + alpha + '"/>';
      }
    }
    return out + '</g>';
  }

  function cloud(x, y, s, opacity) {
    return '<path d="M' + x + ' ' + y + ' c ' + fixed(22 * s) + ' -' + fixed(20 * s) + ' ' + fixed(43 * s) + ' -' + fixed(7 * s) + ' ' + fixed(57 * s) + ' 0 c ' + fixed(18 * s) + ' -' + fixed(18 * s) + ' ' + fixed(52 * s) + ' -' + fixed(4 * s) + ' ' + fixed(58 * s) + ' ' + fixed(13 * s) + ' c -' + fixed(23 * s) + ' ' + fixed(10 * s) + ' -' + fixed(94 * s) + ' ' + fixed(8 * s) + ' -' + fixed(115 * s) + ' 0 z" fill="#fff8de" opacity="' + opacity + '"/>';
  }

  function sun(x, y, r, opacity) {
    return '<g opacity="' + (opacity == null ? 1 : opacity) + '"><circle cx="' + x + '" cy="' + y + '" r="' + fixed(r * 2.2) + '" fill="#f7c55c" opacity="0.14"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#f5c354" stroke="#b76d4b" stroke-width="2"/></g>';
  }

  function moon(x, y, r) {
    return '<path d="M' + x + ' ' + fixed(y - r) + 'a' + r + ' ' + r + ' 0 1 0 ' + fixed(r * 0.15) + ' ' + fixed(r * 1.95) + 'c-' + fixed(r * 0.65) + ' -' + fixed(r * 0.42) + ' -' + fixed(r * 0.68) + ' -' + fixed(r * 1.35) + ' -' + fixed(r * 0.15) + ' -' + fixed(r * 1.8) + 'z" fill="#fff0af" opacity="0.9"/>';
  }

  function dunes(night, low) {
    var a = night ? '#8b7e78' : '#e9bd77';
    var b = night ? '#625f68' : '#d79b62';
    var top = low ? 470 : 365;
    return '<path d="M0 ' + (top + 62) + 'Q145 ' + (top - 45) + ' 318 ' + (top + 40) + 'T800 ' + (top + 5) + 'V600H0z" fill="' + a + '" opacity="0.92"/>' +
      '<path d="M0 ' + (top + 117) + 'Q202 ' + (top + 28) + ' 405 ' + (top + 103) + 'T800 ' + (top + 70) + 'V600H0z" fill="' + b + '" opacity="0.78"/>' +
      '<path d="M58 ' + (top + 62) + 'Q159 ' + (top + 8) + ' 281 ' + (top + 43) + '" fill="none" stroke="#f5d99e" stroke-width="3" opacity="0.45"/>';
  }

  function planet(x, y, r, color) {
    color = color || 'url(#planet)';
    return '<g><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + color + '" stroke="' + INK + '" stroke-width="3"/>' +
      '<path d="M' + fixed(x - r * 0.91) + ' ' + fixed(y + r * 0.18) + 'Q' + x + ' ' + fixed(y - r * 0.12) + ' ' + fixed(x + r * 0.91) + ' ' + fixed(y + r * 0.18) + 'A' + r + ' ' + r + ' 0 0 1 ' + fixed(x - r * 0.91) + ' ' + fixed(y + r * 0.18) + 'z" fill="#a76d58" opacity="0.35"/>' +
      '<path d="M' + fixed(x - r * 0.79) + ' ' + fixed(y - r * 0.41) + 'Q' + fixed(x - r * 0.45) + ' ' + fixed(y - r * 0.58) + ' ' + fixed(x - r * 0.2) + ' ' + fixed(y - r * 0.46) + '" fill="none" stroke="#f8dfa0" stroke-width="' + Math.max(2, fixed(r * 0.035)) + '" opacity="0.45" stroke-linecap="round"/></g>';
  }

  function prince(x, y, s, direction) {
    direction = direction || 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + fixed(s * direction) + ' ' + fixed(s) + ')" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M-3 -50Q-13 -30 -10 -5L-18 0M-8 -5L4 0M-4 -48Q11 -31 11 -8" fill="none"/>' +
      '<path d="M-12 -50Q0 -57 12 -49L8 -22Q-1 -14 -12 -23z" fill="#e6b95c"/>' +
      '<path d="M-9 -47L-22 -31M9 -46L20 -31" fill="none"/>' +
      '<circle cx="0" cy="-68" r="14" fill="#f1c792"/>' +
      '<path d="M-13 -72Q-8 -88 4 -83Q15 -82 14 -67Q7 -75 1 -71Q-5 -78 -13 -72z" fill="#c99c48"/>' +
      '<path d="M4 -67l4 1M-4 -67l-1 1"/>' +
      '<path d="M-9 -55Q3 -50 13 -57L28 -50L14 -47L31 -38" fill="#dc6d59" stroke="#9f4d54"/>' +
      '</g>';
  }

  function seatedPrince(x, y, s, direction) {
    direction = direction || 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + fixed(s * direction) + ' ' + fixed(s) + ')" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="0" cy="-66" r="14" fill="#f1c792"/><path d="M-13 -70Q-7 -85 5 -81Q15 -77 13 -65Q4 -72 -2 -69Q-8 -76 -13 -70z" fill="#c99c48"/>' +
      '<path d="M-9 -51Q1 -57 11 -50L12 -25Q2 -18 -10 -25z" fill="#e6b95c"/><path d="M-8 -49L-20 -30M9 -47L20 -31" fill="none"/>' +
      '<path d="M-7 -24L18 -15L34 -3M10 -22L31 -22L43 -15" fill="none"/>' +
      '<path d="M-8 -56Q6 -51 14 -57L29 -49L16 -47L31 -39" fill="#dc6d59" stroke="#9f4d54"/>' +
      '</g>';
  }

  function lyingPrince(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="45" cy="-16" r="14" fill="#f1c792"/><path d="M35 -23Q44 -38 57 -24Q63 -17 57 -8Q51 -18 44 -13Q40 -20 35 -23z" fill="#c99c48"/>' +
      '<path d="M-14 -24Q13 -33 34 -20L30 5H-16z" fill="#e6b95c"/><path d="M-9 -3L-42 6L-68 3M3 4L-32 18L-58 17" fill="none"/>' +
      '<path d="M-7 -21L-29 -36M24 -17L42 1" fill="none"/><path d="M29 -27Q40 -23 54 -30L71 -25L57 -20L75 -16" fill="#dc6d59" stroke="#9f4d54"/>' +
      '</g>';
  }

  function childArtist(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="0" cy="-67" r="15" fill="#eec89b"/><path d="M-13 -72Q-4 -88 10 -77L13 -68Q4 -75 -2 -70Q-8 -76 -13 -72z" fill="#9d704a"/>' +
      '<path d="M-11 -51Q0 -57 13 -49L10 -16H-9z" fill="#75a2ad"/><path d="M-7 -43L-24 -26M9 -42L28 -30" fill="none"/>' +
      '<path d="M-4 -16L-9 2M5 -16L12 2" fill="none"/></g>';
  }

  function pilot(x, y, s, kneeling) {
    var legs = kneeling ? '<path d="M-4 -27L-23 -7L4 -4M8 -26L23 -14L30 -13" fill="none"/>' : '<path d="M-5 -27L-9 0M7 -27L12 0" fill="none"/>';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="0" cy="-73" r="15" fill="#d6aa7c"/><path d="M-14 -77Q0 -91 14 -76L13 -68Q2 -74 -13 -69z" fill="#6c594d"/>' +
      '<path d="M-14 -56Q0 -63 14 -55L11 -27H-11z" fill="#6f8490"/><path d="M-10 -51L-23 -31M10 -50L24 -35" fill="none"/>' + legs +
      '<path d="M-13 -67Q0 -62 13 -67" fill="none" stroke="#ae704f"/></g>';
  }

  function chair(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M0 -52V0M2 -25H34V-2M3 -24L-3 2M31 -24L38 2"/><path d="M0 -52Q18 -58 32 -49V-25" fill="#bb745c" opacity="0.65"/></g>';
  }

  function rose(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M0 0Q-5 -24 1 -48" fill="none" stroke="#4f825f"/><path d="M-2 -19Q-17 -31 -21 -15Q-10 -10 -2 -19zM1 -29Q15 -39 18 -24Q9 -18 1 -29z" fill="#73a67b"/>' +
      '<path d="M1 -47Q-16 -54 -13 -68Q-2 -77 7 -68Q18 -74 21 -60Q17 -48 1 -47z" fill="' + ROSE + '"/>' +
      '<path d="M-8 -65Q0 -58 9 -67M-10 -57Q0 -62 14 -56" fill="none" stroke="#a44255"/></g>';
  }

  function globe(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"><path d="M-35 0Q-34 -72 0 -78Q34 -72 35 0" fill="#d9f0ee" fill-opacity="0.18"/><path d="M-27 -11Q-30 -58 -10 -69" fill="none" stroke="#fff" stroke-width="5" opacity="0.5"/><ellipse cx="0" cy="0" rx="39" ry="7" fill="#b9d8d2" fill-opacity="0.28"/></g>';
  }

  function baobab(x, y, s, giant) {
    if (!giant) {
      return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"><path d="M0 0Q-3 -17 0 -33"/><path d="M0 -24L-10 -34M0 -26L11 -39"/><path d="M-13 -36Q-7 -49 2 -40Q9 -51 17 -39Q15 -28 5 -31Q-3 -25 -13 -36z" fill="#6f9870"/></g>';
    }
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M-24 0Q-9 -43 -16 -101Q-29 -124 -55 -142M-10 -106Q-2 -145 -11 -178M5 -104Q25 -139 43 -163M15 -86Q48 -111 66 -103Q70 -60 28 4z" fill="#93694f"/>' +
      '<path d="M-69 -151Q-65 -185 -31 -176Q-17 -203 9 -183Q34 -203 50 -177Q78 -183 84 -153Q72 -126 45 -137Q26 -118 6 -139Q-16 -119 -33 -141Q-57 -128 -69 -151z" fill="#688f6d"/>' +
      '<path d="M-12 -9L-2 -63M14 -11L8 -72" fill="none" stroke="#6d493e"/></g>';
  }

  function volcano(x, y, s, active) {
    var smoke = active ? '<path d="M-4 -50Q-19 -70 -5 -84Q9 -93 1 -108Q24 -100 18 -82Q13 -67 8 -51" fill="#d9d2c4" opacity="0.7"/>' : '<path d="M-7 -48q7 -8 14 0" fill="none"/>';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"><path d="M-35 0L-13 -50Q0 -58 13 -50L36 0z" fill="#a96e58"/><ellipse cx="0" cy="-50" rx="13" ry="5" fill="#5d4a4a"/>' + smoke + '</g>';
  }

  function fox(x, y, s, direction) {
    direction = direction || 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + fixed(s * direction) + ' ' + s + ')" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M-10 -19Q18 -35 42 -14Q48 1 28 8H-11Q-22 -3 -10 -19z" fill="#cf7b4d"/>' +
      '<path d="M35 -15Q55 -39 67 -23Q59 -17 50 -8Q69 -6 76 8Q53 19 30 7" fill="#d88b54"/>' +
      '<path d="M-13 -19L-27 -39L-30 -14Q-26 2 -11 5Q1 -4 -1 -18z" fill="#d98952"/>' +
      '<path d="M-26 -36L-16 -29M-4 -12l4 0M-26 -7q7 4 12 0" fill="none"/><path d="M-12 5L-14 19M15 8L18 20" fill="none"/>' +
      '<path d="M66 -22Q71 -8 75 8Q63 14 53 14" fill="#f2d2a0" stroke="none" opacity="0.75"/></g>';
  }

  function snake(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M-47 6Q-13 -18 14 0Q31 14 45 -3Q53 -13 44 -31Q34 -49 49 -55" fill="none" stroke="#e5b53e" stroke-width="7"/><path d="M43 -61Q56 -66 61 -55Q55 -44 44 -51z" fill="#e5b53e"/><circle cx="56" cy="-56" r="1.5" fill="#27394a" stroke="none"/></g>';
  }

  function well(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M-52 0V-31Q0 -48 52 -31V0Q0 20 -52 0z" fill="#c99d72"/><ellipse cx="0" cy="-31" rx="52" ry="17" fill="#4d6674"/><path d="M-62 -29V-106M62 -29V-106M-68 -103H68" fill="none"/>' +
      '<circle cx="0" cy="-102" r="13" fill="#b67b52"/><path d="M0 -102V-42" fill="none"/><path d="M-13 -42Q0 -49 13 -42V-20Q0 -14 -13 -20z" fill="#7da2aa"/>' +
      '<path d="M13 -102H34L43 -92" fill="none"/></g>';
  }

  function biplane(x, y, s, angle, broken) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (angle || 0) + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M-68 0Q-25 -13 34 -5L62 0L34 8Q-23 13 -68 0z" fill="#b9a47c"/><path d="M-13 -4L-40 -41H21L34 -5M-8 8L-35 39H22L35 7" fill="#d7bd87" opacity="0.9"/>' +
      '<path d="M-53 -2L-67 -26H-47L-31 0M-55 2L-70 20H-47L-31 5" fill="#be8b68"/><circle cx="61" cy="0" r="4" fill="#475966"/>' +
      '<path d="M61 -22V22M50 0H72" fill="none"/>' + (broken ? '<path d="M9 -2l9 -12l8 9M-2 8l-10 13" fill="none" stroke="#a54e45"/>' : '') + '</g>';
  }

  function lamp(x, y, s, lit) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
      (lit ? '<circle cx="0" cy="-89" r="55" fill="url(#lampGlow)" stroke="none"/>' : '') +
      '<path d="M0 0V-69M-16 0H16" fill="none"/><path d="M-16 -100H16L12 -69H-12z" fill="' + (lit ? '#ffe08a' : '#8ca0a5') + '"/><path d="M-12 -100L-6 -114H7L16 -100" fill="none"/><path d="M-7 -83H7" fill="none"/></g>';
  }

  function railway(y) {
    return '<g stroke="' + INK + '" stroke-linecap="round"><path d="M-20 ' + y + 'L820 ' + (y + 72) + 'M-20 ' + (y + 18) + 'L820 ' + (y + 90) + '" stroke-width="5"/>' +
      '<path d="M18 ' + (y + 8) + 'l-5 24M82 ' + (y + 14) + 'l-5 24M146 ' + (y + 19) + 'l-5 25M210 ' + (y + 25) + 'l-5 25M274 ' + (y + 30) + 'l-5 25M338 ' + (y + 36) + 'l-5 25M402 ' + (y + 41) + 'l-5 25M466 ' + (y + 47) + 'l-5 25M530 ' + (y + 52) + 'l-5 25M594 ' + (y + 58) + 'l-5 25M658 ' + (y + 63) + 'l-5 25M722 ' + (y + 69) + 'l-5 25" stroke-width="3"/></g>';
  }

  function birds(x, y, s, count) {
    var out = '<g fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round">';
    var i;
    for (i = 0; i < count; i += 1) {
      var dx = (i % 4) * 33 * s + Math.floor(i / 4) * 11 * s;
      var dy = Math.floor(i / 4) * 29 * s + (i % 2) * 8 * s;
      out += '<path d="M' + fixed(x + dx) + ' ' + fixed(y + dy) + 'q' + fixed(8 * s) + ' -' + fixed(8 * s) + ' ' + fixed(16 * s) + ' 0q' + fixed(8 * s) + ' -' + fixed(8 * s) + ' ' + fixed(16 * s) + ' 0"/>';
    }
    return out + '</g>';
  }

  function appleTree(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0Q-5 -68 8 -126M1 -68L-39 -103M5 -84L45 -118" fill="none" stroke="#795b47" stroke-width="11"/><path d="M-68 -112Q-69 -151 -36 -157Q-20 -185 9 -164Q38 -181 55 -153Q84 -145 70 -111Q45 -88 17 -105Q-7 -87 -29 -103Q-51 -88 -68 -112z" fill="#6f9d70"/><g fill="#cc6155" stroke-width="1.5"><circle cx="-39" cy="-127" r="7"/><circle cx="2" cy="-146" r="7"/><circle cx="39" cy="-126" r="7"/><circle cx="19" cy="-108" r="7"/></g></g>';
  }

  function wheatField(y) {
    var out = '<g stroke="#a7793d" stroke-width="2" stroke-linecap="round" opacity="0.82">';
    var i;
    for (i = 0; i < 45; i += 1) {
      var x = 10 + i * 18;
      var h = 34 + (i % 5) * 8;
      out += '<path d="M' + x + ' 600V' + (600 - h) + 'm0 8l-7 -8m7 15l8 -8m-8 17l-7 -8"/>';
    }
    return '<path d="M0 ' + y + 'Q260 ' + (y - 35) + ' 800 ' + (y + 10) + 'V600H0z" fill="#d8b660" opacity="0.55"/>' + out + '</g>';
  }

  function hammer(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(-25) scale(' + s + ')" stroke="' + INK + '" stroke-width="2.5"><path d="M0 0V-44"/><path d="M-13 -53H18V-40H-13z" fill="#78858a"/></g>';
  }

  function chapter1() {
    var grownups = '<g fill="#7d8790" stroke="' + INK + '" stroke-width="2.5" opacity="0.82">' +
      '<circle cx="610" cy="229" r="24"/><path d="M574 375Q577 267 609 255Q649 264 654 375z"/>' +
      '<circle cx="699" cy="249" r="21"/><path d="M672 375Q670 283 699 273Q731 281 741 375z"/></g>';
    return wrap('cream', '<path d="M0 399Q210 381 402 400T800 390V600H0z" fill="#d7c39c" opacity="0.65"/>' +
      '<ellipse cx="330" cy="414" rx="232" ry="35" fill="#82644c" opacity="0.18"/>' +
      '<path d="M132 346L513 330L548 436L103 450z" fill="#c99668" stroke="' + INK + '" stroke-width="3"/><path d="M153 439L139 550M510 430L528 545" stroke="' + INK + '" stroke-width="5"/>' +
      '<path d="M279 336l112 -7l39 67l-124 9z" fill="#fffaf0" stroke="' + SOFT_INK + '" stroke-width="2"/><path d="M320 360q28 -23 56 2q17 18 31 5M329 379q29 -18 59 3" fill="none" stroke="#638695" stroke-width="3" opacity="0.7"/>' +
      childArtist(221, 443, 1.25) + '<path d="M247 407Q284 382 320 371" fill="none" stroke="' + INK + '" stroke-width="3"/><circle cx="322" cy="370" r="5" fill="#6b88a0"/>' + grownups +
      '<g fill="none" stroke="#8496a0" stroke-width="3" opacity="0.65"><path d="M600 194q9 -18 19 0M690 216q8 -14 17 0"/><path d="M582 212q27 -25 54 0M677 232q23 -21 45 0"/></g>');
  }

  function chapter2() {
    return wrap('dawn', sun(104, 162, 36, 0.86) + cloud(480, 100, 0.8, 0.38) + dunes(false, false) +
      '<g transform="translate(218 411) rotate(-8)">' + biplane(0, 0, 1.7, 0, true) + '</g>' +
      '<path d="M169 468q65 -16 127 0" fill="none" stroke="#b47c50" stroke-width="3"/>' + pilot(336, 485, 1.18, true) + prince(570, 475, 1.08, -1) +
      '<path d="M493 447Q526 437 550 443" fill="none" stroke="#dca361" stroke-width="4" opacity="0.55"/>');
  }

  function chapter3() {
    return wrap('deepNight', stars(303, 48, 25, 20, 775, 430) +
      '<path d="M75 497Q302 426 493 503T800 477V600H0z" fill="#ac8b6e" opacity="0.75"/>' +
      planet(598, 229, 112) + '<path d="M541 161l21 -27l21 26z" fill="#d8b46e" stroke="' + INK + '" stroke-width="2"/><rect x="548" y="158" width="29" height="31" rx="3" fill="#ead8a9" stroke="' + INK + '" stroke-width="2"/>' +
      prince(636, 183, 0.72, -1) + '<path d="M561 282Q499 327 430 368" fill="none" stroke="#e9c367" stroke-width="2" stroke-dasharray="6 10" opacity="0.7"/>' +
      biplane(292, 432, 0.95, -8, true) + pilot(401, 508, 0.9, false));
  }

  function chapter4() {
    return wrap('night', stars(612, 58, 20, 20, 780, 430) +
      '<circle cx="218" cy="193" r="116" fill="#d7b16f" opacity="0.16" stroke="#f0d391" stroke-width="2"/><circle cx="218" cy="193" r="17" fill="#dab76f" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M194 174l22 -24l24 23M199 175v27h36v-29" fill="#e5d0a0" stroke="' + INK + '" stroke-width="2"/><path d="M218 176v26" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M0 497Q235 425 800 493V600H0z" fill="#8f7a6b" opacity="0.8"/>' +
      '<g transform="translate(556 452)" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M-75 0L-23 -92L18 -72L-34 9" fill="#a5a099"/><path d="M-20 -89L40 -148L59 -129L13 -70" fill="#6c8490"/><ellipse cx="50" cy="-139" rx="22" ry="14" transform="rotate(-43 50 -139)" fill="#bdd4d2"/><path d="M-42 -2L-65 61M-15 2L6 61"/><circle cx="64" cy="-8" r="20" fill="#d4aa7f"/><path d="M42 61Q43 17 64 13Q88 18 91 61z" fill="#776e70"/></g>' +
      '<path d="M491 279Q359 221 252 202" fill="none" stroke="#f1d28c" stroke-width="2" stroke-dasharray="4 7" opacity="0.65"/>');
  }

  function chapter5() {
    return wrap('dawn', '<circle cx="405" cy="348" r="177" fill="#ddb274" opacity="0.18"/>' + planet(405, 386, 165) +
      '<path d="M300 474Q359 438 408 466Q465 426 526 465" fill="none" stroke="#704d42" stroke-width="11" opacity="0.65"/>' +
      baobab(413, 320, 1.08, true) + prince(278, 360, 0.78, 1) +
      '<path d="M292 318Q315 296 336 314" fill="none" stroke="' + INK + '" stroke-width="3"/>' + baobab(339, 337, 0.55, false) +
      '<path d="M325 337q16 19 34 0" fill="none" stroke="#704d42" stroke-width="4"/>' +
      '<path d="M353 476l-20 39M390 479l-5 49M444 474l18 47" stroke="#704d42" stroke-width="5"/>');
  }

  function chapter6() {
    var suns = sun(132, 312, 27, 0.24) + sun(226, 263, 30, 0.35) + sun(326, 212, 34, 0.5) + sun(435, 164, 38, 0.72) + sun(560, 125, 43, 1);
    return wrap('sunset', stars(644, 20, 25, 20, 760, 190) + suns +
      '<path d="M0 460Q210 391 381 466T800 441V600H0z" fill="#745c61" opacity="0.65"/>' +
      '<path d="M358 480Q501 405 668 464" fill="none" stroke="#f1c982" stroke-width="4" opacity="0.45"/>' +
      chair(519, 458, 1.2) + seatedPrince(536, 447, 1.08, -1) +
      '<path d="M503 457Q536 448 566 452" fill="none" stroke="#4d4653" stroke-width="3"/>');
  }

  function chapter7() {
    return wrap('day', sun(699, 91, 38, 0.45) + dunes(false, false) +
      '<g transform="translate(235 407) rotate(-5)">' + biplane(0, 0, 1.45, 0, true) + '</g>' +
      '<path d="M176 408q30 -42 80 -11l-9 55q-45 15 -78 -5z" fill="#6b7c83" stroke="' + INK + '" stroke-width="3"/><g stroke="#c35f4e" stroke-width="3"><path d="M190 420l34 22M215 407l-12 48"/></g>' +
      pilot(349, 484, 1.08, true) + hammer(374, 418, 0.8) +
      prince(582, 489, 1.05, -1) + rose(629, 490, 0.7) +
      '<path d="M570 410q15 -15 30 0M565 403q20 -24 40 0" fill="none" stroke="#b95b5a" stroke-width="2" opacity="0.75"/>');
  }

  function chapter8() {
    return wrap('dawn', cloud(73, 105, 0.8, 0.4) + cloud(558, 163, 0.6, 0.35) +
      planet(395, 404, 168) +
      '<path d="M306 385Q395 342 484 385" fill="none" stroke="#7a8e61" stroke-width="5" opacity="0.55"/>' +
      rose(403, 374, 1.35) + globe(403, 374, 1.35) + prince(289, 380, 0.76, 1) +
      '<g fill="#fff0bb" opacity="0.65"><circle cx="447" cy="284" r="4"/><circle cx="472" cy="316" r="3"/><circle cx="348" cy="301" r="3"/></g>');
  }

  function chapter9() {
    return wrap('dawn', birds(513, 84, 1.08, 10) +
      planet(286, 412, 170) + volcano(221, 327, 0.78, true) + volcano(331, 335, 0.66, false) + rose(400, 390, 0.46) + globe(400, 390, 0.46) +
      prince(292, 350, 0.72, -1) + '<path d="M275 313l-26 -26M245 280l12 8M245 280l-7 13" fill="none" stroke="' + INK + '" stroke-width="3"/>' +
      '<path d="M402 236Q491 177 536 118" fill="none" stroke="#dcae55" stroke-width="2" stroke-dasharray="5 7" opacity="0.7"/>' +
      '<path d="M0 557Q185 532 379 557T800 548V600H0z" fill="#c38a67" opacity="0.35"/>');
  }

  function chapter10() {
    return wrap('night', stars(1010, 43) + planet(408, 438, 170, '#9a7070') +
      '<g transform="translate(405 423)" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round">' +
      '<path d="M-105 68V-91Q0 -142 105 -91V68" fill="#7c4c63"/><path d="M-81 62V-67Q0 -104 81 -67V62" fill="#b27672"/>' +
      '<path d="M-62 55Q-63 -45 0 -59Q63 -44 62 55z" fill="#f1e2c4"/><path d="M-61 -1l22 -17l18 19l22 -22l22 22l19 -19l20 17" fill="none" stroke="#7e8790"/>' +
      '<circle cx="0" cy="-82" r="20" fill="#d7ac81"/><path d="M-18 -95Q0 -110 19 -95V-85Q0 -93 -18 -85z" fill="#d7d0bf"/>' +
      '<path d="M-20 -104L-13 -124L0 -110L13 -124L20 -104z" fill="#e2b84e"/><circle cx="-13" cy="-124" r="3" fill="#c65d5d"/><circle cx="13" cy="-124" r="3" fill="#c65d5d"/>' +
      '<path d="M-35 -57Q0 -75 35 -57L48 41H-48z" fill="#7b4c68"/><path d="M-35 -53Q0 -38 35 -53" stroke="#e7d8bc" stroke-width="9" stroke-dasharray="2 7"/>' +
      '<path d="M-25 5L-65 34M24 5L67 22" fill="none"/><path d="M-70 34l19 -9l5 15z" fill="#d7ac81"/>' +
      '</g>');
  }

  function chapter11() {
    return wrap('day', cloud(67, 112, 0.7, 0.36) + planet(407, 451, 136, '#c79667') +
      '<g transform="translate(405 423) rotate(9)" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M-34 -68Q0 -89 35 -68L29 -5H-28z" fill="#7d7292"/><path d="M-30 -53L-69 -9M29 -52L67 -12" fill="none"/><path d="M-38 -3Q3 28 44 -1" fill="none"/>' +
      '<circle cx="0" cy="-90" r="20" fill="#deb184"/><path d="M-25 -105Q0 -145 26 -105L59 -86Q0 -72 -59 -87z" fill="#b56b4e"/><path d="M-36 -94Q0 -105 37 -94" fill="none" stroke="#e8b84e" stroke-width="6"/>' +
      '<path d="M-20 -5L-28 45M20 -3L32 43" fill="none"/></g>' +
      '<g fill="none" stroke="#7794a3" stroke-width="3" opacity="0.58"><path d="M260 302q35 -25 70 0"/><path d="M545 321q29 -20 57 0"/></g>');
  }

  function chapter12() {
    return wrap('sunset', '<path d="M0 458Q228 415 408 461T800 449V600H0z" fill="#665461" opacity="0.66"/>' + planet(405, 458, 137, '#84636b') +
      '<g stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"><path d="M305 443H522M326 443L315 515M501 443L513 515"/>' +
      '<path d="M364 438v-58h22v58zM446 439v-75h24v75zM480 439v-45h19v45z" fill="#77959d"/><path d="M368 380h14M450 364h15M483 394h13"/>' +
      '<path d="M396 439q3 -88 31 -95q35 20 23 95" fill="#796b79"/><circle cx="424" cy="324" r="19" fill="#c99f7c"/><path d="M407 318q16 -24 34 -3" fill="#66565c"/>' +
      '<path d="M405 365l-25 42M443 366l24 37" fill="none"/></g>' +
      '<g fill="#b9d7da" opacity="0.28"><ellipse cx="375" cy="409" rx="10" ry="25"/><ellipse cx="457" cy="402" rx="11" ry="32"/></g>');
  }

  function chapter13() {
    var beads = '<g fill="#f4d36e" stroke="' + INK + '" stroke-width="1.5">';
    var i;
    for (i = 0; i < 28; i += 1) {
      beads += '<circle cx="' + (90 + (i % 7) * 40) + '" cy="' + (86 + Math.floor(i / 7) * 42) + '" r="' + (4 + (i % 3)) + '"/>';
    }
    beads += '</g>';
    return wrap('deepNight', stars(1313, 55, 390, 20, 775, 360) + planet(407, 487, 128, '#7d7271') + beads +
      '<g transform="translate(427 430)" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M-91 5H101M-75 5L-86 75M83 5L96 74"/><path d="M-74 -7Q-65 -89 -28 -92Q7 -83 2 -7" fill="#697986"/><circle cx="-36" cy="-112" r="19" fill="#d0a47c"/><path d="M-53 -119q18 -23 35 0" fill="#62594f"/>' +
      '<path d="M-55 -69L-12 -35M-20 -68L27 -23" fill="none"/><path d="M17 -4h57v-72H17z" fill="#f1e9d6"/><g stroke="#86959b" stroke-width="2"><path d="M27 -61h36M27 -45h36M27 -29h36M39 -70v56M52 -70v56"/></g></g>');
  }

  function chapter14() {
    return wrap('sunset', '<path d="M400 0H800V600H400z" fill="#173554" opacity="0.48"/>' + sun(132, 172, 35, 0.82) + moon(684, 127, 38) + stars(1414, 30, 420, 20, 780, 310) +
      planet(403, 448, 127, '#b98361') + lamp(405, 393, 1.2, true) +
      '<g transform="translate(325 443) rotate(-7)">' + pilot(0, 0, 0.73, false) + '</g>' +
      '<path d="M402 321Q390 281 405 247Q423 284 405 321" fill="#f5d378" opacity="0.35"/>' +
      '<path d="M115 407Q229 365 339 399M478 399Q594 355 725 405" fill="none" stroke="#e5b974" stroke-width="3" opacity="0.33"/>');
  }

  function chapter15() {
    return wrap('cream', '<path d="M0 479Q236 445 800 477V600H0z" fill="#bda981" opacity="0.42"/>' +
      '<g stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"><path d="M117 423H685M146 423L128 555M650 423L675 555" stroke-width="5"/>' +
      '<path d="M125 413h119v-49H125zM139 361h113v-54H139zM505 414h139v-57H505zM527 354h105v-48H527z" fill="#a88161"/><path d="M151 322h80M144 379h82M529 372h96M544 322h73" stroke="#e8d6ad"/>' +
      '<path d="M309 417Q307 270 396 255Q485 274 477 417z" fill="#78808a"/><circle cx="397" cy="225" r="28" fill="#d7b18d"/><path d="M369 217Q395 177 427 214L425 229Q397 213 370 231z" fill="#d8d2c4"/>' +
      '<path d="M342 312L274 378M452 312L516 380" fill="none"/><path d="M246 333Q326 313 388 369Q445 315 530 333V425Q446 402 388 437Q327 399 246 425z" fill="#f1e6cf"/>' +
      '<circle cx="394" cy="367" r="42" fill="#6e9aae"/><path d="M370 352q18 -24 34 -3q21 -3 15 24q-23 13 -46 -3z" fill="#7da06b" stroke-width="1.5"/></g>');
  }

  function chapter16() {
    var lamps = '';
    var pts = [[307,250],[353,218],[405,238],[449,278],[478,330],[434,373],[373,382],[324,342],[289,296]];
    var i;
    for (i = 0; i < pts.length; i += 1) {
      lamps += '<g transform="translate(' + pts[i][0] + ' ' + pts[i][1] + ') scale(.21)">' + lamp(0, 0, 1, true) + '</g>';
    }
    return wrap('deepNight', stars(1616, 54) + '<circle cx="392" cy="305" r="224" fill="url(#lampGlow)" opacity="0.2"/>' +
      '<circle cx="392" cy="305" r="179" fill="url(#earth)" stroke="' + INK + '" stroke-width="4"/>' +
      '<path d="M302 176Q351 144 390 171Q409 197 388 220Q358 211 337 240Q293 239 302 176zM435 210Q490 185 526 236Q521 272 485 277Q467 305 438 284zM307 299Q341 271 377 294Q399 321 371 345Q354 382 323 361Q286 343 307 299zM425 340Q475 312 502 348Q490 392 448 422Q411 395 425 340z" fill="#7da573" opacity="0.9" stroke="#416674" stroke-width="2"/>' + lamps +
      '<path d="M243 239Q389 128 536 252" fill="none" stroke="#ffde75" stroke-width="4" stroke-dasharray="3 12" opacity="0.7"/>');
  }

  function chapter17() {
    return wrap('night', stars(1717, 58, 20, 18, 780, 350) + moon(645, 108, 48) + dunes(true, false) +
      '<path d="M500 454Q568 433 653 451" fill="none" stroke="#d9bb79" stroke-width="3" opacity="0.35"/>' +
      prince(314, 470, 1.08, 1) + snake(489, 473, 1.15) +
      '<path d="M341 393Q407 358 480 401" fill="none" stroke="#f3db8c" stroke-width="2" stroke-dasharray="3 10" opacity="0.34"/>');
  }

  function chapter18() {
    return wrap('day', sun(670, 102, 45, 0.5) + dunes(false, false) +
      '<g transform="translate(407 461)" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M0 36Q-4 -20 1 -65" fill="none" stroke="#66866d"/><path d="M0 -60Q-32 -83 -35 -53Q-17 -39 0 -54Q25 -84 34 -57Q27 -37 1 -52Q5 -88 -13 -91Q-28 -75 0 -60z" fill="#d87b72"/><path d="M-2 -8Q-22 -22 -29 -5Q-14 4 -2 -8z" fill="#7f9c70"/></g>' +
      '<ellipse cx="406" cy="497" rx="57" ry="10" fill="#916443" opacity="0.18"/>' +
      '<path d="M70 458q71 -21 127 1M596 425q70 -17 137 3" fill="none" stroke="#f1d79e" stroke-width="3" opacity="0.42"/>');
  }

  function chapter19() {
    return wrap('day', '<path d="M0 480L165 296L247 376L391 127L516 325L620 247L800 466V600H0z" fill="#75858a" opacity="0.82" stroke="' + INK + '" stroke-width="3"/>' +
      '<path d="M201 334l45 42l145 -249l42 86M561 315l59 -68l62 82" fill="none" stroke="#e1cfaa" stroke-width="8" opacity="0.5"/>' +
      prince(393, 138, 0.66, 1) +
      '<g fill="none" stroke="#5d7f91" stroke-width="3" stroke-linecap="round"><path d="M431 88q39 -24 80 1"/><path d="M446 70q53 -34 108 3" opacity="0.65"/><path d="M465 51q65 -40 131 4" opacity="0.35"/></g>' +
      '<path d="M0 529Q211 481 401 533T800 521V600H0z" fill="#b28e68" opacity="0.45"/>');
  }

  function chapter20() {
    var garden = '<g>';
    var r = random(2020);
    var i;
    for (i = 0; i < 64; i += 1) {
      var x = 25 + r() * 750;
      var y = 285 + r() * 258;
      var s = 0.33 + r() * 0.45;
      garden += rose(fixed(x), fixed(y), fixed(s));
    }
    garden += '</g>';
    return wrap('day', cloud(75, 96, 0.8, 0.38) + '<path d="M0 330Q253 278 508 326T800 304V600H0z" fill="#7fa274" opacity="0.55"/>' + garden +
      lyingPrince(415, 512, 1.1) + '<path d="M335 514q74 25 153 0" fill="none" stroke="#587353" stroke-width="4"/>' +
      '<path d="M340 425q40 -21 80 0" fill="none" stroke="#607f74" stroke-width="3" opacity="0.5"/>');
  }

  function chapter21() {
    return wrap('sunset', sun(675, 116, 38, 0.65) + wheatField(408) + appleTree(177, 470, 1.25) +
      fox(332, 479, 0.95, -1) + prince(610, 477, 0.9, -1) +
      '<g opacity="0.18">' + prince(729, 477, 0.9, -1) + '</g><g opacity="0.28">' + prince(682, 477, 0.9, -1) + '</g>' +
      '<path d="M390 465Q475 437 563 459" fill="none" stroke="#e7c56b" stroke-width="3" stroke-dasharray="4 10" opacity="0.65"/>');
  }

  function train(x, y, s, color, direction) {
    direction = direction || 1;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + fixed(s * direction) + ' ' + s + ')" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"><path d="M-94 -42H79Q98 -34 108 -11V2H-94z" fill="' + color + '"/><path d="M-74 -31h30v20h-30zM-31 -31h30v20h-30zM12 -31h30v20H12zM55 -31h26v20H55z" fill="#ffe58b"/><circle cx="-58" cy="5" r="9" fill="#4a5360"/><circle cx="65" cy="5" r="9" fill="#4a5360"/><path d="M108 -11h18"/><circle cx="128" cy="-10" r="7" fill="#ffe890"/></g>';
  }

  function chapter22() {
    return wrap('deepNight', stars(2222, 40, 20, 20, 780, 260) + railway(430) +
      '<g opacity="0.3" stroke="#ffe487" stroke-width="18"><path d="M0 324L302 351"/><path d="M800 292L554 315"/></g>' +
      train(153, 349, 1.05, '#a95f58', 1) + train(673, 316, 0.88, '#557a91', -1) +
      '<g stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"><path d="M342 479V313H479V491z" fill="#b58a64"/><path d="M323 317l87 -74l89 75z" fill="#765764"/><rect x="365" y="344" width="48" height="47" fill="#ffe08a"/><rect x="423" y="344" width="35" height="116" fill="#6b6670"/><path d="M389 344v47M365 367h48"/></g>' +
      '<g transform="translate(449 461) scale(.55)">' + pilot(0, 0, 1, false) + '</g>');
  }

  function chapter23() {
    return wrap('day', dunes(false, false) +
      '<g transform="translate(652 372) scale(.72)">' + well(0, 0, 1) + '</g><path d="M626 291q28 -54 56 0" fill="none" stroke="#87b9c4" stroke-width="9" opacity="0.55"/>' +
      '<g stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"><path d="M119 431H479M146 431L132 525M455 431L470 526" stroke-width="5"/>' +
      '<path d="M216 426v-75h37v75zM270 426v-101h44v101zM333 426v-62h34v62z" fill="#b8d0c8"/><path d="M221 352h27M276 326h33M338 365h24"/>' +
      '<path d="M361 428Q360 302 410 294Q459 307 454 428z" fill="#8d766d"/><circle cx="410" cy="270" r="21" fill="#d6a77f"/><path d="M390 264q19 -28 39 0" fill="#715d55"/><path d="M382 348l-65 37M438 347l42 37" fill="none"/>' +
      '<g fill="#d8bb69"><circle cx="229" cy="369" r="5"/><circle cx="287" cy="344" r="5"/><circle cx="350" cy="382" r="5"/></g></g>');
  }

  function chapter24() {
    return wrap('deepNight', stars(2424, 72, 20, 15, 780, 390) + moon(671, 90, 31) + dunes(true, false) +
      pilot(300, 476, 1.02, false) + prince(459, 478, 0.95, -1) +
      '<path d="M341 457Q382 440 424 457" fill="none" stroke="#f1dc9c" stroke-width="2" stroke-dasharray="4 9" opacity="0.65"/>' +
      '<path d="M242 491l-24 11M400 495l-23 9M509 493l-22 9" stroke="#514e57" stroke-width="3" opacity="0.45"/>');
  }

  function chapter25() {
    return wrap('dawn', sun(108, 125, 35, 0.65) + dunes(false, false) +
      '<ellipse cx="405" cy="500" rx="160" ry="28" fill="#9e704f" opacity="0.2"/>' + well(405, 478, 1.45) +
      prince(571, 488, 0.9, -1) + pilot(232, 500, 0.92, false) +
      '<path d="M405 330Q430 299 451 334" fill="none" stroke="#9ccfd1" stroke-width="5" opacity="0.55"/>' +
      '<g fill="#d8f0e8" opacity="0.7"><circle cx="451" cy="338" r="5"/><circle cx="463" cy="351" r="3"/><circle cx="444" cy="355" r="3"/></g>');
  }

  function chapter26() {
    return wrap('deepNight', stars(2626, 104, 18, 12, 782, 430) +
      '<path d="M0 509Q220 462 432 512T800 493V600H0z" fill="#625b60" opacity="0.73"/>' +
      '<path d="M160 459Q294 427 444 451Q574 425 704 461L692 519Q560 493 439 515Q289 485 170 523z" fill="#8d796b" stroke="' + INK + '" stroke-width="3"/>' +
      '<path d="M219 451l-7 60M304 440l-5 62M397 444l-4 64M493 443l6 61M594 444l9 62" stroke="#685b55" stroke-width="2"/>' +
      seatedPrince(482, 449, 1.02, -1) +
      '<g fill="none" stroke="#ffe795" stroke-width="2" opacity="0.45"><circle cx="201" cy="137" r="18"/><circle cx="650" cy="208" r="25"/><circle cx="518" cy="93" r="15"/></g>');
  }

  function chapter27() {
    return wrap('deepNight', '<path d="M0 467Q174 369 394 466V600H0z" fill="#9d806f" opacity="0.75"/>' +
      '<path d="M249 600Q521 395 800 489V600z" fill="#c19a71" opacity="0.65"/>' +
      '<path d="M653 124h18M662 115v18" stroke="#fff0a3" stroke-width="3" stroke-linecap="round"/><circle cx="662" cy="124" r="4" fill="#fff0a3"/>', true);
  }

  var chapters = [null, chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11, chapter12, chapter13, chapter14, chapter15, chapter16, chapter17, chapter18, chapter19, chapter20, chapter21, chapter22, chapter23, chapter24, chapter25, chapter26, chapter27];

  function cover() {
    return wrap('deepNight', stars(777, 82, 25, 18, 775, 415) +
      '<circle cx="401" cy="377" r="194" fill="url(#lampGlow)" opacity="0.13"/>' +
      planet(401, 472, 171) +
      '<path d="M319 450Q400 408 485 452" fill="none" stroke="#718c67" stroke-width="6" opacity="0.55"/>' +
      prince(403, 424, 1.32, 1) +
      '<path d="M435 348Q493 324 545 346" fill="none" stroke="#db6c57" stroke-width="5" stroke-linecap="round" opacity="0.7"/>' +
      '<g fill="#fff1a8"><circle cx="401" cy="116" r="5"/><path d="M386 116h30M401 101v30" stroke="#fff1a8" stroke-width="2"/></g>');
  }

  window.LP_ART = {
    chapter: function (n) {
      var number = Number(n);
      if (number !== Math.floor(number) || number < 1 || number > 27) {
        throw new RangeError('chapter number must be an integer from 1 to 27');
      }
      return chapters[number]();
    },
    cover: cover
  };
}());
