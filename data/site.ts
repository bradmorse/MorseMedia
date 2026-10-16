export type Orientation = 'portrait' | 'landscape';

export type Photo = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  collection: string;
  orientation: Orientation;
};

export type Collection = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  featured: string[];
};

export type Product = Photo & {
  id: string;
  type: string;
  price: number;
  description: string;
  location?: string;
  featured?: boolean;
};

export type PriceOption = { label: string; add: number };
export type FinishOption = PriceOption & { description: string; bestFor: string };

export const photos: Photo[] = [
  {
    slug: 'forest-current',
    title: 'Forest Current',
    image: '/images/photos/forest-current.webp',
    alt: 'Long-exposure waterfall flowing through moss-covered rocks in a shaded forest',
    collection: 'new-hampshire',
    orientation: 'portrait',
  },
  {
    slug: 'old-hill-window',
    title: 'Old Hill Window',
    image: '/images/photos/old-hill-window.webp',
    alt: 'Abandoned brick complex viewed through a dark wooden window frame',
    collection: 'forgotten-places',
    orientation: 'landscape',
  },
  {
    slug: 'after-hours-room',
    title: 'After Hours',
    image: '/images/photos/after-hours-room.webp',
    alt: 'Abandoned room with peeling walls and a bright window',
    collection: 'forgotten-places',
    orientation: 'portrait',
  },
  {
    slug: 'coastline-dusk',
    title: 'Coastline at Dusk',
    image: '/images/photos/coastline-dusk.webp',
    alt: 'Dark coastal inlet framed by out-of-focus evergreen branches',
    collection: 'maine-acadia',
    orientation: 'portrait',
  },
  {
    slug: 'granite-cascade',
    title: 'Granite Cascade',
    image: '/images/photos/granite-cascade.webp',
    alt: 'Water moving through a rocky forest cascade',
    collection: 'new-hampshire',
    orientation: 'portrait',
  },
  {
    slug: 'quiet-watch',
    title: 'Quiet Watch',
    image: '/images/photos/quiet-watch.webp',
    alt: 'Young buck standing between dark green leaves',
    collection: 'night-sky',
    orientation: 'portrait',
  },
  {
    slug: 'dry-falls',
    title: 'The Long Descent',
    image: '/images/photos/dry-falls.webp',
    alt: 'Tall rocky waterfall surrounded by dense summer forest',
    collection: 'new-hampshire',
    orientation: 'portrait',
  },
  {
    slug: 'road-to-old-hill',
    title: 'Road to Old Hill',
    image: '/images/photos/road-to-old-hill.webp',
    alt: 'Black and white view of an abandoned building beyond a discarded tire',
    collection: 'forgotten-places',
    orientation: 'landscape',
  },
  {
    slug: 'bass-harbor-light',
    title: 'Harbor Light',
    image: '/images/photos/bass-harbor-light.webp',
    alt: 'White lighthouse above a rugged rocky Maine shoreline',
    collection: 'maine-acadia',
    orientation: 'portrait',
  },
  {
    slug: 'full-moon-study',
    title: 'Moon Study I',
    image: '/images/photos/full-moon-study.webp',
    alt: 'Detailed full moon against a deep black star field',
    collection: 'night-sky',
    orientation: 'landscape',
  },
  {
    slug: 'abandoned-ward',
    title: 'The Ward',
    image: '/images/photos/abandoned-ward.webp',
    alt: 'Dark abandoned ward with peeling paint and old bed frames',
    collection: 'forgotten-places',
    orientation: 'landscape',
  },
  {
    slug: 'half-moon-study',
    title: 'Moon Study II',
    image: '/images/photos/half-moon-study.webp',
    alt: 'Half moon showing crater detail against a black night sky',
    collection: 'night-sky',
    orientation: 'landscape',
  },
  {
    slug: 'forgotten-house',
    title: 'The Forgotten House',
    image: '/images/photos/forgotten-house.webp',
    alt: 'Black and white abandoned brick house beneath dramatic clouds',
    collection: 'forgotten-places',
    orientation: 'landscape',
  },
  {
    slug: 'light-through-door',
    title: 'Light Through the Door',
    image: '/images/photos/light-through-door.webp',
    alt: 'A narrow beam of light entering a nearly black abandoned hallway',
    collection: 'forgotten-places',
    orientation: 'portrait',
  },
  {
    slug: 'old-hill-facade',
    title: 'Old Hill Facade',
    image: '/images/photos/old-hill-facade.webp',
    alt: 'Abandoned brick building behind tangled fallen branches',
    collection: 'forgotten-places',
    orientation: 'portrait',
  },
  {
    slug: 'autumn-overlook',
    title: 'Autumn Overlook',
    image: '/images/photos/autumn-overlook.webp',
    alt: 'Foggy autumn mountain valley with lakes viewed through pine branches',
    collection: 'adirondacks',
    orientation: 'landscape',
  },
  {
    slug: 'granite-run',
    title: 'Granite Run',
    image: '/images/photos/granite-run.webp',
    alt: 'Long-exposure river rapids flowing beneath a railroad trestle in early autumn',
    collection: 'new-hampshire',
    orientation: 'portrait',
  },
  {
    slug: 'mountain-veil',
    title: 'Mountain Veil',
    image: '/images/photos/mountain-veil.webp',
    alt: 'Autumn lake and mountains softened by low cloud and fog',
    collection: 'adirondacks',
    orientation: 'landscape',
  },
  {
    slug: 'storm-over-lake',
    title: 'Storm Over the Lake',
    image: '/images/photos/storm-over-lake.webp',
    alt: 'Expansive lake beneath layered dark storm clouds from a rocky summit',
    collection: 'new-hampshire',
    orientation: 'portrait',
  },
  {
    slug: 'high-coast-flight',
    title: 'High Coast Flight',
    image: '/images/photos/high-coast-flight.webp',
    alt: 'Bird gliding above a distant blue coastline and ocean',
    collection: 'maine-acadia',
    orientation: 'portrait',
  },
];

