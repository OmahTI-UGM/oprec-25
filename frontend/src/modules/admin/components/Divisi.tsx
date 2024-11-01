"use client";
import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import DivisiCard from "./Card";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";

interface DivisiProps {
  variant?: "omahti" | "himakom";
}

const Divisi = ({ variant = "omahti" }: DivisiProps) => {
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div>
      <h1 className={`mb-3 text-xl font-semibold`}>
        Divisi {variant === "omahti" ? "OmahTI" : "Himakom"}
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
        <Swiper
          className="mySwiper overflow-hidden"
          modules={[Mousewheel]}
          ref={sliderRef}
          spaceBetween={10}
          mousewheel={{
            enabled: true,
            forceToAxis: true,
          }}
          style={{ 
            overscrollBehaviorX: 'contain', // Prevent page scroll
            overscrollBehaviorY: 'none'
          }}
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
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
          <SwiperSlide>
            <DivisiCard variant={variant} />
          </SwiperSlide>
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

export default Divisi;
