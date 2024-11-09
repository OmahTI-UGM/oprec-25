import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface CardProps {
  id: number;
  variant?: "himakom" | "omahti";
  title: string;
  slug: string
}

const DivisiCard = ({ id, variant = "omahti", title, slug }: CardProps) => {
  return (
    <div className="w-full min-h-40 flex flex-col justify-between gap-4 rounded-lg bg-custom-gray-dark p-4">
      <div className="flex gap-2 items-center">
        <p className="text-base font-medium text-custom-silver">{id}</p>
        <div
          className={`w-fit rounded-sm bg-custom-black px-2 py-1 text-sm font-medium ${variant === "omahti" ? "text-custom-orange" : "text-custom-lavender"}`}
        >
          {variant === "omahti" ? "OmahTI" : "Himakom"}
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-4xl font-bold xl:text-5xl">
          {" "}
          {/* bisa juga text-clip (terserah mau pake apa) */}
          {title}
        </h2>
      </div>

      <Link href={`/divisi/${slug}`}>
        <Button size={`lg`} className="w-full text-[0.9rem]">
        Selengkapnya
        </Button>
      </Link>
    </div>
  );
};

export default DivisiCard;
