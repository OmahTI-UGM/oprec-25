import Image from "next/image";
import Container from "./Container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <Container parentClass="relative w-screen bg-custom-black">
      <footer className="relative flex flex-col space-y-12 w-full">
        <div className="relative w-full rounded-lg bg-custom-gray-dark p-8 h-[300px] lg:h-auto overflow-hidden">
          {/* Main Content */}
          <div className="relative z-10 flex flex-col lg:flex-row justify-between h-full gap-8">
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
              <h1 className="font-semibold text-2xl  xxs:text-3xl leading-tight">
                Himakom UGM | OmahTI UGM
              </h1>
            </div>
            
            {/* Right Section */}
            <Link href="https://www.instagram.com/sultandevin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 lg:mr-24">
              <h2 className="text-lg lg:text-xl leading-tight">
                See Us
              </h2>
              <ArrowRight className="h-5" />
            </Link>
          </div>

          {/* Decorative Circle */}
          <div className="absolute w-[600px] h-[600px] bg-custom-gray rounded-full -right-48 -top-48 lg:-right-54 lg:-top-[210px] hidden lg:block" />
          <div className="absolute w-[600px] h-[600px] bg-custom-gray rounded-full -left-[14rem] top-48 block lg:hidden" />
        </div>

        {/* Footer Info */}
        <div className="flex flex-col gap-12">
          <h2 className="text-base lg:text-xl">
            Gedung Fakultas MIPA UGM Sekip Utara, Bulaksumur, Sinduadi, Mlati, 
            Sleman, DI Yogyakarta
          </h2>
          <h2 className="text-base lg:text-xl">© MAKOMTI UGM - All Rights Reserved.</h2>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;