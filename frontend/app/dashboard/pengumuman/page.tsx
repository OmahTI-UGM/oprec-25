import Container from "@/components/Container";
import Pengumuman from "@/modules/pengumuman/pengumuman";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengumuman",
  description: "ISINYA PENGUMUMAN DEH",
};

export default function Page(): JSX.Element {
  return (
    <Container parentClass={`pt-0 lg:pt-8 min-h-screen`}>
        <Pengumuman />
    </Container>
  );
}
