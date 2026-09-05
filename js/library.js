/* Library registry (kept outside books/ so that /books/<id> URLs never collide with a file). Each entry is a folder under books/<id>/ containing:
     scenes.js   (required)  window.LP_SCENES = [...chapters with scenes...]
     art.js      (optional)  window.LP_ART = { chapter(n) -> svg string, cover() -> svg string }
     text/*.txt  (optional)  the book text; ./start.sh embeds it as text/book.js (window.LP_BOOK)
     images/chapter-NN.jpg   (optional)  illustrations, detected at runtime
   See books/README.md for the scene data format. */
window.LP_LIBRARY = [
  {
    id: 'little-prince',
    color: '#2b3a75',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    chapters: 27,
    ko: '어린 왕자',
    level: 'Beginner – Intermediate',
    readOnly: true,
    dedication: { from: 'To Leon Werth' },   // shown on the title page, taken from the text file
    blurb: 'A pilot stranded in the Sahara meets a small visitor from asteroid B-612.',
    textNote: 'Reading edition only. The English translation is CC BY-NC-ND, so the text is shown exactly as published and there are no dialogue scenes. Saint-Exupéry\'s own drawings are still under copyright in the US, so the pictures here are original.',
    credits: {
      text: { what: 'English translation by Jeff McNeill (2019), shown unmodified', license: 'CC BY-NC-ND 4.0 — attribution, non-commercial, no derivatives', url: 'https://creativecommons.org/licenses/by-nc-nd/4.0/' },
      images: { what: 'Original SVG illustrations made for this site (2026)', license: 'Free to reuse; not the author\'s drawings, which are protected in the US until 2039', url: 'https://en.wikipedia.org/wiki/The_Little_Prince#Copyright' },
      original: { what: 'Original French text by Antoine de Saint-Exupéry (1943)', license: 'Public domain in Korea and the EU; protected in the US until 2039 and in France until 2032' }
    },
  },
  {
    id: 'wizard-of-oz',
    color: '#1f6b4a',
    title: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    year: 1900,
    chapters: 24,
    ko: '오즈의 마법사',
    level: 'Beginner',
    blurb: 'A cyclone carries Dorothy and Toto to the Land of Oz, where a Scarecrow, a Tin Woodman and a Lion join her on the yellow brick road.',
    textNote: 'Text and W. W. Denslow\'s illustrations are public domain worldwide. Project Gutenberg #55 (text) and #43936 (illustrated).',
    credits: {
      text: { what: 'Project Gutenberg eBook #55 (pg55.txt)', license: 'Public domain (L. Frank Baum d. 1919)', url: 'https://www.gutenberg.org/ebooks/55' },
      images: { what: 'Illustrations by W. W. Denslow (1900), from Project Gutenberg eBook #43936', license: 'Public domain (Denslow d. 1915)', url: 'https://www.gutenberg.org/ebooks/43936' }
    },
  },
  {
    id: 'alice-in-wonderland',
    color: '#7a2a3a',
    title: 'Alice\'s Adventures in Wonderland',
    author: 'Lewis Carroll',
    year: 1865,
    chapters: 12,
    ko: '이상한 나라의 앨리스',
    level: 'Intermediate',
    blurb: 'Alice follows a White Rabbit down a hole into a world of mad tea-parties, grinning cats and a Queen who shouts "Off with her head!"',
    textNote: 'Text and John Tenniel\'s illustrations are public domain worldwide. Project Gutenberg #11 (text with pictures) and #114 (illustrations).',
    credits: {
      text: { what: 'Project Gutenberg eBook #11 (pg11.txt)', license: 'Public domain (Lewis Carroll d. 1898)', url: 'https://www.gutenberg.org/ebooks/11' },
      images: { what: 'Illustrations by John Tenniel (1865), from Project Gutenberg eBooks #11 / #114', license: 'Public domain (Tenniel d. 1914)', url: 'https://www.gutenberg.org/ebooks/114' }
    },
  },
  {
    id: 'peter-rabbit',
    color: '#5f7a45',
    title: 'The Tales of Peter Rabbit and Friends',
    author: 'Beatrix Potter',
    year: 1902,
    chapters: 10,
    ko: '피터 래빗 이야기',
    level: 'Beginner',
    blurb: 'Ten little tales: a naughty rabbit in Mr. McGregor\'s garden, a cheeky squirrel, two bad mice, a duck who trusts a fox…',
    textNote: 'Text and Beatrix Potter\'s own pictures are public domain. One Project Gutenberg ebook per tale; see books/peter-rabbit/text/README.md.',
    credits: {
      text: { what: 'Project Gutenberg eBooks, one per tale (#14838, #14872, #14407, #45264, #15137, #15077, #14837, #14814, #14220, #17089)', license: 'Public domain (Beatrix Potter d. 1943; published 1902–1910)', url: 'https://www.gutenberg.org/ebooks/author/1978' },
      images: { what: 'Beatrix Potter\'s own illustrations, from the same Project Gutenberg eBooks', license: 'Public domain', url: 'https://www.gutenberg.org/ebooks/author/1978' }
    },
  },
  {
    id: 'grimms-fairy-tales',
    color: '#4a2a5a',
    title: 'Grimm\'s Fairy Tales',
    author: 'Jacob and Wilhelm Grimm',
    year: 1812,
    chapters: 12,
    ko: '그림 형제 동화집',
    level: 'Intermediate',
    blurb: 'Twelve tales: a witch\'s gingerbread house, a magic mirror, a frog at the door, and a little man whose name must be guessed.',
    textNote: 'Public-domain translation (Project Gutenberg #2591) and Arthur Rackham\'s 1909 illustrations. See books/grimms-fairy-tales/text/README.md.',
    credits: {
      text: { what: 'Project Gutenberg eBook #2591, Edgar Taylor & Marian Edwardes translation; 12 tales selected', license: 'Public domain', url: 'https://www.gutenberg.org/ebooks/2591' },
      images: { what: 'Illustrations by Arthur Rackham (1909), from Wikimedia Commons', license: 'Public domain (Rackham d. 1939)', url: 'https://commons.wikimedia.org/wiki/Category:Arthur_Rackham' }
    },
  },
  {
    id: 'peter-pan',
    color: '#2f5d7a',
    title: 'Peter and Wendy',
    author: 'J. M. Barrie',
    year: 1911,
    chapters: 17,
    ko: '피터 팬',
    level: 'Intermediate',
    blurb: 'A boy who would not grow up flies in at the nursery window, and Wendy, John and Michael follow him to the Neverland of lost boys, pirates and one ticking crocodile.',
    textNote: 'Text and F. D. Bedford\'s illustrations are public domain worldwide. Project Gutenberg #26654.',
    credits: {
      text: { what: 'Project Gutenberg eBook #26654 (pg26654.txt)', license: 'Public domain (J. M. Barrie d. 1937; published 1911)', url: 'https://www.gutenberg.org/ebooks/26654' },
      images: { what: 'Illustrations by F. D. Bedford (1911), from Project Gutenberg eBook #26654', license: 'Public domain (Bedford d. 1954)', url: 'https://www.gutenberg.org/ebooks/26654' }
    },
  },
  {
    id: 'red-raincoat',
    color: '#b8352f',
    title: 'The Red Raincoat',
    author: 'Kiran Kasturia',
    year: 2015,
    chapters: 9,
    ko: '빨간 비옷',
    level: 'Beginner (StoryWeaver Level 1)',
    blurb: 'Manu has a new raincoat. He can\'t wait to wear it, but the rain makes him wait... and wait... and wait.',
    textNote: 'A modern picture book released under CC BY 4.0 by Pratham Books on StoryWeaver, the most-read English title there. One page per chapter; the text is unchanged.',
    credits: {
      text: { what: 'The Red Raincoat, written by Kiran Kasturia, © Pratham Books 2015, from StoryWeaver', license: 'CC BY 4.0 — split into one page per chapter, text unchanged', url: 'https://storyweaver.org.in/en/stories/369-the-red-raincoat' },
      images: { what: 'Illustrations by Zainab Tambawalla, © Pratham Books 2015, from StoryWeaver', license: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' }
    },
  }
];
