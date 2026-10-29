// Where Morse Media is based and who it serves. Every page that mentions the location reads from here,
// so a future move only needs this file (plus data/areas.ts) to change.

export const business = {
  name: 'Morse Media',
  owner: 'Bradley Morse',
  email: 'hello@morsemedia.co',
  city: 'Nashville',
  state: 'Tennessee',
  stateCode: 'TN',
  region: 'Middle Tennessee',
  /** Short line for eyebrows and footers, e.g. "Nashville, Tennessee". */
  base: 'Nashville, Tennessee',
  /** Shorter form for tight spaces, e.g. "Nashville, TN". */
  baseShort: 'Nashville, TN',
  counties: ['Davidson', 'Williamson', 'Rutherford', 'Sumner', 'Wilson'],
  /** Cities named in structured data (search engines) as the service area. */
  serviceCities: ['Nashville', 'Franklin', 'Brentwood', 'Murfreesboro', 'Hendersonville', 'Mt. Juliet', 'Gallatin', 'Smyrna', 'Lebanon', 'Spring Hill'],
} as const;

/** schema.org areaServed list: the base city, the wider region and nearby cities. */
export function areaServedSchema() {
  return [
    { '@type': 'City', name: `${business.city}, ${business.stateCode}` },
    { '@type': 'AdministrativeArea', name: business.region },
    ...business.serviceCities.filter((city) => city !== business.city).map((city) => ({ '@type': 'City', name: `${city}, ${business.stateCode}` })),
  ];
}
