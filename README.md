# Morse Media

Next.js site for Bradley Morse's photography, print sales and creative services —
https://www.morsemedia.co

- **Launch / update steps:** see `LAUNCH.md`
- **Online store setup (Stripe + Prodigi):** see `STORE-SETUP.md`
- **Settings:** `.env.example` lists every environment variable

```bash
npm install
npm run dev       # http://localhost:3000
npm test
npm run verify    # type-check + production build
```

Requires Node.js 22+. Deploys to Vercel on every push to `main`.
