import { notFound } from "next/navigation";
import { divisi } from "@/helpers/divisi";
import ButtonLink from "@/components/ui/ButtonLink";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/Container";

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
      <Container parentClass={`h-screen ${divisiData.makomti === "himakom" ? "bg-gradient-to-b from-custom-blue to-30% to-custom-black" : "bg-gradient-to-b from-custom-orange via-cus to-30% to-custom-black"}`
          }>
        <section className="flex flex-col xl:flex-row gap-4 bg-transparent h-auto">
          <div className="space-y-6 xl:w-[70vw]">
            <ButtonLink href="/dashboard/divisi" className="mt-2 px-4 py-2 rounded-sm bg-custom-gray-dark text-white flex justify-center items-center gap-2">
              <ArrowLeft className="h-5" />
              Kembali
            </ButtonLink>
            <div className="flex justify-between lg:flex-grow flex-col md:flex-row md:items-end space-y-3">
              <div className="flex items-end gap-4">
                <Image
                  alt="Logo"
                  className="w-[8rem]"
                  src="https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?w=826&t=st=1729060915~exp=1729061515~hmac=dc911f470a5362d31529331c2e5ba014647fd3219c2e050b0d34e03a59d6002e"
                  // {divisiData.logoUrl}
                  height={64}
                  width={64}
                />
                <div className="flex flex-col">
                  <h1 className={`text-[3rem] font-semibold ${divisiData.makomti === "himakom" ? "text-custom-blue" : "text-custom-orange"}`}>{divisiData.nama}</h1>
                  <h2>Deskripsi DIVISI</h2>
                </div>
              </div>
              {/* Status */}
              <div className="p-3 flex flex-col bg-custom-gray-dark rounded-lg w-full md:w-64 h-auto justify-between md:h-28">
                <h3 className="font-semibold">Status</h3>
                <div>
                  <div className="flex justify-between">
                    <h4>Pendaftar</h4>
                    <h4>5/10</h4>
                  </div>
                  {/* Button Pilih Divisi, nanti diganti Butotn terus dikasih onClick */}
                  <div className="w-full bg-custom-gray rounded-lg md:rounded-sm text-center py-1">
                    Pilih Divisi
                  </div>
                </div>
              </div>
            </div>
            {/* Tentang */}
            <div className="w-full space-y-3">
              <h1 className="font-semibold text-lg">Tentang Kami</h1>
              <div className="bg-custom-gray-dark p-3 rounded-lg text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                {/* React Markdown juga */}
              </div>
            </div>
            {/* Proyek */}
            <div className="w-full space-y-3">
              <h1 className="font-semibold text-lg">Proyek / Program Kerja / Kegiatan</h1>
              {/* PAKE SWIPERZZZZZZZZZZZZZ */}
              <div>
                
              </div>
            </div>
          </div>
          {/* Penugasan */}
          <div className="w-full bg-custom-gray-dark rounded-lg h-auto p-3 xl:h-full xl:w-[30vw]">
            <h1 className={`${divisiData.makomti == "himakom" ? "text-custom-blue" : "text-custom-orange"} mb-4`}>Penugasan</h1>
            
            {/* Nanti penugasan pake react markdown */}
            <div className="mt-2 space-y-3">
              <div>
                <h1 className="font-medium mb-1">Brief Penugasan</h1>
                <div className="w-full text-justify leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </div>
              </div>

              <div>
                <h1 className="font-medium mb-1">Keperluan</h1>
                <div className="w-full bg-custom-gray flex justify-center items-center rounded-sm py-1">Download Keperluan</div>
              </div>

              <div className="space-y-1">
                <h1 className="font-medium">Pengumpulan</h1>
                <h2 className="">Pengumpulan berupa link Google Drive / GitHub</h2>
                <input type="text" placeholder="Ketik Link" className="w-full bg-[#535362] text-left py-1 pl-2" />
                <div className="w-full bg-custom-gray flex justify-center items-center rounded-sm py-1">Submit</div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Page;
