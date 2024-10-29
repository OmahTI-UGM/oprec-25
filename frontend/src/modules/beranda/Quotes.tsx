import React from "react";

interface AboutProps {
  category: "Himakom" | "OmahTI";
}

const Quotes: React.FC<AboutProps> = ({ category }) => {
  return (
    <div
      className={`relative w-[500px] h-[200px] rounded-lg p-6 bg-gradient-to-b ${
        category === "Himakom" ? "from-custom-blue" : "from-custom-orange"
      } to-custom-gray-dark`}
    >
      <div className="absolute bottom-4 left-4">
        <h2 className="text-white text-xl font-semibold">
          {category === "Himakom"
            ? "Computer Love and Life"
            : "We Make IT for Everyone"}
        </h2>
      </div>
    </div>
  );
};

export default Quotes;
