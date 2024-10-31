import Divisi from "./components/Divisi";

const AdminDashboard = () => {
  return (
    <>
      <Title />

      <div className={`space-y-6`}>
        <Divisi variant={`omahti`} />
        <Divisi variant={`himakom`} />
      </div>
    </>
  );
};

const Title = () => (
  <>
    <h1 className="text-2xl font-semibold sm:text-4xl">Halaman Admin</h1>
    <p className={`mb-8`}>Kamu hanya dapat melihat divisi yang kamu pegang</p>
  </>
);

export default AdminDashboard;
