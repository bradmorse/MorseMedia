// Real proof only. Each list stays empty until you add genuine entries, and the matching
// section on the Services page stays hidden until then. Never add invented quotes or prices.

export type Testimonial = { quote: string; name: string; role?: string };

export type ServicePackage = {
  name: string;
  startingAt?: string; // e.g. "From $450". Leave out to show "Custom quote".
  description: string;
  includes: string[];
};

export const testimonials: Testimonial[] = [
  // { quote: 'Short, real quote from a client.', name: 'Client Name', role: 'Business or role' },
];

export const servicePackages: ServicePackage[] = [
  // { name: 'Brand photo session', startingAt: 'From $450', description: 'Half-day session.', includes: ['Shot list', '20 edited images'] },
];
