import Header from "@/modules/beranda/components/Header";
import Container from "@/components/Container";
import Image from "next/image";
import { LINIMASA_DETAIL } from "@/lib/utils";
import timelineImage from "@/../public/assets/beranda/timeline/tipis.jpeg";

const Linimasa = () => {
  return (
    <Container>
      <Header>
        Timeline <span className="text-custom-orange">Open</span>{" "}
        <span className="text-custom-blue">Recruitment</span>
      </Header>

      <div className="grid grid-cols-1 sm:grid-rows-2 lg:grid-rows-1 lg:gap-8 lg:grid-cols-2 gap-3 lg:auto-cols-fr sm:auto-rows-fr">
        {/* image */}
        <ImageCard />

        {/* timeline */}
        <div className="grid auto-rows-fr grid-cols-1 lg:gap-6 sm:grid-cols-2 gap-3">
          {LINIMASA_DETAIL.map((detail, i) => (
            <LinimasaCard
              key={i}
              title={detail.title}
              date={detail.date}
              description={detail.description}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

const ImageCard = () => (
  <div className="relative h-full min-h-40 w-full overflow-hidden rounded-xl" data-gsap="down">
    <Image
      className="object-cover"
      sizes="100%"
      src={timelineImage}
      alt=""
      fill
    />
  </div>
);

const LinimasaCard = ({
  title,
  date,
  description,
}: {
  title: string;
  date: string;
  description: string;
}) => (
  <div className="flex w-full flex-col justify-between space-y-3 rounded-xl bg-custom-gray-dark p-4" data-gsap="up">
    {/* top part */}
    <div className="*:font-medium">
      <h1 className="text-xl">{title}</h1>
      <h2>{date}</h2>
    </div>

    {/* bottom part */}
    <p className="text-pretty">{description}</p>
  </div>
);

export default Linimasa;
