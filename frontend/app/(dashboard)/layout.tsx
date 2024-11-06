"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import Container from "@/components/Container";
import { getCurrentUser } from "@/utils/auth";
import Avatar from "@/components/Avatar"; // Assuming Avatar is in this path

interface User {
  id: string;
  NIM: string;
  username: string;
  isAdmin: boolean;
  enrolledSlugOti: string;
  enrolledSlugHima: string;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDivisiPage = pathname?.includes("/divisi/");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        currentUser.isAdmin = currentUser.isAdmin === "true" || currentUser.isAdmin === true;
      }
      setUser(currentUser);
    }

    fetchUser();
  }, []);

  if (isDivisiPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* Avatar in absolute position */}
      {user && (
        <div className="absolute top-6 right-6 z-10">
          <Avatar username={user.username} />
        </div>
      )}

      <DashboardSidebar user={user} />
      <div className="flex-grow">
        <DashboardNavbar user={user} />
        <Container
          parentClass={`pt-0 w-screen lg:w-[80vw] lg:pt-8 min-h-screen`}
        >
          {children}
        </Container>
      </div>
    </div>
  );
}
