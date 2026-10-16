// Pixel size of each full-resolution PRINT MASTER — the file the lab prints from, never the website copy.
// A print size goes on sale only when its master has enough pixels for it (see lib/print-quality.ts).
//
// To fill this in: export your masters into one folder named after each photo
// (for example `forest-current.jpg`), then run:
//   npm run masters:check -- "C:\path\to\your\masters"
// and paste the lines it prints below.

export type PrintMaster = { width: number; height: number };

export const printMasters: Record<string, PrintMaster> = {
  // 'forest-current': { width: 6336, height: 7920 },
};
