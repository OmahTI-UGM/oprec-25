import { Smile } from "lucide-react";
import PopupTerima from "./components/PopupTerima";
import PopupPengumuman from "./components/PopupPengumuman";

const Pengumuman = () => {
  return (
    <div className="space-y-8">
      <Title />
      <div className="flex flex-col h-96 items-center justify-center gap-4 rounded-xl bg-custom-gray-dark p-6">
        <Smile size={100} />
        <h1 className="text-xl text-center font-medium">kamu dapat membuka pengumuman</h1>
        <PopupPengumuman status="terima" category="Data Science & Artificial Intelligent"/>
      </div>
    </div>
  );
};

// title
const Title = () => (
  <div>
    <h1 className="text-2xl font-semibold sm:text-4xl">Pengumuman</h1>
    <p className={``}>
      Kamu dapat membuka hasil pengumuman{" "}
      <span className={`font-semibold`}>Open Recruitment</span>
    </p>
  </div>
);

export default Pengumuman;
