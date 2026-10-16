// Content for the realtor landing page at /real-estate.
// Before/after pairs appear only once you add them. Put the images in public/images/real-estate/.

export type Comparison = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption: string; // e.g. 'Living room — window and exposure blending'
};

export const comparisons: Comparison[] = [
  // {
  //   before: { src: '/images/real-estate/living-before.jpg', alt: 'Living room straight out of the camera, windows blown out' },
  //   after: { src: '/images/real-estate/living-after.jpg', alt: 'Same living room with balanced window views and true colors' },
  //   caption: 'Living room — window and exposure blending',
  // },
];

export type AddOn = { name: string; description: string; price?: string };

export const addOns: AddOn[] = [
  { name: 'Twilight exteriors', description: 'The front of the home at dusk with interior lights on — the image that stops the scroll on listing sites.' },
  { name: 'Detail & lifestyle shots', description: 'Finishes, fixtures, views and the small touches that make a property feel lived-in.' },
  { name: 'Larger homes', description: 'Coverage for homes over 2,500 sq ft, outbuildings or acreage, quoted to the property.' },
];

export const prepChecklist: { area: string; items: string[] }[] = [
  { area: 'Throughout', items: ['Turn on every light and replace dead bulbs', 'Open blinds and curtains evenly', 'Turn off ceiling fans and TVs', 'Hide cords, remotes and personal photos'] },
  { area: 'Kitchen & baths', items: ['Clear counters except one or two decor pieces', 'Put away dish soap, sponges and towels', 'Close toilet lids and shower curtains'] },
  { area: 'Bedrooms & living', items: ['Make beds neatly', 'Remove clutter from floors and nightstands', 'Square up furniture and cushions'] },
  { area: 'Outside', items: ['Move cars out of the driveway', 'Put away bins, hoses and toys', 'Mow and sweep walkways if you can'] },
];

export const faqs: { question: string; answer: string }[] = [
  { question: 'How quickly are photos delivered?', answer: 'Standard delivery is within 48 hours of the shoot. If a listing deadline is tighter, mention it when you book and faster turnaround will be confirmed if the schedule allows.' },
  { question: 'What sizes do the files come in?', answer: 'Every listing comes with MLS-ready files and larger web versions for the brokerage site, social media and print flyers.' },
  { question: 'How long does a shoot take?', answer: 'Most homes up to 2,500 sq ft take about one to two hours on site. Larger homes, outbuildings and add-ons take longer, and the time is confirmed when you book.' },
  { question: 'Can the homeowner be there?', answer: 'Yes. Many sellers prefer to be out during the shoot so rooms stay clear, but it is entirely up to them.' },
  { question: 'What happens if the weather is bad?', answer: 'Interiors can go ahead in most weather. If exteriors or twilight images need a better sky, a return visit or rescheduling is agreed with you in advance.' },
  { question: 'Can I use the photos after the listing sells?', answer: 'Photos are licensed for marketing the listing. If you want to use them for your own portfolio or advertising afterwards, just ask — it is usually straightforward to arrange.' },
  { question: 'Do you work with agents on a regular basis?', answer: 'Yes. If you list homes regularly, ask about scheduling and pricing for ongoing work.' },
];
