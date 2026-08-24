# Morse Media — Windows Quick Start

This package is the latest complete Morse Media website build and has been cleaned for Windows/npm use.

## 1. Extract the ZIP

Right-click the ZIP in File Explorer and choose **Extract All**.

## 2. Open in VS Code

Open VS Code, choose **File > Open Folder**, and select the extracted `morse-media-nextjs-services-complete` folder.

## 3. Open the VS Code terminal

Choose **Terminal > New Terminal**. PowerShell is fine.

## 4. Install dependencies

Run:

```powershell
npm install
```

## 5. Launch locally

Run:

```powershell
npm run dev
```

Then open `http://localhost:3000`.

Useful pages:

- `/services`
- `/portfolio`
- `/shop`
- `/contact`

## 6. Publish updates

After checking the site locally:

```powershell
git add .
git commit -m "Update Morse Media website"
git push
```

Vercel should deploy automatically if the repo is connected.

## Environment variables

Copy `.env.example` to `.env.local` for local development and enter your own values. Never commit live Stripe secret keys or webhook secrets to GitHub. Keep production secrets in Vercel Environment Variables.
