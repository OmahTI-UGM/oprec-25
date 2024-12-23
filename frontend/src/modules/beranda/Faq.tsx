import Container from "@/components/Container";
import Header from "./components/Header";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HIMAKOM_FAQ, OMAHTI_FAQ } from "@/lib/utils";
import himakomFaq from "@/assets/beranda/faq/faq-himakom.webp";
import omahtiFaq from "@/assets/beranda/faq/faq-oti.webp";

const Faq = () => {
  return (
    <Container>
      <Header>Empowering Individuals, Building Communities</Header>
      <div className="w-full lg:flex lg:items-start lg:justify-start gap-8 lg:gap-3 space-y-3 lg:space-y-0">
        <div className="flex flex-col gap-3 lg:w-1/2">
          {/* images card */}
          <div className="lg:mb-8 grid grid-cols-1 gap-3">
            <ImagesCard variant="omahti" />
            {/* <ImagesCard variant="himakom" /> */}
          </div>

          {/* accordion faqs */}
          <div className="grid grid-cols-1 gap-8 lg:gap-3">
            <Questions variant="omahti" FAQ={OMAHTI_FAQ} />
            {/* <Questions variant="himakom" FAQ={HIMAKOM_FAQ} /> */}
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:w-1/2">
          <div className="lg:mb-8 grid grid-cols-1 gap-3">
            {/* <ImagesCard variant="omahti" /> */}
            <ImagesCard variant="himakom" />
          </div>

          {/* accordion faqs */}
          <div className="grid grid-cols-1 gap-8 lg:gap-3">
            {/* <Questions variant="omahti" FAQ={OMAHTI_FAQ} /> */}
            <Questions variant="himakom" FAQ={HIMAKOM_FAQ} />
          </div>
        </div>
      </div>
    </Container>
  );
};

const ImagesCard = ({
  variant = "omahti",
}: {
  variant?: "omahti" | "himakom";
}) => {
  return (
    <div 
      className="relative flex min-h-52 flex-col justify-end overflow-hidden rounded-xl p-4"
      data-gsap={`${variant === "omahti" ? "right" : "left"}`}
    >
      <Image
        className="z-0 object-cover"
        sizes="100%"
        src={variant === "omahti" ? omahtiFaq : himakomFaq}
        alt=""
        fill
      />

      <p className="z-20 text-2xl font-semibold text-custom-silver">
        {variant === "omahti"
          ? "We Make IT for Everyone"
          : "Computer Love and Life"}
      </p>

      {/* gradient */}
      <div className={`absolute inset-0 bg-gradient-to-t from-custom-black/70 ${variant === 'omahti' ? 'to-custom-orange/30': 'to-custom-blue/30'}`} />
    </div>
  );
};

const Questions = ({
  variant = "omahti",
  FAQ,
}: {
  variant?: "omahti" | "himakom";
  FAQ: { question: string; answer: string }[];
}) => {
  return (
    <div className="space-y-3">
      <div className="w-full rounded-lg bg-custom-gray-dark px-4 py-3 font-semibold">
        Frequently Asked Questions -{" "}
        {variant === "omahti" ? (
          <span className="text-custom-orange">OmahTI</span>
        ) : (
          <span className="text-custom-blue">Himakom</span>
        )}
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {FAQ.map((faq, i) => (
          <AccordionItem 
            key={i} 
            className="border-b-0" 
            value={`item-${i}`}
            data-gsap="down"
          >
            <AccordionTrigger className="rounded-lg bg-custom-gray-dark text-base p-4 py-5 hover:no-underline text-justify">
              {faq.question}
              <span className="ml-4" />
            </AccordionTrigger>
            <AccordionContent className='text-base mt-2 py-3 px-4 rounded-lg bg-custom-gray-light text-justify text-custom-black font-medium'>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;