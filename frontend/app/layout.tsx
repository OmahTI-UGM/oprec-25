import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/contexts/SmoothScroll";


export const metadata: Metadata = {
  title: "Oprec Makomti",
  description: "Open Recruitment Himakom & OmahTI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
