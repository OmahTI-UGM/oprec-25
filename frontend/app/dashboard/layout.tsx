import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-grow">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
