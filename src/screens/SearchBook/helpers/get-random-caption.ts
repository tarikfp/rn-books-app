export const captions = [
  'Unlock Worlds with Stories',
  'Explore, Imagine, Repeat',
  'Books: Your Next Adventure',
  'Discover New Realms',
  'Words Paint a Thousand Worlds',
  'Find Your Perfect Escape',
  'Journey Through Unwritten Pages',
  'Curiosity Unleashed',
  'Empower Your Mind with Reading',
  'Gateway to Literary Exploration',
];

export function getRandomCaption() {
  const randomIndex = Math.floor(Math.random() * captions.length);
  return captions[randomIndex];
}
