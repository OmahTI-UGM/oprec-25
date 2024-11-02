import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/contexts/SmoothScroll";
import { Poppins } from "next/font/google";
import GSAPProvider from "@/contexts/GSAP";
export const metadata: Metadata = {
  title: "Oprec Makomti",
  description: "Open Recruitment Himakom & OmahTI",
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-custom-silver font-poppins-regular`}>
        <SmoothScrolling>
          <GSAPProvider>
            {children}
          </GSAPProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
