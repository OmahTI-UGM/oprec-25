"use client";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const KelasLengkap = ({ variant = "omahti" }: { variant?: string }) => {
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

      <Swiper
        className="mySwiper w-full"
        spaceBetween={20}
        direction="horizontal"
        navigation
        mousewheel
        modules={[Mousewheel, Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          1024: {
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
      &gt;
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
