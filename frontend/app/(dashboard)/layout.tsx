import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import Container from "@/components/Container";
import { getCurrentUser } from "@/utils/auth";
import { headers } from "next/headers";
import { User } from "@/utils/definitions";

import Avatar from "@/components/Avatar"; // Assuming Avatar is in this path

export default async function Layout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const domain = headersList.get('host') || '';
  const pathname = headersList.get('referrer') || '';
  const isDivisiPage = pathname.includes('/divisi/');

  if (isDivisiPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* Avatar in absolute position */}
        <div className="absolute top-6 right-6 z-10">
          <Avatar />
        </div>

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
  );
}
