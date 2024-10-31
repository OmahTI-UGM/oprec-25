import Container from "@/components/Container";
import AdminDashboard from "@/modules/admin/adminDashboard";

const Page = () => {
  return (
    <Container parentClass={`pt-0 w-screen lg:w-[80vw] lg:pt-8 min-h-screen`}>
      <AdminDashboard />
    </Container>
  );
};

export default Page;
