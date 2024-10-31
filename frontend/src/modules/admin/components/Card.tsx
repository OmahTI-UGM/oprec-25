import React from "react";

interface CardProps {
  id?: number;
  variant?: "himakom" | "omahti";
  title?: string;
}

const DivisiCard = ({ id = 1, variant = "omahti", title = "UI/UX" }: CardProps) => {
  return (
    <div className="w-full rounded-lg bg-custom-gray-dark p-4">
      <div className="flex gap-2 items-center">
        <p className="text-base font-medium text-custom-silver">{id}</p>
        <div
          className={`w-fit rounded-sm bg-custom-black px-2 py-1 text-sm font-medium ${variant === "omahti" ? "text-custom-orange" : "text-custom-lavender"}`}
        >
          {variant === "omahti" ? "OmahTI" : "Himakom"}
        </div>
      </div>

      <div className="mt-4 w-full overflow-hidden">
        <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-4xl font-bold xl:text-5xl">
          {" "}
          {/* bisa juga text-clip (terserah mau pake apa) */}
          {title}
        </h2>
      </div>

      <button className="mt-6 w-full rounded-md bg-custom-gray px-4 py-2 font-medium transition-all hover:bg-custom-gray/80">
        Selengkapnya
      </button>
    </div>
  );
};

export default DivisiCard;
