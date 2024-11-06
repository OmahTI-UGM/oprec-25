'use client'
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { Logos } from '@/utils/types';

const AdminDashboard = ({allUsers, admin}: {allUsers: any, admin: any}) => {
  const handleApprove = async (userId: string, acceptDivisionId: string) => {
    try {
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
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-custom-black text-white">
      {/* Header */}
      <div className="mb-8">
        <button className="flex items-center text-gray-300 hover:text-white mb-6">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Kembali
        </button>
        
        <div className="flex items-start gap-6 justify-center h-[8rem]">
          <Image src={Logos[admin.username as keyof typeof Logos]} alt="" width={0} height={0} className="h-full w-auto"/>
          <div className="flex-1 justify-center items-center h-full">
            <h1 className="text-5xl font-semibold h-full flex items-center">{(admin.username as string).toUpperCase()}</h1>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-custom-gray-dark rounded-lg overflow-hidden">
        <div className="px-6 py-4 text-lg font-medium">Informasi Pendaftar</div>
        <table className="w-full text-center">
          <thead>
            <tr className="bg-custom-gray">
              <th className="px-6 py-3 text-sm font-medium">No</th>
              <th className="px-6 py-3 text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-sm font-medium">Penugasan</th>
              <th className="px-6 py-3 text-sm font-medium">Diterima Di</th>
            </tr>
          </thead>
          <tbody>
            {allUsers && allUsers.length > 0 ? (
              allUsers.map((user: any, index: number) => (
                <tr key={user._id} className="border-t border-gray-700">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 text-justify">{user.username}</td>
                  <td className="px-6 py-4">
                    {(user.tugas.length > 0) ? (
                      <span className="text-green-400">Sudah Mengumpulkan</span>
                    ) : (
                      <span className="text-red-500">Belum Mengumpulkan</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                  {
                    (user.tugas.length > 0) ? (
                      <a 
                      className="px-4 py-2 bg-black hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 text-sm"
                      href={user.tugas}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Unduh
                    </a>
                    ) : (
                      <button 
                      className="py-2 text-custom-gray-light rounded-lg text-sm"
                      disabled
                    >
                      Belum ada penugasan
                    </button>
                    )
                  }
                  </td>
                  <td className="px-6 py-4">
                  {!user.diterimaDi ? (
                      <button 
                        className="px-4 py-2 bg-yellow-400 hover:bg-white hover:text-black border-custom-black text-custom-black rounded-lg gap-2 text-sm"
                        onClick={() => handleApprove(user._id, user.adminDivision._id)}
                      >
                        Pencet untuk approve user ke divisimu
                      </button>
                    ) : (
                      <button 
                        className="py-2 text-custom-white rounded-lg text-sm"
                        disabled
                      >
                        User sudah diterima di <span className='text-red-500'>{user.diterimaDi.judul}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;