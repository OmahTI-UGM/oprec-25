import { redirect } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";
import Navbar from "@/components/Navbar";
import Beranda from "@/modules/beranda";
import Layout from "@/../app/(dashboard)/layout";
import "./globals.css";
import Footer from "@/components/Footer";

export default function Home() {
  const user = getCurrentUser();

  if (user) {
    return (
      <Layout>
        <p>nigger</p>
      </Layout>
    )
  }
  return (
    <>
      <Navbar />
      <Beranda />
      <Footer />
    </>
  );
}
