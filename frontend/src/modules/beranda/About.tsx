"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

interface AboutProps {
  category: "Himakom" | "OmahTI";
}

const About: React.FC<AboutProps> = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-[400px] h-[250px] rounded-lg p-6 bg-gradient-to-b ${
        category === "Himakom" ? "from-custom-blue from-50%" : "from-custom-orange from-50%"
      } to-custom-gray-dark`}
    >
      <div className="absolute bottom-4 left-4">
        <h2 className="text-custom-silver text-2xl font-semibold">{category}</h2>
        <p className="text-custom-silver text-xs font-semibold">
          {category === "Himakom"
            ? "Himpunan Mahasiswa Ilmu Komputer"
            : "Organisasi Mahasiswa Ahli Teknologi Informasi"}
        </p>
      </div>
      <Button
        className="absolute bottom-4 right-5 flex items-center justify-center p-3 rounded-lg bg-custom-silver shadow-md overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: isHovered ? "120px" : "40px", transition: "width 0.3s ease" , backgroundColor: "white" }}
      >
        {!isHovered && <ArrowRight className="text-custom-black" />}
        {isHovered && (
          <span className="text-xs font-medium text-custom-black">Lihat Selengkapnya</span>
        )}
      </Button>
    </div>
  );
};

export default About;
