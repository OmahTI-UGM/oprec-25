import { getCurrentUser } from "@/utils/auth";
import Navbar from "@/components/Navbar";
import Beranda from "@/modules/beranda";
import Layout from "@/../app/(dashboard)/layout";
import "./globals.css";
import Footer from "@/components/Footer";

export default async function Home() {
  try {
    const user = await getCurrentUser();
    
    if (user) {
      return (
        <Layout>
          <div>nigger {user.username}</div>
        </Layout>
      );
    }

    return (
      <>
        <Navbar />
        <Beranda />
        <Footer />
      </>
    );
  } catch (error) {
    // Fallback to non-authenticated view if there's an error
    return (
      <>
        <Navbar />
        <Beranda />
        <Footer />
      </>
    );
  }
}