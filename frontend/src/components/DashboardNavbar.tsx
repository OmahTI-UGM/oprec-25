"use client";

import { usePathname } from "next/navigation";
import Title from "./Title";
import Container from "./Container";
import Link from "next/link";
import { MailWarning, MessageSquare, CircleHelp, Octagon } from "lucide-react";
import Logout from "./Logout";

interface User {
  isAdmin: boolean;
}

interface DashboardNavbarProps {
  user: User | null;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = () => {
  const pathname = usePathname();
  const isAdmin = false;

  const nav = isAdmin
    ? [
        {
          icon: <Octagon className="h-5 shrink-0" />,
          href: "/admin",
          tag: "Admin",
          newTab: false,
        },
      ]
    : [
        {
          icon: <Octagon className="h-5 shrink-0" />,
          href: "/divisi",
          tag: "Divisi",
          newTab: false,
        },
        {
          icon: <MessageSquare className="h-5 shrink-0" />,
          href: "/wawancara",
          tag: "Wawancara",
          newTab: false,
        },
        {
          icon: <MailWarning className="h-5 shrink-0" />,
          href: "/pengumuman",
          tag: "Pengumuman",
          newTab: false,
        },
        {
          icon: <CircleHelp className="h-5 shrink-0" />,
          href: "https://wa.me/628157929797",
          tag: "Bantuan",
          newTab: true,
        },
      ];

  return (
    <Container parentClass="block lg:hidden">
      <Title />
      {/* Nav Button */}
      <div className="mt-12 flex max-w-full items-center gap-2 justify-between font-medium">
        {nav.map((item, index) => (
          <Link className="w-auto grow min-w-0" href={item.href} key={index}>
            <div
              className={`flex w-full cursor-pointer items-center justify-start gap-2 rounded-md p-2 transition-all duration-200 ${
                pathname === item.href
                  ? "border-2 border-custom-gray-dark bg-custom-gray-dark"
                  : "border-[1.5px] border-custom-gray text-custom-gray hover:text-custom-silver"
              }`}
              style={{ transition: "color 0.2s ease-in-out" }}
            >
              {item.icon}
              <span className="truncate">{item.tag}</span>
            </div>
          </Link>
        ))}
        <Help />
        <Logout />
      </div>
    </Container>
  );
};

const Help = () => (
  <Link
    href="/"
    className="shrink-0 flex aspect-square items-center justify-center gap-4 rounded-md bg-custom-gray px-2 py-3 text-white hover:bg-custom-gray/90"
  >
    <CircleHelp className="h-5" />
  </Link>
);

export default DashboardNavbar;
