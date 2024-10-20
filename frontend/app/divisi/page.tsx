import Divisi from "@/modules/divisi/divisi";
import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divisi",
  description: "ISINYA DIVISI DEH",
};

export default function Page(): JSX.Element {
  return (
    <Container parentClass={`h-[100vh]`}>
      <Divisi />
    </Container>
  );
}
