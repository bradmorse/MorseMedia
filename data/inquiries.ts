import { PRINT_SHOP_ENABLED } from './features';

// Project types offered in the contact form. Service pages and packages pre-select one of these,
// so a name changed here must also change in data/services.ts and data/proof.ts (the tests check).
export const PRINT_INQUIRY = 'Print or order question';
export const DEFAULT_INQUIRY = 'Photo + video project';

const allProjectTypes = [
  PRINT_INQUIRY,
  'Photography',
  'Headshots & team portraits',
  'Event coverage',
  'Video production',
  'Real estate photo & video',
  'Monthly photo & video content',
  'Photo + video project',
  'Image licensing',
];

/** Print questions only appear while the print shop is live (see data/features.ts). */
export const projectTypes = PRINT_SHOP_ENABLED ? allProjectTypes : allProjectTypes.filter((type) => type !== PRINT_INQUIRY);

/** The option a blank contact form opens on. */
export const defaultProjectType = PRINT_SHOP_ENABLED ? PRINT_INQUIRY : DEFAULT_INQUIRY;
