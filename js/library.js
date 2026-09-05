/* Library registry (kept outside books/ so that /books/<id> URLs never collide with a file). Each entry is a folder under books/<id>/ containing:
     scenes.js   (required)  window.LP_SCENES = [...chapters with scenes...]
     art.js      (optional)  window.LP_ART = { chapter(n) -> svg string, cover() -> svg string }
     text/*.txt  (optional)  the book text; ./start.sh embeds it as text/book.js (window.LP_BOOK)
     images/chapter-NN.jpg   (optional)  illustrations, detected at runtime
   See books/README.md for the scene data format. */
window.LP_LIBRARY = [
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
  }
];