export const collections: Collection[] = [
  {
    slug: 'new-hampshire',
    name: 'New Hampshire',
    eyebrow: 'Rivers · Forests · Mountains',
    description: 'Granite, moving water and weather-shaped landscapes from across New Hampshire.',
    image: '/images/photos/granite-run.webp',
    featured: ['forest-current', 'granite-run', 'storm-over-lake', 'granite-cascade', 'dry-falls'],
  },
  {
    slug: 'maine-acadia',
    name: 'Maine / Acadia',
    eyebrow: 'Coast · Islands · Light',
    description: 'Quiet coastal scenes, rugged shoreline and changing light from Maine and Acadia.',
    image: '/images/photos/bass-harbor-light.webp',
    featured: ['bass-harbor-light', 'coastline-dusk', 'high-coast-flight'],
  },
  {
    slug: 'adirondacks',
    name: 'Adirondacks',
    eyebrow: 'Autumn · Fog · High Country',
    description: 'Layered mountain views and peak autumn color from the Adirondack landscape.',
    image: '/images/photos/autumn-overlook.webp',
    featured: ['autumn-overlook', 'mountain-veil'],
  },
  {
    slug: 'forgotten-places',
    name: 'Forgotten Places',
    eyebrow: 'Architecture · Decay · Memory',
    description: 'Atmospheric studies of abandoned interiors, weathered buildings and the traces people leave behind.',
    image: '/images/photos/old-hill-window.webp',
    featured: ['old-hill-window', 'after-hours-room', 'road-to-old-hill', 'abandoned-ward', 'forgotten-house', 'light-through-door', 'old-hill-facade'],
  },
  {
    slug: 'night-sky',
    name: 'Night Sky & Details',
    eyebrow: 'Moon · Wildlife · Stillness',
    description: 'Close observations of wildlife, moonlight and the small moments that interrupt a larger journey.',
    image: '/images/photos/full-moon-study.webp',
    featured: ['full-moon-study', 'half-moon-study', 'quiet-watch'],
  },
];

