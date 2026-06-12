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

export const metadata: Metadata = {
  title: "Ayush Deuja | Full Stack Developer",
  description:
    "Portfolio of Ayush Deuja — Full Stack Developer from Biratnagar, Nepal. Building scalable APIs, web and mobile applications with NestJS, Next.js, React Native and .NET.",
  keywords: [
    "Ayush Deuja",
    "Full Stack Developer",
    "NestJS",
    "Next.js",
    "React Native",
    "Biratnagar",
    "Nepal",
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
