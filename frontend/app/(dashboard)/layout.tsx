"use client";

import { usePathname } from "next/navigation";
import SmoothScrolling from "@/contexts/SmoothScroll";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import Container from "@/components/Container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDivisiPage = pathname?.includes("/dashboard/divisi/");

  if (isDivisiPage) {
    return <SmoothScrolling>{children}</SmoothScrolling>;
  }

  return (
    <SmoothScrolling>
      <div className="flex flex-col lg:flex-row">
        <DashboardSidebar />
        <div className="flex-grow">
          <DashboardNavbar />
          <Container
            parentClass={`pt-0 w-screen lg:w-[80vw] lg:pt-8 min-h-screen`}
          >
            {children}
          </Container>
        </div>
      </div>
    </SmoothScrolling>
  );
}
