"use client";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function KelasPilihan() {
  const cardData = [
    { id: 1, title: "UI/UX", variant: "omahti" },
    { id: 2, title: "Frontend", variant: "omahti" },
    { id: 3, title: "Treasurer", variant: "himakom" },
    { id: 4, title: "Public Rel", variant: "himakom" },
  ];

  return (
    <>
      <p className={`font-semibold`}>Divisi yang Kamu Pilih</p>

      {/* swiper component */}
      <Swiper slidesPerView={4} spaceBetween={20}>
        {cardData.map((card) => (
          <SwiperSlide>
            <Card key={card.id} title={card.title} variant={card.variant} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
