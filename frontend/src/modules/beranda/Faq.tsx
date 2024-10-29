import Container from "@/components/Container";
import Header from "./components/Header";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const OMAHTI_FAQ = [
  {
    question: "Apa itu OmahTI?",
    answer: "Sample answer",
  },
  {
    question: "Sample Question",
    answer: "Sample answer",
  },
  {
    question: "Sample Question",
    answer: "Sample answer",
  },
];

const HIMAKOM_FAQ = [
  {
    question: "Sample Question",
    answer: "Sample answer",
  },
  {
    question: "Sample Question",
    answer: "Sample answer",
  },
];

const Faq = () => {
  return (
    <Container>
      <Header>Empowering Individuals, Building Communities</Header>

      {/* images card */}
      <div className="mb-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <ImagesCard variant="omahti" />
        <ImagesCard variant="himakom" />
      </div>

      {/* accordion faqs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-3">
        <Questions variant="omahti" FAQ={OMAHTI_FAQ} />
        <Questions variant="himakom" FAQ={HIMAKOM_FAQ} />
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
    <div className="relative flex min-h-52 flex-col justify-end overflow-hidden rounded-xl p-4">
      <Image
        className="z-0 object-cover"
        sizes="100%"
        src={`placeholder.svg`}
        alt="Placeholder"
        fill
      />

      <p className="z-20 text-xl font-semibold text-custom-silver">
        {variant === "omahti"
          ? "We Make IT for Everyone"
          : "Computer Love and Life"}
      </p>

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-custom-black/70 to-transparent" />
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
    <div className="space-y-2">
      <div className="w-full rounded-lg bg-custom-gray-dark p-2 text-sm font-semibold">
        Frequently Asked Questions -{" "}
        {variant === "omahti" ? (
          <span className="text-custom-orange">OmahTI</span>
        ) : (
          <span className="text-custom-blue">Himakom</span>
        )}
      </div>

      <div className="space-y-2">
        {FAQ.map((faq, i) => (
          <Accordion type="single" collapsible>
            <AccordionItem className="border-b-0" value="item-1">
              <AccordionTrigger className="rounded-lg bg-custom-gray-dark p-2 py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='mt-2 p-2 rounded-lg bg-custom-gray'>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
