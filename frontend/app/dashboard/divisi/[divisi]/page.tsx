import { notFound } from "next/navigation";
import { divisi } from "@/helpers/divisi";
import ButtonLink from "@/components/ui/ButtonLink";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Divisi",
  description: "",
};

export function generateStaticParams() {
  return divisi.map((div) => ({
    divisi: div.id,
  }));
}

type DivisiPageProps = {
  params: {
    divisi: string;
  };
};

const Page = ({ params }: DivisiPageProps) => {
  const divisiData = divisi.find((div) => div.id === params.divisi);

  if (!divisiData) {
    notFound();
  }

  return (
    <>
      <section
        className={
          `flex flex-col lg:flex-row p-[2%] gap-[2%] h-auto
          ${divisiData.makomti === "himakom" ? "bg-gradient-to-b from-custom-blue to-30% to-custom-black" : "bg-gradient-to-b from-custom-orange to-30% to-custom-black"}`
        }
      >
        <div>
          <ButtonLink href="/dashboard/divisi" className="mt-2 mb-6 px-4 py-2 rounded bg-custom-gray-dark text-white">
            Kembali
          </ButtonLink>
          <div className="flex justify-between lg:min-w-[70vw] lg:flex-grow">
            <div className="flex items-end gap-[1vw]">
              <Image
                alt="Logo"
                className="object-cover"
                src="https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?w=826&t=st=1729060915~exp=1729061515~hmac=dc911f470a5362d31529331c2e5ba014647fd3219c2e050b0d34e03a59d6002e"
                // {divisiData.logoUrl}
                height={64}
                width={64}
              />
              <div className="flex flex-col">
                <h1 className={`${divisiData.makomti === "himakom" ? "text-custom-blue" : "text-custom-orange"}`}>{divisiData.nama}</h1>
                <h2>Deskripsi DIVISI</h2>
              </div>
            </div>
            {/* Status */}
            <div className="p-2 flex flex-col bg-custom-gray-dark rounded-md">
              <h3>Status</h3>
              <div className="flex justify-between">
                <h4>Pendaftar</h4>
                <h4>5/10</h4>
              </div>
              {/* Button Pilih Divisi, nanti diganti Butotn terus dikasih onClick */}
              <div className="w-full bg-custom-gray">
                Pilih Divisi
              </div>
            </div>
          </div>
          {/* Tentang */}
          <div className="w-full">
            <h1>Tentang Kami</h1>
            <div className="bg-custom-gray-dark px-[1%] py-[0.75%] rounded-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
            </div>
          </div>
          {/* Proyek */}
          <div>
            {/* PAKE SWIPERZZZZZZZZZZZZZ */}
          </div>
        </div>
        {/* Penugasan */}
        <div className="w-full bg-custom-gray-dark rounded-xl p-[1%]">
          <h1>Penugasan</h1>
          <p></p>
          {/* Nanti penugasan pake react markdown */}

          <h1 className="font-semibold">Keperluan</h1>
          <div className="w-full bg-custom-gray flex justify-center items-center">Download Keperluan</div>
        </div>
      </section>
    </>
  );
};

export default Page;
