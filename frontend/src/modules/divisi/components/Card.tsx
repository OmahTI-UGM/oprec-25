import React from 'react';

interface CardProps {
  variant: "himakom" | "omahti";
  title: string;
}

const Card = ({ variant, title }: CardProps) => {
  return (
    <div className="bg-custom-gray-dark rounded-lg overflow-clip p-4 min-w-60">
      <div className={`text-xs bg-custom-black rounded-sm px-2 py-1 w-fit ${variant === "omahti" ? 'text-custom-orange' : 'text-custom-lavender'}`}>
        {variant === "omahti" ? "OmahTI" : "Himakom"}
      </div>

      <div className="text-5xl font-bold mt-4 w-fit">
        {title}
      </div>

      <button className="bg-custom-gray hover:bg-custom-gray/80 transition-all font-medium mt-6 py-2 px-4 w-full rounded-md">
        Selengkapnya
      </button>
    </div>
  );
};

export default Card;
