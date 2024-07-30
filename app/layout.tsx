import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://challenge-schedule.vercel.app/'),
  title: "Challenge - Chrestia Luis",
  description: "Schedule for appointment",
  keywords: "schedule, agenda, calendar, calendario, appointment, citas, meet",
  openGraph: {
      type: 'website',
      url: 'https://challenge-schedule.vercel.app/',
      title: "Challenge - Chrestia Luis",
      description: "Schedule for appointment",    
      images: [
          {
              url: 'http://localhost:3000/calendar.svg',
              width: 800,
              height: 800,
              alt: 'calendar'
          }
      ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="calendarLogo.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
