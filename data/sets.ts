// Curated print sets: photographs chosen to hang together.
// Order every piece in a set (any sizes and finishes) and the whole set is discounted at checkout.
// A photograph can belong to only one set.

export const SET_DISCOUNT_PERCENT = 10;

export type PrintSet = {
  slug: string;
  name: string;
  description: string;
  pieces: string[]; // product slugs
  hangingNote: string;
};

export const printSets: PrintSet[] = [
  {
    slug: 'granite-and-water',
    name: 'Granite & Water',
    description: 'Three New Hampshire waterfalls in matching portrait frames — moss, stone and moving water.',
    pieces: ['forest-current', 'granite-cascade', 'dry-falls'],
    hangingNote: 'Hang in a row with 2–3 inches between frames, or stack vertically in a narrow hallway.',
  },
  {
    slug: 'old-hill',
    name: 'Old Hill',
    description: 'A three-part study of one forgotten institution, from the road in to the window out.',
    pieces: ['road-to-old-hill', 'old-hill-window', 'forgotten-house'],
    hangingNote: 'Works as a horizontal row over a sofa or desk; the black-and-white pieces sit well at either end.',
  },
  {
    slug: 'maine-coast',
    name: 'Maine Coast',
    description: 'Lighthouse, blue-hour inlet and open sky — the Maine shoreline in three portrait frames.',
    pieces: ['bass-harbor-light', 'coastline-dusk', 'high-coast-flight'],
    hangingNote: 'Put the lighthouse in the center for a balanced row.',
  },
  {
    slug: 'adirondack-autumn',
    name: 'Adirondack Autumn',
    description: 'Fog, color and layered ridgelines in a matching landscape pair.',
    pieces: ['autumn-overlook', 'mountain-veil'],
    hangingNote: 'A natural pair side by side, or one above the other on a tall wall.',
  },
  {
    slug: 'moon-studies',
    name: 'Moon Studies',
    description: 'The full and half moon, made to be hung together.',
    pieces: ['full-moon-study', 'half-moon-study'],
    hangingNote: 'Hang side by side at the same size so the craters line up across the pair.',
  },
];
