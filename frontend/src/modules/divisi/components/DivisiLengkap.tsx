"use client";
import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { divisi } from "@/helpers/divisi";

// icons
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

const DivisiLengkap = ({
  variant = "omahti",
}: {
  variant?: "omahti" | "himakom";
}) => {
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const filteredDivisi = divisi.filter(
    (div) => div.makomti.toLowerCase() === variant.toLowerCase(),
  );

  let divisiTitle =
    variant === "omahti" ? (
      <span className="text-custom-orange">OmahTI</span>
    ) : (
      <span className="text-custom-lavender">Himakom</span>
    );

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-custom-gray-dark p-4">
      <h1 className="space-x-4 text-lg">
        Divisi <span className="font-semibold">{divisiTitle}</span>
        <Keterangan />
      </h1>

      <div className="flex w-full items-center justify-between gap-2">
        {/* prev button */}
        <Button
          variant="ghost"
          className="px-2 py-1 hover:bg-custom-gray/20"
          onClick={handlePrev}
        >
          <ChevronLeft
            className={`${variant === "omahti" ? "text-custom-orange" : "text-custom-lavender"}`}
            strokeWidth={3}
          />
        </Button>

        {/* swiper gallery */}
        <Swiper
          className="mySwiper"
          ref={sliderRef}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            490: {
              slidesPerView: 2,
            },
            700: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1536: {
              slidesPerView: 5,
            },
          }}
        >
          {filteredDivisi.map((div) => (
            <SwiperSlide key={div.id}>
              <DivisiCard title={div.nama} id={div.id} logoUrl={div.logoUrl} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* next button */}
        <Button
          variant="ghost"
          className="px-2 py-1 hover:bg-custom-gray/20"
          onClick={handleNext}
        >
          <ChevronRight
            className={`${variant === "omahti" ? "text-custom-orange" : "text-custom-blue"}`}
            strokeWidth={3}
          />
        </Button>
      </div>
    </div>
  );
};

const DivisiCard = ({
  title = "PSHT",
  id,
  logoUrl,
}: {
  title?: string;
  id: string;
  logoUrl?: string;
}) => (
  <div className="flex items-center justify-between gap-5 rounded-md bg-custom-gray p-1.5">
    {/* div for image */}
    <div className="aspect-square h-8 rounded-sm bg-white">
      {logoUrl && (
        <img src={logoUrl} alt={title} className="h-full w-full object-cover" />
      )}
    </div>

    {/* text */}
    <h3 className="truncate">{title}</h3>

    {/* button */}
    <Link href={`/dashboard/divisi/${id}`}>
      <Button
        className="aspect-square h-fit w-fit rounded-sm px-1.5 py-0.5 font-semibold"
        variant="secondary"
      >
        <ChevronRight />
      </Button>
    </Link>
  </div>
);

const Keterangan = () => (
  <div className="inline-flex items-center gap-1 rounded-sm bg-custom-black px-1.5 text-xs">
    {/* red block */}
    <div className="aspect-square h-3 border-[1px] border-black bg-custom-red" />
    = Full
  </div>
);

export default DivisiLengkap;
