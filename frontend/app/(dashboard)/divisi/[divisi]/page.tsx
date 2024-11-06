import { notFound } from "next/navigation";
import ButtonLink from "@/components/ui/ButtonLink";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import PopupUrutan from "@/modules/divisi/components/PopupUrutan";
import { Logos } from "@/utils/types";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ProjectsSwiper from "@/modules/divisi/components/ProjectSwiper";

import Penugasan from "@/modules/divisi/slug/components/Penugasan";

import { getOneDivisi, getPenugasanUser } from "@/utils/fetch";
import { cookies } from "next/headers";
type DivisiPageProps = {
  params: {
    divisi: string;
  };
};

const Page = async ({ params }: DivisiPageProps) => {
  const accessToken = cookies().get("accessToken")?.value;
  const divisiData = await getOneDivisi(params.divisi, accessToken as string);
  const {penugasan} = await getPenugasanUser(params.divisi, accessToken as string);
  if (!divisiData) {
    notFound();
  }

  return (
    <>
      <section
        className={`relative bg-transparent ${divisiData.himakom === true ? "bg-gradient-to-b from-custom-blue to-custom-black to-30%" : "via-cus bg-gradient-to-b from-custom-orange to-custom-black to-30%"}`}
      >
        <Container
          className="flex flex-col gap-4 xl:flex-row"
          parentClass="bg-transparent"
        >
          {/* left side 70% */}
          <div className="space-y-6 xl:w-[70%]">
            {/* button to go back to divisi */}
            <ButtonLink href="/divisi">
              <ArrowLeft className="h-5" />
              Kembali
            </ButtonLink>

            <div className="flex flex-col justify-between space-y-3 md:flex-row md:items-end lg:flex-grow xl:pr-0">
              <Title data={divisiData} slug={params.divisi}/>
              {/* Status */}
              <Progress progress={divisiData.dipilihOleh.length} slots={divisiData.slots} params={params.divisi} />
            </div>

            {/* Tentang */}
            <About text={divisiData.deskripsi} />

            {/* Proyek */}
            <ProjectsSwiper divisiData={divisiData.proker} />
          </div>

          {/* right side 30% */}
          <Penugasan data={divisiData} existingPenugasan={penugasan}/>
        </Container>
      </section>
    </>
  );
};

const Title = ({
  data,
  slug,
}: {
  data: {
    himakom: boolean;
    judul: string;
    judulPanjang: string;
    logoUrl: string;
  };
  slug: string
}) => {
  return (
    <div className="flex items-end gap-4">
      <Image
        alt="Logo"
        className="w-[8rem]"
        src={
          Logos[slug as keyof typeof Logos] ??
          "https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?w=826&t=st=1729060915~exp=1729061515~hmac=dc911f470a5362d31529331c2e5ba014647fd3219c2e050b0d34e03a59d6002e"
        }
        // {divisiData.logoUrl}
        height={0}
        width={0}
      />
      <div className="flex flex-col">
        <h1
          className={`text-[3rem] font-semibold ${data.himakom === true ? "text-custom-blue" : "text-custom-orange"}`}
        >
          {data.judul}
        </h1>
        <h2 className="italic">{data.judulPanjang}</h2>
      </div>
    </div>
  );
};

const About = ({ text }: { text: string }) => {
  return (
    <div className="w-full space-y-3 xl:pr-0">
      <h1 className="text-lg font-semibold">Tentang Kami</h1>
      <div className="rounded-lg bg-custom-gray-dark p-3 text-pretty">
        {text}
        {/* React Markdown juga */}
      </div>
    </div>
  );
};

const Progress = ({
  progress = 5,
  slots = 10,
  params,
}: {
  progress?: number;
  slots?: number;
  params: string;
}) => {
  return (
    <div className="flex h-auto w-full flex-col justify-between gap-2 rounded-lg bg-custom-gray-dark p-3 md:w-64">
      <h3 className="font-semibold">Status</h3>
      <div className="flex justify-between">
        <h4>Pendaftar</h4>
        <h4>{progress}/{slots}</h4>
      </div>
      <PopupUrutan slug={params} />
    </div>
  );
};

export default Page;
