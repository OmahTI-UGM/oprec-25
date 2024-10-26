"use client";

import { usePathname } from "next/navigation";
import Title from "./Title";
import Container from "./Container";
import Link from "next/link";
import { MailWarning, MessageSquare } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Octagon } from "lucide-react";
import Logout from "./Logout";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const nav = [
    {
      icon: <Octagon className="h-5 shrink-0" />,
      href: "/dashboard/divisi",
      tag: "Divisi",
    },
    {
      icon: <MessageSquare className="h-5 shrink-0" />,
      href: "/dashboard/wawancara",
      tag: "Wawancara",
    },
    // {
    //   icon: <MailWarning className="h-5 shrink-0" />,
    //   href: "/dashboard/pengumuman",
    //   tag: "Pengumuman"
    // },
  ];

  return (
    <>
      <Container parentClass="block lg:hidden">
        <Title />
        {/* Nav Button */}
        <div className="mt-12 flex max-w-full items-center gap-2 justify-between font-medium">
            {/* buttons */}
            {nav.map((nav, index) => (
              <Link className="w-auto grow min-w-0" href={nav.href} key={index}>
                <div
                  className={`flex w-full cursor-pointer items-center justify-start gap-2 rounded-md p-2 transition-all duration-200 ${pathname === nav.href ? "border-2 border-custom-gray-dark bg-custom-gray-dark" : "border-[1.5px] border-custom-gray text-custom-gray hover:text-custom-silver"}`}
                  style={{
                    transition: "color 0.2s ease-in-out",
                  }}
                >
                  {nav.icon}
                  <span className="truncate">
                    {nav.tag}
                  </span>
                </div>
              </Link>
            ))}
            <Help />
            <Logout />
        </div>
      </Container>
    </>
  );
}

const Help = () => (
  <Link href={`/`} className={`shrink-0 flex aspect-square items-center justify-center gap-4 rounded-md bg-custom-gray px-2 py-3 text-white hover:bg-custom-gray/90`}
  >
    <CircleHelp className={`h-5`} />
  </Link>
)

export default DashboardNavbar;