const productDetails: Record<string, Pick<Product, 'type' | 'price' | 'description' | 'location' | 'featured'>> = {
  'forest-current': {
    type: 'Fine Art Print', price: 89, location: 'New Hampshire', featured: true,
    description: 'A close study of water, moss and granite rendered with a soft, painterly current.',
  },
  'granite-run': {
    type: 'Fine Art Print', price: 95, location: 'New Hampshire', featured: true,
    description: 'Autumn color and a wooden trestle bridge frame a long exposure of the river below.',
  },
  'autumn-overlook': {
    type: 'Fine Art Print', price: 95, location: 'Adirondacks', featured: true,
    description: 'Fog settles over a wide autumn valley, revealing layers of lake, forest and mountain.',
  },
  'bass-harbor-light': {
    type: 'Fine Art Print', price: 95, location: 'Maine', featured: true,
    description: 'A low coastal perspective on a weathered lighthouse, rock and sea-worn vegetation.',
  },
  'quiet-watch': {
    type: 'Fine Art Print', price: 95, location: 'New England', featured: true,
    description: 'A young buck pauses in a dark screen of leaves, alert and nearly concealed.',
  },
  'old-hill-window': {
    type: 'Fine Art Print', price: 95, location: 'New Hampshire', featured: true,
    description: 'An abandoned complex seen through a weathered window, naturally framed by darkness.',
  },
  'after-hours-room': {
    type: 'Fine Art Print', price: 95, location: 'New England',
    description: 'Fading daylight enters an abandoned room where texture and decay become the subject.',
  },
  'full-moon-study': {
    type: 'Fine Art Print', price: 79, location: 'Night Sky',
    description: 'A detailed full moon isolated against a field of deep black and fine points of light.',
  },
  'storm-over-lake': {
    type: 'Fine Art Print', price: 95, location: 'New Hampshire',
    description: 'A storm front stretches across the lake, balancing dramatic sky with a wide granite foreground.',
  },
  'mountain-veil': {
    type: 'Fine Art Print', price: 95, location: 'Adirondacks',
    description: 'Autumn ridges recede into rain and mist, framed by the natural lines of pine branches.',
  },
  'coastline-dusk': {
    type: 'Fine Art Print', price: 89, location: 'Maine',
    description: 'A quiet blue-hour inlet, partially hidden behind dark foreground branches.',
  },
  'granite-cascade': {
    type: 'Fine Art Print', price: 89, location: 'New Hampshire',
    description: 'A vertical cascade cuts through dark granite and saturated moss in a dense forest.',
  },
  'dry-falls': {
    type: 'Fine Art Print', price: 89, location: 'New Hampshire',
    description: 'A narrow summer waterfall descends a broad granite face deep inside the forest.',
  },
  'road-to-old-hill': {
    type: 'Fine Art Print', price: 95, location: 'New Hampshire',
    description: 'A discarded tire and fractured roadway lead toward a forgotten institutional building.',
  },
  'abandoned-ward': {
    type: 'Fine Art Print', price: 95, location: 'New England',
    description: 'Peeling paint, empty bed frames and deep shadow preserve the stillness of an abandoned ward.',
  },
  'half-moon-study': {
    type: 'Fine Art Print', price: 79, location: 'Night Sky',
    description: 'The lunar terminator reveals a crisp field of craters across a half-lit moon.',
  },
  'forgotten-house': {
    type: 'Fine Art Print', price: 95, location: 'New Hampshire',
    description: 'A solitary brick residence stands beneath hard clouds and an open New England sky.',
  },
  'light-through-door': {
    type: 'Fine Art Print', price: 89, location: 'New England',
    description: 'A thin path of daylight divides an almost-black interior and points toward the exit.',
  },
  'old-hill-facade': {
    type: 'Fine Art Print', price: 95, location: 'New Hampshire',
    description: 'Fallen branches and tangled growth gather beneath the symmetrical facade of Old Hill.',
  },
  'high-coast-flight': {
    type: 'Fine Art Print', price: 79, location: 'Maine',
    description: 'A lone bird crosses open sky above the layered islands and coastline of Maine.',
  },
};

export const products: Product[] = photos.map((photo) => ({
  ...photo,
  id: photo.slug,
  ...productDetails[photo.slug],
}));

export const featuredProducts = products.filter((product) => product.featured).slice(0, 6);

export const finishOptions: FinishOption[] = [
  { label: 'Fine Art Paper', add: 0, description: 'Archival photographic paper with rich tonal detail and a refined, low-glare surface.', bestFor: 'Classic presentation and maximum detail' },
  { label: 'Canvas', add: 70, description: 'A gallery-wrapped surface that adds texture and arrives ready to hang.', bestFor: 'Warm rooms and relaxed interiors' },
  { label: 'Metal', add: 130, description: 'A sleek, luminous surface with strong contrast and exceptional durability.', bestFor: 'Water, color and contemporary spaces' },
  { label: 'Framed', add: 160, description: 'Fine-art paper presented behind glazing in a clean, ready-to-hang frame.', bestFor: 'A finished museum-style presentation' },
];

export function getSizeOptions(orientation: Orientation): PriceOption[] {
  return orientation === 'landscape'
    ? [
        { label: '8 × 12 in', add: 0 },
        { label: '12 × 18 in', add: 45 },
        { label: '20 × 30 in', add: 125 },
        { label: '24 × 36 in', add: 210 },
      ]
    : [
        { label: '8 × 10 in', add: 0 },
        { label: '12 × 16 in', add: 45 },
        { label: '18 × 24 in', add: 125 },
        { label: '24 × 32 in', add: 210 },
      ];
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getPhotosForCollection(slug: string) {
  return photos.filter((photo) => photo.collection === slug);
}

export function calculateUnitPrice(product: Product, sizeLabel: string, finishLabel: string) {
  const size = getSizeOptions(product.orientation).find((option) => option.label === sizeLabel);
  const finish = finishOptions.find((option) => option.label === finishLabel);
  if (!size || !finish) return null;
  return product.price + size.add + finish.add;
}

export function buildSku(productId: string, size: string, finish: string) {
  const clean = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `MM-${clean(productId)}-${clean(size)}-${clean(finish)}`;
}
