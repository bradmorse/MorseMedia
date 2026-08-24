# Start Here — Updated Morse Media Website

## Open this refined version

1. In the Terminal running the previous version, press **Control + C**.
2. Download and unzip `morse-media-nextjs-refined.zip`.
3. In Terminal type `cd ` with a space after it.
4. Drag the unzipped folder into Terminal and press Return.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open `http://localhost:3000` in Chrome.

## Confirm that everything builds

Stop the development server with **Control + C**, then run:

```bash
npm run verify
```

A successful result ends with a completed Next.js production build.

## Activate test payments

```bash
cp .env.example .env.local
open -e .env.local
```

Add Stripe test keys, save, and restart:

```bash
npm run dev
```

## Still required before accepting real orders

- Stripe live-mode keys
- A real shipping rate
- Tax configuration, if applicable
- Stripe webhook secret
- A final Printique fulfillment method or approved automation endpoint
- Review of final business, shipping, privacy and return policies
- Confirm that `hello@morsemedia.co` is active or replace it throughout the project
