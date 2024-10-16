import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/contexts/SmoothScroll";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


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
          <div className="flex flex-col lg:flex-row">
            <Sidebar />
            <Navbar />
            {children}
          </div>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
