import Title from "./components/Title";
import Peringatan from "./components/peringatan";
import WaktuPilihan from "./components/WaktuPilihan";

export default function Divisi() {
  return (
    <>
      <Title />
      <hr className={`my-4 border-2 border-custom-gray-dark`} />
      <Peringatan />
      <WaktuPilihan />
    </>
  );
}
