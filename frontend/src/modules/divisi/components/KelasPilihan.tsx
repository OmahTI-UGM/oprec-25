"use client";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper/modules'; // Import Grid module
import "swiper/css";
import "swiper/css/grid"; // Import Grid CSS

export default function KelasPilihan() {
  const cardData = [
    { id: 1, title: "UI/UX", variant: "omahti" },
    { id: 2, title: "Frontend", variant: "omahti" },
    { id: 3, title: "Treasurer", variant: "himakom" },
    { id: 4, title: "Public Relation", variant: "himakom" },
  ];

  return (
    <>
      <p className="font-semibold mb-4 lg:text-lg">Divisi yang Kamu Pilih</p>
      <Swiper
        modules={[Grid]}
        spaceBetween={20}
        breakpoints={{
          // mobile
          0: {
            slidesPerView: 1,
            grid: {
              fill: 'row',
              rows: 1
            }
          },
          // tablet
          640: {
            slidesPerView: 2,
            grid: {
              fill: 'row',
              rows: 2
            }
          },
          // desktop
          1024: {
            slidesPerView: 4,
            grid: {
              fill: 'row',
              rows: 1
            },
            enabled: false // Disables swiping on desktop
          }
        }}
      >
        {cardData.map((card) => (
          <SwiperSlide key={card.id}>
            <Card title={card.title} variant={card.variant} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}