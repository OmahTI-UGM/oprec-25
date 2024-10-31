"use client";

import { useState, useEffect } from 'react'
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import 'swiper/css'

interface Project {
  id: number
  title: string
  image: string
  category: string
}

const projects: Project[] = [
  { id: 1, title: 'Web Porsenigama', image: '/assets/Porsenigama.png', category: 'Web Development' },
  { id: 2, title: 'Edunit', image: '/assets/Porsenigama.png', category: 'Mobile App' },
  { id: 3, title: 'Unitera', image: '/assets/Porsenigama.png', category: 'Web Development' },
  { id: 4, title: 'Unitera', image: '/assets/Porsenigama.png', category: 'Web Development' },
]

// ProjectCard component

const ProjectCard = ({ project, divisiData }: { project: Project; divisiData: { makomti: string } }) => (
  <div className="relative overflow-hidden rounded-lg bg-custom-gray-dark h-[200px] md:h-[250px] group/card">
    <Image
      src={project.image}
      alt={project.title}
      width={300}
      height={600}
      className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-custom-gray-dark px-3 py-1">
      <h3 className={`text-lg font-medium ${divisiData.makomti === "himakom" ? "text-custom-blue" : "text-custom-orange"}`}>
        {project.title}
      </h3>
    </div>
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
    <div className="space-y-3 pl-[min(5vw,32px)] md:pr-[min(5vw,32px)] lg:pr-0">
      <h1 className="font-semibold text-lg">Proyek / Program Kerja / Kegiatan</h1>
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
            1024: { slidesPerView: 3, spaceBetween: 24 },
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
