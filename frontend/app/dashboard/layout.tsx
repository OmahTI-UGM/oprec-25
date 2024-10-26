"use client";

import { usePathname } from "next/navigation";
import SmoothScrolling from "@/contexts/SmoothScroll";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardNavbar from "@/components/DashboardNavbar";

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
          {children}
        </div>
      </div>
    </SmoothScrolling>
  );
}