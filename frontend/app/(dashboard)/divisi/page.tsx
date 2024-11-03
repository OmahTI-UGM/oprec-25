import Divisi from "@/modules/divisi/divisi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divisi",
  description: "ISINYA DIVISI DEH",
};

export default function Page(): JSX.Element {
  return <Divisi />;
}