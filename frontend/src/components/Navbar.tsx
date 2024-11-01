import Link from "next/link";
import Container from "./Container";
import Title from "./Title";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import himakom from "@/../public/logos/himakom.svg";
import omahti from "@/../public/logos/omahti.svg";
import Image from "next/image";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <nav className="fixed z-50 w-full">
        <Container parentClass="py-4">
          <section className="flex w-full items-center justify-between bg-custom-black">
            <Title />
            <NavbarButtons />
            <NavbarSidebar />
          </section>
        </Container>
      </nav>

      {/* spacer */}
      <div className="h-20 w-full bg-custom-black"></div>
    </>
  );
};

// navbar buttons for larger screens
const NavbarButtons = ({ className }: { className?: string }) => {
  return (
    <div className={`hidden space-x-4 sm:flex ${className}`}>
      <Link href={`auth/login`}>
        <Button variant={`white`} size={`lg`}>
          Masuk
        </Button>
      </Link>
      <Link href={`admin`}>
        <Button variant={`whiteOutline`} size={`lg`}>
          Admin
        </Button>
      </Link>
    </div>
  );
};

// sidebar for small screens
const NavbarSidebar = ({ className }: { className?: string }) => {
  return (
    <Sheet>
      <SheetTrigger className="block sm:hidden">
        <Menu size={28} />
      </SheetTrigger>
      <SheetContent
        className="border-l-0 p-0 text-custom-silver sm:hidden"
        side={`right`}
      >
        {/* wrapper for absolute positioning */}
        <div className="relative flex h-full w-full flex-col items-center justify-between px-6 py-[10vh]">
          {/* title omahti dan himakom */}
          <div className="z-20 w-full">
            <SheetHeader className="text-start">
              <SheetTitle className="text-base font-medium text-custom-silver">
                {/* images himakom omahti */}
                <div className="mb-2 flex gap-2">
                  <Image src={himakom} alt="Logo Himakom" />
                  <Image src={omahti} alt="Logo OmahTI" />
                </div>
                Open Recruitment
                <br />
                Makomti 2024
              </SheetTitle>
            </SheetHeader>
          </div>

          {/* buttons */}
          <div className="z-20 flex w-full flex-col gap-4">
            <Link href={`auth/login`}>
              <Button className="w-full" variant={`white`} size={`lg`}>
                Masuk
              </Button>
            </Link>
            <Link href={`dashboard/admin`}>
              <Button
                className="w-full bg-custom-black hover:bg-custom-black/80"
                variant={`whiteOutline`}
                size={`lg`}
              >
                Admin
              </Button>
            </Link>
          </div>

          {/* blue and orange background */}
          <div className="absolute bottom-1/2 left-0 right-0 top-0 z-0 bg-custom-blue" />
          <div className="absolute bottom-0 left-0 right-0 top-1/2 z-0 bg-custom-orange" />
          {/* black gradient */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-custom-black via-custom-black/90 to-custom-black/80" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
