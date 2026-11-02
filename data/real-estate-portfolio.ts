// Real estate portfolio at /portfolio/real-estate, previewed on /portfolio and /real-estate.
// Each listing is one shoot, shown in the order an agent would post it: exteriors first, then outdoor
// living, then the interior walkthrough. Put photos in public/images/real-estate/<listing-slug>/
// (2048 px wide WebP) and list them here in display order.
//
// Keep addresses and homeowner names off the site unless the agent and seller have agreed.

export type ListingGroup = 'Exterior' | 'Outdoor living' | 'Interior';

export type ListingPhoto = {
  src: string;
  alt: string;
  caption: string;
  group: ListingGroup;
  width: number;
  height: number;
};

export type Listing = {
  slug: string;
  title: string;
  location?: string; // optional, only with permission
  summary: string;
  preview?: number[]; // photo numbers shown beside the lead photo on preview cards (default 2, 3, 4)
  photos: ListingPhoto[];
};

export const listingGroups: ListingGroup[] = ['Exterior', 'Outdoor living', 'Interior'];

const barn = (file: string, caption: string, group: ListingGroup, alt: string, height = 1365): ListingPhoto => ({
  src: `/images/real-estate/barn-home/${file}.webp`,
  alt,
  caption,
  group,
  width: 2048,
  height,
});

export const listings: Listing[] = [
  {
    slug: 'barn-home',
    title: 'Barn-style home in the woods',
    summary: 'A complete listing shoot: exteriors and grounds, outdoor living spaces and a room-by-room interior walkthrough.',
    preview: [8, 17, 18],
    photos: [
      barn('01-exterior-front', 'Front of the home', 'Exterior', 'Front of a barn-style home with a full-length covered porch, dark shingle roof and a wide lawn, framed by tall pines'),
      barn('02-exterior-pond-view', 'View across the pond', 'Exterior', 'The home seen across a still pond, above a granite boulder wall, with fall color in the surrounding woods'),
      barn('03-exterior-front-corner', 'Front corner', 'Exterior', 'Weathered rough-sawn siding and the covered porch in late-afternoon sun, seen from the gravel driveway'),
      barn('04-exterior-side', 'Side of the home', 'Exterior', 'Gable end of the home with a large picture window, warm wood siding and a timber pavilion beside it'),
      barn('05-exterior-back-corner', 'Back corner', 'Exterior', 'Back corner of the home with a shed dormer, a side entry and a row of arborvitae along the lawn'),
      barn('06-exterior-back-pool', 'Back of the home', 'Exterior', 'Back of the home with an above-ground pool, French doors and a pavilion on the patio'),
      barn('07-exterior-side-entry', 'Driveway side', 'Exterior', 'Driveway side of the home with a side door, a board privacy fence and the end of the covered porch'),
      barn('08-outdoor-pavilion', 'Patio pavilion', 'Outdoor living', 'Timber pavilion with string lights over a patio dining area beside the French doors', 1153),
      barn('09-outdoor-grill', 'Covered grill station', 'Outdoor living', 'Covered outdoor kitchen with a built-in stainless steel grill set in a fieldstone surround'),
      barn('10-outdoor-fireplace', 'Outdoor fireplace', 'Outdoor living', 'Freestanding fieldstone fireplace with a granite mantel on the patio, woods behind'),
      barn('11-outdoor-pool-deck', 'Pool deck', 'Outdoor living', 'Pool deck with green turf, wood railings and a safety gate beside the above-ground pool'),
      barn('12-entry-to-dining', 'Entry', 'Interior', 'View from the entry across hardwood floors to the dining area and family room, with a blue sideboard on the left'),
      barn('13-front-hall', 'Hallway', 'Interior', 'Hallway with a painted blue sideboard, a plum accent wall and a glass-front cabinet leading to the back of the house', 1153),
      barn('14-dining-room', 'Dining room', 'Interior', 'Dining room with a long wood table and Edison-bulb chandelier, open to a sitting area under a vaulted ceiling'),
      barn('15-dining-to-living', 'Dining to living room', 'Interior', 'Dining table under the chandelier, looking toward the living room, front door and staircase'),
      barn('16-hall-to-kitchen', 'Into the kitchen', 'Interior', 'View past the dining table into the kitchen, beside a granite-topped half wall and French doors to the patio'),
      barn('17-kitchen', 'Kitchen', 'Interior', 'Kitchen with maple cabinets, a butcher-block island with two stools, a gas range and a copper-and-teal backsplash'),
      barn('18-family-room', 'Family room', 'Interior', 'Family room under a vaulted ceiling with exposed beams, a fireplace, a high gable window and a dog on the rug'),
      barn('19-bathroom', 'Bathroom', 'Interior', 'Bathroom with a cherry vanity, black countertop, candle sconce and a wood-trimmed window'),
      barn('20-stairs', 'Staircase', 'Interior', 'Carpeted staircase with a natural wood railing leading to the second floor'),
      barn('21-upstairs-hall', 'Upstairs landing', 'Interior', 'Upstairs landing with a wood railing, tall house plants and windows looking out over the property'),
      barn('22-primary-bedroom', 'Primary bedroom', 'Interior', 'Bedroom with warm rust walls, a sleigh bed, matching lamps and a large floral print above the bed'),
      barn('23-primary-bedroom-2', 'Primary bedroom', 'Interior', 'Bedroom with plum walls, a wide curtained window, house plants and a glass-front cabinet'),
      barn('24-guest-bedroom', 'Guest bedroom', 'Interior', 'Bedroom with a floral quilt, a window onto the woods and a large vintage forest print'),
    ],
  },
];

/** "Exterior 01–07 · Outdoor living 08–11 · Interior 12–24" style ranges, in display order. */
export function groupRanges(listing: Listing) {
  return listingGroups
    .map((group) => {
      const numbers = listing.photos.flatMap((photo, index) => (photo.group === group ? [index + 1] : []));
      return numbers.length ? { group, first: numbers[0], last: numbers[numbers.length - 1], count: numbers.length } : null;
    })
    .filter((range): range is { group: ListingGroup; first: number; last: number; count: number } => range !== null);
}

/** The lead photo plus up to three others for preview cards. */
export function previewPhotos(listing: Listing) {
  const numbers = listing.preview?.length ? listing.preview : [2, 3, 4];
  const extras = numbers.map((n) => listing.photos[n - 1]).filter((photo): photo is ListingPhoto => photo !== undefined).slice(0, 3);
  return { lead: listing.photos[0], extras };
}
