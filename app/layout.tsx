import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const BASE_URL = "https://ayushdeuja.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Ayush Deuja | Full Stack Developer — Biratnagar, Nepal",
    template: "%s | Ayush Deuja",
  },
  description:
    "Ayush Deuja is a Full Stack Developer and Tech Mentor from Biratnagar, Nepal. He specialises in NestJS, Next.js, React Native and .NET — building scalable web and mobile applications at CloveIT.",
  keywords: [
    // From the user's request
    "aspiring web developer",
    "best web developer of nepal",
    "best web developer of biratnagar",
    "ayush",
    "ayush deuja",
    "software engineer",
    "software developer",
    "mobile app developer",
    "number 1 developer of nepal",
    "full stack developer ayush",
    "full stack developer",
    // Additional portfolio-relevant terms
    "Ayush Deuja portfolio",
    "full stack developer nepal",
    "full stack developer biratnagar",
    "web developer biratnagar",
    "NestJS developer nepal",
    "Next.js developer nepal",
    "React Native developer nepal",
    ".NET developer nepal",
    "MERN stack developer nepal",
    "CloveIT developer",
    "tech mentor biratnagar",
    "junior software developer nepal",
    "backend developer nepal",
    "API developer nepal",
    "PostgreSQL developer nepal",
    "MongoDB developer",
    "React developer nepal",
    "Node.js developer nepal",
    "JavaScript developer nepal",
    "TypeScript developer nepal",
  ],
  authors: [{ name: "Ayush Deuja", url: BASE_URL }],
  creator: "Ayush Deuja",
  publisher: "Ayush Deuja",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Ayush Deuja",
    title: "Ayush Deuja | Full Stack Developer — Biratnagar, Nepal",
    description:
      "Full Stack Developer and Tech Mentor from Biratnagar, Nepal. Building scalable web and mobile applications with NestJS, Next.js, React Native and .NET.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ayush Deuja — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Deuja | Full Stack Developer — Biratnagar, Nepal",
    description:
      "Full Stack Developer and Tech Mentor from Biratnagar, Nepal. Building scalable web and mobile applications with NestJS, Next.js, React Native and .NET.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ayush Deuja",
  url: BASE_URL,
  email: "ayushdeuja11@gmail.com",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer and Tech Mentor from Biratnagar, Nepal. Specialises in NestJS, Next.js, React Native and .NET.",
  worksFor: {
    "@type": "Organization",
    name: "CloveIT",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Biratnagar",
      addressCountry: "NP",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Biratnagar",
    addressCountry: "NP",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Tribhuvan University",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
    },
  },
  knowsAbout: [
    "NestJS",
    "Next.js",
    "React",
    "React Native",
    "Node.js",
    "Express.js",
    ".NET",
    "C#",
    "PostgreSQL",
    "MongoDB",
    "TypeScript",
    "JavaScript",
    "Full Stack Development",
    "Mobile App Development",
    "REST API Design",
  ],
  sameAs: [
    "https://github.com/AyushDeuja",
    "https://www.linkedin.com/in/ayushdeuja",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
