"use client";
import DivisiCard from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, FreeMode } from "swiper/modules"; // Import Grid module
import "swiper/css";
import "swiper/css/grid"; // Import Grid CSS

export default function DivisiPilihan() {
  // ini temporary, nanti ganti authentication
  const hasChosen = true;

  interface Card {
    id: number;
    title: string;
    variant: "himakom" | "omahti";
  }

  const cardData: Card[] = [
    { id: 1, title: "UI/UX", variant: "omahti" },
    { id: 2, title: "FE", variant: "omahti" },
    { id: 3, title: "Treasurer", variant: "himakom" },
    { id: 4, title: "Public Relation", variant: "himakom" },
  ];

  return (
    <>
      <p className="font-semibold lg:text-lg">Divisi yang Kamu Pilih</p>

      {hasChosen ? (
        <Swiper
          className="mt-4"
          modules={[Grid, FreeMode]}
          spaceBetween={10}
          breakpoints={{
            // mobile
            0: {
              slidesPerView: 1,
              freeMode: {
                enabled: true,
                sticky: false,
              },
            },
            // tablet
            640: {
              slidesPerView: 2,
              grid: {
                fill: "row",
                rows: 2,
              },
            },
            // desktop
            1024: {
              slidesPerView: 4,
              grid: {
                fill: "row",
                rows: 1,
              },
              enabled: false, // Disables swiping on desktop
            },
          }}
        >
          {cardData.map((card) => (
            <SwiperSlide key={card.id}>
              <DivisiCard {...card} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <h1 className="mb-8 mt-2">
          Kamu belom memilih divisi, Pilih divisi yang tersedia
        </h1>
      )}
    </>
  );
}
