import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import SmoothScrolling from "@/contexts/SmoothScroll";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrolling>
      <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-grow">
        <Navbar />
        {children}
      </div>
    </div>
    </SmoothScrolling>
  );
}
