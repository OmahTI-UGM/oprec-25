"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

// Project type definition
interface Project {
  id: number;
  image: string;
}

// Example projects
const projects: Project[] = [
  { id: 1, image: "/assets/Porsenigama.png" },
  { id: 2, image: "/assets/Porsenigama.png" },
  { id: 3, image: "/assets/Porsenigama.png" },
  { id: 4, image: "/assets/Porsenigama.png" },
];

// ProjectCard component
const ProjectCard = ({ project }: { project: Project; divisiData: { makomti: string } }) => (
  <div className="relative overflow-hidden rounded-lg bg-custom-gray-dark h-[200px] md:h-[250px] group/card">
    <Image
      src={project.image}
      alt=""
      width={300}
      height={600}
      className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
    />
  </div>
);

// ProjectsSwiper component
interface ProjectsSwiperProps {
  divisiData: {
    makomti: string;
  };
}

export default function ProjectsSwiper({ divisiData }: ProjectsSwiperProps) {
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMdScreen(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="space-y-3 xl:px-0 pl-[min(5vw,32px)] md:px-[min(5vw,32px)]">
      <h1 className="font-semibold text-lg">Galeri Kegiatan</h1>
      <div className="relative md:px-12">
        <button
          type="button"
          className="button-prev absolute -left-0 top-1/2 -translate-y-1/2 hidden aspect-square w-[5vw] items-center justify-center rounded-full md:flex md:w-[3.2vw] xl:w-[2.5vw] z-[999]"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          className="button-next absolute -right-0 top-1/2 -translate-y-1/2 hidden aspect-square w-[5vw] items-center justify-center rounded-full md:flex md:w-[3.2vw] xl:w-[2.5vw] z-[999]"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation={{
            prevEl: '.button-prev',
            nextEl: '.button-next',
          }}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 2, spaceBetween: 24 },
          }}
          className="w-full relative"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard project={project} divisiData={divisiData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
