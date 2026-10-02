/* The Little Prince film — the timed script. js/narration.js turns the book text into steps (the same steps the
   audiobook plays, so both use the recordings in film/audio/); this adds the film's own call.
   Every paragraph of text/the-little-prince.txt is kept: narration is spoken by the narrator (the pilot telling
   the story), and each "double-quoted" span is spoken by the speaker listed for it in cast.js, in order.
   A quote listed as 'narrator' (a book title, a number, a thought told by the pilot) stays in the narration.
   Load after js/narration.js and js/library.js (the book's `listen` settings shape the title and chapter cards). */
window.LP_FILM_SCRIPT = (function () {
  const N = window.LP_NARRATION;
  const BOOK = (window.LP_LIBRARY || []).find(b => b.id === 'little-prince') || { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', listen: { frontTitle: true, cardTitle: false, end: '27-1' } };
  /* The whole film as a list of steps: title and dedication, then for each chapter a card, its pictures and every
     subtitle-sized line. A step is { kind: 'title'|'card'|'picture'|'line'|'end', img, ch, para, who?, text?, say? }. */
  const timeline = (parsed, speakers, picture, scenes) => N.forBook(BOOK, parsed, scenes, { speakers }, picture);
  return Object.assign({}, N, { timeline });
})();
