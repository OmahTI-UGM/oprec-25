'use client'
import Divisi from "./components/Divisi";
const AdminDashboard = ({allUsers}: {allUsers: any}) => {
  const handleApprove = async (userId: string, acceptDivisionId: string) => {
    try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/adminonly/admin/`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userId, acceptDivisionId})
    });
    if (!res.ok) {
      throw new Error("Failed to approve user");
    }
  } catch (err) {

  }
  } 
  return (
    <>
      <div>
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user: any) => (
            <div key={user._id}>
              <h1>{user.username}</h1>
              <h2>{user.NIM}</h2>
              <h3>{user.isAdmin ? "Admin" : "User"}</h3>
              <h4>{user.enrolledSlugHima}</h4>
              <h5>{user.diterimaDi}</h5>
              {user.tugas.map((tugas: any) => (
                <div key={tugas.tugasId}>
                  <a href={tugas.link}>{tugas.link}</a>
                </div>
              ))}
              {user.divisiPilihan.map((divisi:any) => (
                <div key={divisi.divisiId}>
                  <h6>{divisi.divisiId.judul}</h6>
                  <h6>{divisi.urutanPrioritas}</h6>
                </div>
              ))}
              <button onClick={() => handleApprove(user._id, user.adminDivision._id)}>Approve</button>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
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
