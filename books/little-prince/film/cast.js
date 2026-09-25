/* The Little Prince film — who speaks each quoted line, and how each character sounds.
   speakers[n] lists, in order, the speaker of every "double-quoted" span in chapter n of text/the-little-prince.txt
   (film/script.js splits the text). Change the text and this list together: node tools/test.js checks the counts,
   and node tools/film-quotes.js <from> <to> prints every quote next to its speaker.
   voice: 'male' | 'female' picks from the browser's English voices; pitch and rate tune it (Web Speech API). */
window.LP_FILM_CAST = {
  characters: {
    narrator:     { name: 'Narrator',        ko: '화자(조종사)',  color: '#e9dcc0', voice: 'male',   pitch: 0.95, rate: 1.0 },
    pilot:        { name: 'The pilot',       ko: '조종사',        color: '#9cc3ff', voice: 'male',   pitch: 1.0,  rate: 1.0 },
    prince:       { name: 'The little prince', ko: '어린 왕자',   color: '#ffd45e', voice: 'female', pitch: 1.45, rate: 1.0 },
    grownups:     { name: 'Grown-ups',       ko: '어른들',        color: '#c9b8a6', voice: 'male',   pitch: 0.8,  rate: 0.95 },
    rose:         { name: 'The flower',      ko: '꽃',            color: '#ff8a8a', voice: 'female', pitch: 1.2,  rate: 0.95 },
    king:         { name: 'The king',        ko: '왕',            color: '#e7b3ff', voice: 'male',   pitch: 0.7,  rate: 0.9 },
    vainman:      { name: 'The vain man',    ko: '허영쟁이',      color: '#ffb36b', voice: 'male',   pitch: 1.15, rate: 0.95 },
    drinker:      { name: 'The drinker',     ko: '술꾼',          color: '#b0b8c8', voice: 'male',   pitch: 0.75, rate: 0.8 },
    businessman:  { name: 'The businessman', ko: '사업가',        color: '#d8c27a', voice: 'male',   pitch: 0.9,  rate: 1.15 },
    lamplighter:  { name: 'The lamplighter', ko: '점등인',        color: '#ffa07a', voice: 'male',   pitch: 0.85, rate: 1.05 },
    geographer:   { name: 'The geographer',  ko: '지리학자',      color: '#a8d8c8', voice: 'male',   pitch: 0.8,  rate: 0.9 },
    snake:        { name: 'The snake',       ko: '뱀',            color: '#e8d25a', voice: 'female', pitch: 0.6,  rate: 0.85 },
    desertflower: { name: 'The desert flower', ko: '사막의 꽃',   color: '#f7b0c8', voice: 'female', pitch: 1.3,  rate: 0.95 },
    echo:         { name: 'The echo',        ko: '메아리',        color: '#b8c8e8', voice: 'female', pitch: 1.45, rate: 0.9, volume: 0.55 },
    roses:        { name: 'The roses',       ko: '장미들',        color: '#ff9fb0', voice: 'female', pitch: 1.25, rate: 1.0 },
    fox:          { name: 'The fox',         ko: '여우',          color: '#ff9950', voice: 'male',   pitch: 1.1,  rate: 0.95 },
    switchman:    { name: 'The switchman',   ko: '전철수',        color: '#a0b4d0', voice: 'male',   pitch: 0.9,  rate: 1.0 },
    merchant:     { name: 'The merchant',    ko: '상인',          color: '#c8e0a0', voice: 'male',   pitch: 1.05, rate: 1.1 }
  },
  speakers: {
    1: 'narrator narrator grownups grownups',
    2: 'prince pilot prince pilot prince prince prince prince prince prince pilot prince pilot prince pilot ' +
      'prince',
    3: 'prince pilot prince pilot prince prince pilot prince narrator pilot prince pilot prince pilot prince ' +
      'pilot prince prince',
    4: 'narrator narrator grownups narrator narrator grownups narrator narrator narrator',
    5: 'prince pilot prince prince prince prince pilot prince prince prince prince prince narrator',
    6: 'prince pilot prince pilot prince prince prince pilot',
    7: 'prince pilot prince pilot prince prince pilot prince prince pilot prince pilot prince prince prince ' +
      'prince pilot prince prince prince pilot',
    8: 'rose prince rose rose rose rose rose prince prince rose prince rose prince prince rose rose prince ' +
      'prince prince prince',
    9: 'prince prince prince rose rose rose rose prince rose prince rose rose',
    10: 'king prince king king king prince prince king king prince king king king king prince king prince ' +
      'prince king prince king prince prince king prince king king prince king prince king king prince king ' +
      'prince king king prince prince king king prince king prince king king prince prince king king prince ' +
      'prince king king prince prince king prince king',
    11: 'vainman prince prince vainman vainman prince vainman prince prince prince vainman prince vainman ' +
      'prince vainman prince prince',
    12: 'prince drinker prince drinker prince drinker prince drinker',
    13: 'prince prince businessman prince businessman prince businessman prince businessman prince ' +
      'businessman prince businessman prince businessman prince businessman prince businessman prince ' +
      'businessman prince businessman prince businessman prince businessman prince businessman prince ' +
      'businessman prince businessman prince businessman prince prince businessman businessman prince ' +
      'businessman prince businessman prince businessman prince prince',
    14: 'prince prince lamplighter lamplighter prince lamplighter prince lamplighter prince lamplighter ' +
      'lamplighter lamplighter prince lamplighter lamplighter prince lamplighter prince lamplighter ' +
      'lamplighter prince lamplighter prince lamplighter prince lamplighter lamplighter prince lamplighter ' +
      'lamplighter prince prince prince',
    15: 'geographer geographer prince prince geographer prince geographer prince prince prince geographer ' +
      'prince prince geographer prince geographer prince geographer geographer prince geographer prince ' +
      'geographer prince prince geographer prince geographer geographer geographer prince prince geographer ' +
      'prince geographer prince geographer prince geographer geographer prince prince geographer geographer ' +
      'prince geographer prince geographer prince prince prince geographer geographer',
    16: '',
    17: 'prince snake prince snake prince snake prince prince snake snake prince snake prince prince snake ' +
      'prince prince snake prince snake snake snake snake prince prince snake',
    18: 'prince desertflower prince desertflower prince desertflower',
    19: 'prince prince prince echo prince echo prince echo prince prince prince',
    20: 'prince roses prince roses prince prince prince prince',
    21: 'fox prince fox fox prince prince fox prince prince fox fox prince prince fox fox prince prince fox ' +
      'fox prince prince fox fox prince fox fox prince prince fox fox prince fox prince fox prince fox ' +
      'prince fox fox fox prince prince fox fox prince fox fox fox fox prince fox fox fox fox prince prince ' +
      'fox prince fox prince fox fox fox prince prince prince prince prince fox fox prince fox prince fox ' +
      'fox prince',
    22: 'switchman switchman prince prince switchman prince switchman switchman prince switchman prince ' +
      'switchman switchman prince prince switchman',
    23: 'prince merchant prince merchant merchant prince merchant prince prince',
    24: 'pilot pilot prince pilot prince pilot prince prince pilot prince prince pilot prince prince prince ' +
      'pilot pilot prince prince pilot pilot',
    25: 'prince prince prince pilot pilot prince prince pilot pilot prince prince prince prince pilot prince ' +
      'pilot prince prince pilot prince prince pilot prince pilot prince prince pilot prince prince pilot ' +
      'pilot narrator pilot pilot prince',
    26: 'prince prince prince prince prince prince prince pilot prince pilot prince prince prince pilot ' +
      'prince pilot prince pilot prince pilot prince pilot prince pilot prince pilot prince pilot prince ' +
      'pilot prince prince prince prince pilot prince pilot prince pilot prince prince prince prince prince ' +
      'prince prince prince prince prince',
    27: 'pilot pilot pilot pilot'
  }
};
