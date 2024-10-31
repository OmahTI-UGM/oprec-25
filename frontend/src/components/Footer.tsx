import Image from "next/image";
import Container from "./Container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <Container parentClass="relative bg-custom-black">
      <footer className="relative flex w-full flex-col space-y-12">
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-custom-gray-dark p-8 lg:h-auto">
          {/* Main Content */}
          <div className="relative z-10 flex h-full flex-col justify-between gap-8 lg:flex-row">
            {/* Left Section */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/logo/himakom.png"
                  alt="Himakom Logo"
                  width={120}
                  height={152}
                  className="h-12 w-auto"
                />
                <Image
                  src="/assets/logo/omahti.png"
                  alt="OmahTI Logo"
                  width={298}
                  height={113}
                  className="h-12 w-auto"
                />
              </div>
              <h1 className="text-2xl font-semibold leading-tight xxs:text-3xl">
                Himakom UGM | OmahTI UGM
              </h1>
            </div>

            {/* Right Section */}
            <Link
              href="https://www.instagram.com/sultandevin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 lg:mr-24"
            >
              <Button
                variant={`link`}
                className="text-lg text-custom-silver leading-tight lg:text-xl"
              >
                See Us
                <ArrowRight className="h-5" />
              </Button>
            </Link>
          </div>

          {/* Decorative Circle */}
          <div className="lg:-right-54 absolute -right-48 -top-48 hidden h-[600px] w-[600px] rounded-full bg-custom-gray lg:-top-[210px] lg:block" />
          <div className="absolute -left-[14rem] top-48 block h-[600px] w-[600px] rounded-full bg-custom-gray lg:hidden" />
        </div>

        {/* Footer Info */}
        <div className="flex flex-col gap-12">
          <h2 className="text-base lg:text-xl">
            Gedung Fakultas MIPA UGM Sekip Utara, Bulaksumur, Sinduadi, Mlati,
            Sleman, DI Yogyakarta
          </h2>
          <h2 className="text-base lg:text-xl">
            © MAKOMTI UGM - All Rights Reserved.
          </h2>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
