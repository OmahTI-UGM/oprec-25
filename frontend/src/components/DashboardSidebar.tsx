"use client";

import Logout from "./Logout";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Title from "./Title";
import { MailWarning, MessageSquare } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Octagon } from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const nav = [
    {
      icon: <Octagon className="h-5" />,
      href: "/admin",
      tag: "Admin",
    },
    {
      icon: <Octagon className="h-5" />,
      href: "/divisi",
      tag: "Divisi",
    },
    {
      icon: <MessageSquare className="h-5" />,
      href: "/wawancara",
      tag: "Wawancara",
    },
    {
      icon: <MailWarning className="h-5" />,
      href: "/pengumuman",
      tag: "Pengumuman",
    },
    {
      icon: <CircleHelp className="h-5" />,
      href: "/bantuan",
      tag: "Bantuan",
    },
  ];

  return (
    <>
      <nav className="sticky top-0 hidden h-screen w-[20vw] shrink-0 flex-col justify-between border-r-2 border-b-2 border-custom-gray-dark bg-custom-black px-[min(3vh,1.5rem)] pb-[7vh] pt-[3vh] lg:flex">
        {/* wrapper for title and nav buttons */}
        <div>
          <Title />

          {/* Nav Button */}
          <div className="mt-[10vh] flex flex-col gap-[2vh]">
            {nav.map((nav, index) => (
              <div
                key={index}
                className={`${pathname === nav.href || "border-b-[1px] border-custom-gray-dark"}`}
              >
                <Link href={nav.href}>
                  <div
                    className={`flex cursor-pointer items-center gap-4 rounded-md py-3 pl-[10px] transition-all duration-200 ${pathname === nav.href ? "bg-custom-gray-dark" : "text-custom-gray hover:bg-custom-gray-dark/20"}`}
                  >
                    {nav.icon}
                    <h1>{nav.tag}</h1>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Log Out button */}
        <Logout />
      </nav>
    </>
  );
}
