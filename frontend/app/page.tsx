import { getCurrentUser } from "@/utils/auth";
import Navbar from "@/components/Navbar";
import Beranda from "@/modules/beranda";
import DashboardLayout from "@/(dashboard)/layout";
import "./globals.css";
import Footer from "@/components/Footer";

export default async function Home() {
  try {
    const user = await getCurrentUser();
    
    if (user) {
      return (
        <DashboardLayout>
          <div>nigger {user.username}</div>
        </DashboardLayout>
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