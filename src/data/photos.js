// Lifestyle photography used across the site. All images are free-license
// (Unsplash / Pexels) and self-hosted in /public/images. Sources: public/images/CREDITS.md

const img = (name) => `/images/${name}.jpg`;

export const PHOTOS = {
  hero: {
    src: img('charizard-hand-dark'),
    alt: 'Hand holding a Base Set Charizard holo in a magnetic case',
  },
  heroAlt: {
    src: img('holo-trio-dark'),
    alt: 'Three holographic Pokémon cards on a black surface',
  },
  showFloor: {
    src: img('card-show-floor'),
    alt: 'A busy card show floor full of collectors browsing tables',
  },
  playTable: { src: img('play-table'), alt: 'Two players trading cards across a table' },
  slabs: { src: img('slabs-teal'), alt: 'A hand fanning graded cards in protective cases' },
  slabsBw: { src: img('slabs-bw'), alt: 'Graded cards in cases, black and white' },
  charizardSlabs: {
    src: img('charizard-slabs'),
    alt: 'Two modern Charizard cards in magnetic holders',
  },
  handHolos: { src: img('hand-holos'), alt: 'A hand holding a spread of fresh holo pulls' },
  vintagePile: { src: img('vintage-pokemon-pile'), alt: 'A pile of vintage Pokémon cards' },
  sportsPile: { src: img('sports-pile'), alt: 'A pile of football and baseball cards' },
  hockeyWall: { src: img('hockey-wall'), alt: 'A wall of vintage hockey cards in sleeves' },
  hoops: { src: img('hoops-magnetic'), alt: 'Basketball rookie cards in magnetic cases' },
  cardBacks: { src: img('card-backs'), alt: 'A field of Pokémon card backs' },
};

export const photoFor = (name) => (name ? img(name) : null);
