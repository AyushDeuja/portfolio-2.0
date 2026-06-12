# Ayush Deuja — Portfolio

Personal portfolio built with **Next.js 15**, **Tailwind CSS v4**, **Framer Motion**, **Three.js (React Three Fiber)** and a **Nodemailer**-powered contact form.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact Form Setup (Nodemailer)

1. Copy `.env.example` to `.env.local`
2. Fill in your SMTP credentials. For Gmail:
   - Enable 2-Step Verification on your Google account
   - Create an **App Password** at https://myaccount.google.com/apppasswords
   - Use that app password as `SMTP_PASS`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

## Customizing

- **All content** (skills, experience, projects, links) lives in [`lib/data.ts`](lib/data.ts) — update project GitHub URLs and add `live` URLs there.
- **Profile photo**: replace `public/profile-placeholder.svg` and update the `src` in [`components/About.tsx`](components/About.tsx).
- **Social links / email**: edit `siteConfig` in [`lib/data.ts`](lib/data.ts).

## Tech Stack

| Layer      | Tech                                   |
| ---------- | -------------------------------------- |
| Framework  | Next.js 15 (App Router, TypeScript)    |
| Styling    | Tailwind CSS v4                        |
| Animations | Framer Motion                          |
| 3D         | Three.js via @react-three/fiber + drei |
| Email      | Nodemailer (API route `/api/contact`)  |
