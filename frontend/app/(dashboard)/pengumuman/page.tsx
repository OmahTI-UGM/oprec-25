import Container from "@/components/Container";
import Pengumuman from "@/modules/pengumuman/pengumuman";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengumuman",
  description: "ISINYA PENGUMUMAN DEH",
};

export default function Page(): JSX.Element {
  return <Pengumuman />;
}
