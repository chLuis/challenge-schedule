import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
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
              url: 'https://challenge-schedule.vercel.app/calendar.svg',
              width: 800,
              height: 200,
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
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
