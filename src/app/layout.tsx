import type { Metadata } from "next";
import { Crimson_Pro, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  weight: ["300", "400"],
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.s0shaheen.com"),
  title: {
    default: "Salman Shaheen",
    template: "%s · Salman Shaheen",
  },
  description:
    "Product manager building platforms that move money and solve problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${crimsonPro.variable} ${workSans.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
