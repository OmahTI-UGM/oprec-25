import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import himakom from "@/logos/himakom.svg";
import omahti from "@/logos/omahti.svg";
import Link from "next/link";
import Marquee from "@/components/ui/marquee";
import { House } from "lucide-react";
import omahtiModel from "@/assets/beranda/hero/omahtiModel.webp";
import himakomModel from "@/assets/beranda/hero/himakomModel.webp";

const Hero = () => {
  return (
    <>
      <Container
        parentClass="overflow-y-hidden"
        className="flex h-[67vh] w-full flex-col items-center justify-end gap-4 bg-custom-black xs:h-[32rem] sm:h-[75vh]"
      >
        {/* logo himakom omahti */}
        <Logos />

        {/* title and cta button */}
        <TitleCTA />

        {/* gradients, and circle in the background */}
        <Background />
      </Container>
      <BenefitsMarquee />
    </>
  );
};

const TitleCTA = () => (
  <div className="z-20 flex flex-col items-center gap-4">
    <h1 className="text-center text-3xl font-semibold drop-shadow-xl sm:text-5xl">
      Be Great. Be Us.
    </h1>
    <Link href={`dashboard`}>
      <Button variant={`white`} size={`lg`} className="shadow-2xl">
        Daftar Sekarang
      </Button>
    </Link>
  </div>
);

const Logos = () => (
  <div className="z-20 flex items-center gap-4">
    <Image src={omahti} alt="OmahTI Logo" className="h-8 w-auto" priority />
    <Image src={himakom} alt="Himakom Logo" className="h-8 w-auto" priority />
  </div>
);

const Background = () => (
  <>
    {/* image */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="relative h-[600px] w-full">
        <Image
          className="absolute z-10 -right-[2rem] xxs:right-[2.7rem] xs:right-[9rem] top-6 object-contain
          w-full h-[80vh] min-w-[500px]"
          src={omahtiModel} 
          width={503}
          height={906}
          alt=""
          priority
        />
        <Image
          className="absolute z-10 -left-[2rem] xxs:left-[2.7rem] xs:left-[9rem] top-6 object-contain
          w-full h-[80vh] min-w-[500px] p-8"
          src={himakomModel}
          width={500}
          height={906}
          alt=""
          priority
        />
      </div>
    </div>

    {/* circle in the background */}
    <div className="absolute bottom-[-4rem] z-0 aspect-square h-auto w-full max-w-2xl rounded-full bg-custom-gray lg:bottom-[-10rem]" />

    {/* gradients */}
    <div className="absolute bottom-0 left-1/2 right-0 top-0 z-10 bg-gradient-to-t from-custom-blue via-transparent to-transparent" />
    <div className="absolute bottom-0 left-0 right-1/2 top-0 z-10 bg-gradient-to-t from-custom-orange via-transparent to-transparent" />
  </>
);

const BenefitsMarquee = () => {
  const Benefits = [
    "Hardskill and Softskill",
    "The Best in The Field",
    "Projects and Portfolio",
    "Relational Experience",
  ];
  return (
    <div className="relative">
      {/* Left shadow */}
      <div className="absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-custom-gray-dark to-transparent" />

      {/* Right shadow */}
      <div className="absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-custom-gray-dark to-transparent" />

      {/* Marquee content */}
      <Marquee className="bg-custom-gray-dark">
        {Benefits.map((benefit, i) => (
          <div
            key={i}
            className="mx-4 flex shrink-0 flex-row items-center gap-2 py-2 font-medium text-custom-silver sm:mx-8 sm:py-4 md:py-8 lg:mx-16 lg:text-lg"
          >
            <House size={24} className="h-4 lg:h-5" />
            {benefit}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Hero;
