import Divisi from "@/modules/divisi/divisi";
import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divisi",
  description: "ISINYA DIVISI DEH",
};

export default function Page(): JSX.Element {
  return (
    <Container parentClass={`pt-0 max-w-[100vw] lg:max-w-[80vw] lg:pt-8`}>
      <Divisi />
    </Container>
  );
}
