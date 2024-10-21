"use client";

import { usePathname } from "next/navigation";
import Title from "./Title";
import Container from "./Container";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Octagon } from "lucide-react";
import Logout from "./Logout";

const Navbar = () => {
  const pathname = usePathname();
  const nav = [
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
  ];

  return (
    <>
      <Container parentClass="block lg:hidden">
        <Title />
        {/* Nav Button */}
        <div className="mt-12 flex w-full items-center gap-2 justify-between font-medium">
            {/* buttons */}
            {nav.map((nav, index) => (
              <Link className="w-full" href={nav.href} key={index}>
                <div
                  className={`flex w-full cursor-pointer items-center justify-start gap-2 rounded-md p-2 transition-all duration-200 ${pathname === nav.href ? "border-2 border-custom-gray-dark bg-custom-gray-dark" : "border-[1.5px] border-custom-gray text-custom-gray hover:text-custom-silver"}`}
                  style={{
                    transition: "color 0.2s ease-in-out",
                  }}
                >
                  {nav.icon}
                  {nav.tag}
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
  <Link href={`/`} className={`flex aspect-square items-center justify-center gap-4 rounded-md bg-custom-gray px-2 py-3 text-white hover:bg-custom-gray/90`}
  >
    <CircleHelp className={`h-5`} />
  </Link>
)

export default Navbar;