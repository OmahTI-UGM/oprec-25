import Makomti from "@/modules/beranda/makomti/Makomti";

interface PageProps {
  params: {
    makomti: string;
  };
}

export default function Page({ params }: PageProps) {
  const { makomti } = params;

  return <Makomti makomti={makomti} />;
}