"use client";
import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

// icons
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

const KelasLengkap = ({
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

  let divisi =
    variant === "omahti" ? (
      <span className="text-custom-orange">OmahTI</span>
    ) : (
      <span className="text-custom-lavender">Himakom</span>
    );

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-custom-gray-dark p-4">
      <h1 className="space-x-4 text-lg">
        Divisi <span className="font-semibold">{divisi}</span>
        <KelasFull />
      </h1>

      <div className="flex w-full items-center justify-between gap-2">
        {/* prev button */}
        <Button variant={`ghost`} className="py-1 px-2 hover:bg-custom-gray/20" onClick={handlePrev}>
          <ChevronLeft
            onClick={handleNext}
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
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide>
            <KelasCard />
          </SwiperSlide>
          <SwiperSlide>
            <KelasCard />
          </SwiperSlide>
          <SwiperSlide>
            <KelasCard />
          </SwiperSlide>
          <SwiperSlide>
            <KelasCard />
          </SwiperSlide>
          <SwiperSlide>
            <KelasCard />
          </SwiperSlide>
          <SwiperSlide>
            <KelasCard />
          </SwiperSlide>
        </Swiper>

        {/* next button */}
        <Button variant={`ghost`} className="py-1 px-2 hover:bg-custom-gray/20" onClick={handleNext}>
          <ChevronRight
            onClick={handleNext}
            className={`${variant === "omahti" ? "text-custom-orange" : "text-custom-lavender"}`}
            strokeWidth={3}
          />
        </Button>
      </div>
    </div>
  );
};

const KelasCard = ({ title = "PSHT" }: { title?: string }) => (
  <div className="flex items-center justify-between gap-5 rounded-md bg-custom-gray p-1.5">
    {/* div for image */}
    <div className="aspect-square h-8 rounded-sm bg-white" />

    {/* text */}
    <h3 className="">{title}</h3>

    {/* button */}
    <Button
      className="aspect-square h-fit w-fit rounded-sm px-1.5 py-0.5 font-semibold"
      variant={`secondary`}
    >
      <ChevronRight />
    </Button>
  </div>
);

const KelasFull = () => (
  <div className="inline-flex items-center gap-1 rounded-sm bg-custom-black p-1.5 text-xs">
    {/* red block */}
    <div className="aspect-square h-3 border-[1px] border-black bg-custom-red" />
    = Full
  </div>
);

export default KelasLengkap;
