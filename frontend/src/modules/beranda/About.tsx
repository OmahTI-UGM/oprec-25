import { ArrowRight } from "lucide-react";
import Image from "next/image";
import omahti from "@/assets/beranda/about/omahti.webp";
import himakom from "@/assets/beranda/about/himakom.webp";

interface AboutProps {
  category: "Himakom" | "OmahTI";
}

const AboutCard: React.FC<AboutProps> = ({ category }) => {
  return (
    <div
      data-gsap={`${ category === "Himakom" ? "right" : "left"}`}
      className={`relative w-full h-40 xs:h-56 sm:h-80 xl:h-96 rounded-xl p-6 bg-gradient-to-b ${
        category === "Himakom" ? "from-custom-blue from-50%" : "from-custom-orange from-50%"
      } to-custom-gray-dark`}
    >
      <Image
        className={`object-cover rounded`}
        sizes="100%"
        src={category === "OmahTI" ? omahti : himakom}
        alt=""
        fill
      />
      <div className="absolute bottom-4 left-4">
        <h2 className="text-custom-silver text-xl xxs:text-2xl xs:text-3xl sm:text-4xl xl:text-5xl font-semibold">
          {category}
        </h2>
        <p className="text-custom-silver text-xxs xxs:text-xs xs:text-sm sm:text-base xl:text-lg font-medium">
          {category === "Himakom"
            ? "Himpunan Mahasiswa Ilmu Komputer"
            : "Organisasi Mahasiswa Ahli Teknologi Informasi"}
        </p>
      </div>
      <button className="absolute bottom-4 right-4 flex items-center justify-center p-2 xs:p-3 transition-colors rounded-lg bg-white shadow-md hover:bg-white/80">
          <ArrowRight className="text-custom-black w-4 xxs:w-6 sm:w-8 h-4 xxs:h-6 sm:h-8" />
      </button>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 w-full ">
      <AboutCard category="Himakom" />
      <AboutCard category="OmahTI" />
    </div>
  );
};

export default About;
