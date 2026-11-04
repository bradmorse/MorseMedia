// The seller checklist at /real-estate/listing-photo-checklist: how to get a home ready for listing photos
// and video. Agents forward it to homeowners, and it answers a common search ("how to prepare a house for
// listing photos"). The short version on /real-estate comes from prepChecklist in data/real-estate.ts.

export const listingPrepPage = {
  path: '/real-estate/listing-photo-checklist',
  title: 'How to Prepare a Home for Listing Photos',
  description: 'A room-by-room checklist for getting a home ready for real estate photos and video: the day before, the morning of the shoot and what to leave alone.',
  published: '2026-11-04',
  updated: '2026-11-04',
};

export type PrepGroup = { title: string; intro?: string; items: string[] };

/** What to do ahead of time, then on the day. */
export const prepTimeline: PrepGroup[] = [
  {
    title: 'The day before',
    intro: 'Most of the work, and the part that shows most in the photos.',
    items: [
      'Clean windows, mirrors and glass doors — streaks and fingerprints show up on camera',
      'Replace burned-out bulbs, and match bulb colors within each room where you can',
      'Put away about half of what sits on counters, shelves and tables',
      'Take family photos, mail, medication and anything with your name or address out of view',
      'Mow, edge and sweep the porch, walkways and driveway',
      'Pick one closet, the garage or the car for everything that has to disappear on the day',
    ],
  },
  {
    title: 'The morning of the shoot',
    intro: 'About 30 minutes, just before the photographer arrives.',
    items: [
      'Turn on every light: ceiling lights, lamps, under-cabinet and porch lights',
      'Open blinds and curtains, all to the same height',
      'Turn off ceiling fans, TVs and screens',
      'Move cars out of the driveway and away from the front of the house',
      'Make beds, fluff pillows and close toilet lids',
      'Put pet beds, bowls and toys away, and arrange for pets to be out or settled in one place',
    ],
  },
];

/** Room by room. */
export const prepRooms: PrepGroup[] = [
  {
    title: 'Kitchen',
    items: [
      'Clear the counters except one or two pieces, like a bowl of fruit or a cutting board',
      'Put away dish soap, sponges, towels and small appliances you don’t use every day',
      'Clear magnets, papers and photos off the fridge',
      'Empty the sink and hide trash and recycling bins',
    ],
  },
  {
    title: 'Living & dining',
    items: [
      'Square up furniture and straighten rugs',
      'Put away remotes, game controllers, chargers and loose cords',
      'Straighten cushions and throws',
      'Leave the dining table clear, or set it simply with one centerpiece',
    ],
  },
  {
    title: 'Bedrooms',
    items: [
      'Make the beds smooth and neat — light, plain bedding photographs best',
      'Clear nightstands down to a lamp and one item',
      'Put away clothes, shoes and laundry baskets',
      'Close closet doors',
    ],
  },
  {
    title: 'Bathrooms',
    items: [
      'Clear the counter, tub and shower ledges of toiletries',
      'Hang one set of matching, fresh towels — or none',
      'Remove bath mats, scales, plungers and trash cans',
      'Close the toilet lid and pull the shower curtain straight',
    ],
  },
  {
    title: 'Outside',
    items: [
      'Put away hoses, bins, tools and toys',
      'Take covers off the grill and patio furniture, and set furniture out as you would use it',
      'Clean the pool and take out cleaners and hoses',
      'Turn on porch and landscape lights if twilight photos are booked',
    ],
  },
  {
    title: 'If video is booked',
    items: [
      'Video moves through the house, so hallways and the spaces between rooms need the same tidy-up',
      'Leave interior doors open or closed the same way throughout',
      'Plan to be out, or in one spot out of view, for the one to two hours on site',
    ],
  },
];

/** Things the seller doesn’t need to worry about (all covered by the listing packages). */
export const prepLeaveToMe: { title: string; text: string }[] = [
  { title: 'Bright windows, dark rooms', text: 'Window views and interiors are balanced when the photos are edited, so you don’t need to rearrange lighting.' },
  { title: 'Color', text: 'Every delivered photo is edited and color-corrected by hand.' },
  { title: 'The weather', text: 'Interiors go ahead in most weather. If exteriors need a better sky, a return visit or new date is agreed in advance.' },
  { title: 'Things you can’t fix in time', text: 'A worn carpet or a dated fixture? Mention it when you book, and the angles are planned around it.' },
];
