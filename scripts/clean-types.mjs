// Removes Next.js's generated route types before type-checking, so a deleted page
// (for example app/gift-cards) does not leave a stale reference behind in .next/types.
import { rmSync } from 'node:fs';

for (const dir of ['.next/types', '.next/dev/types']) rmSync(dir, { recursive: true, force: true });
