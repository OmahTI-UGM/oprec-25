import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import himakom from "@/../public/logos/himakom.svg";
import omahti from "@/../public/logos/omahti.svg";
import Link from "next/link";
import Marquee from "@/components/ui/marquee";
import { House } from "lucide-react";
import omahtiModel from "@/../public/assets/beranda/hero/omahtiModel.webp";
import himakomModel from "@/../public/assets/beranda/hero/himakomModel.webp";

const Hero = () => {
  return (
    <>
      <Container
        parentClass="overflow-hidden"
        className="flex h-[70vh] xs:h-[32rem] w-full flex-col items-center justify-end gap-4 bg-custom-black sm:h-[75vh]"
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
  <div className="z-20 flex items-center gap-2">
    <Image src={himakom} alt="Logo Himakom" />
    <Image src={omahti} alt="Logo OmahTI" />
  </div>
);

const Background = () => (
  <>
    {/* image */}
    <div className="absolute inset-0">
      <div className="relative h-full w-full">
        <Image
          className="ml-[-7rem] z-10 object-contain mt-[5rem]"
          src={himakomModel}
          sizes="100%"
          fill
          alt="Diddy"
          priority
        />
        <Image
          className="ml-[7rem] z-10 object-contain mt-[5rem]"
          src={omahtiModel}
          sizes="100%"
          fill
          alt="Diddy"
          priority
        />
      </div>
    </div>

    {/* circle in the background */}
    {/* <div className="absolute bottom-0 z-0 aspect-square h-auto w-full max-w-xl rounded-full bg-custom-gray lg:bottom-[-10rem]" /> */}

    {/* gradients */}
    <div className="absolute bottom-0 left-1/2 right-0 top-0 z-10 bg-gradient-to-t from-custom-orange via-transparent to-transparent" />
    <div className="absolute bottom-0 left-0 right-1/2 top-0 z-10 bg-gradient-to-t from-custom-blue via-transparent to-transparent" />
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
    <Marquee className="bg-custom-gray-dark">
      {Benefits.map((benefit, i) => (
        <div key={i} className="mx-4 flex shrink-0 flex-row items-center gap-2 py-2 font-medium text-custom-silver sm:mx-8 sm:py-4 md:py-8 lg:mx-16 lg:text-lg">
          <House size={24} className="h-4 lg:h-5" />
          {benefit}
        </div>
      ))}
    </Marquee>
  );
};

export default Hero;
