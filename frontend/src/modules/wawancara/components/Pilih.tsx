import { CalendarDays, LogOut as LogOutIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Pilih({ className }: { className?: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-32 text-md tracking-wide">Pilih</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-custom-gray-dark p-0 overflow-hidden">
        {/* Top background section */}
        <div className="h-40 bg-custom-black" />
        {/* Calendar icon centered between backgrounds */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "100px" }}>
          <div className="relative bg-custom-black rounded-full p-6 border border-white w-28 h-28 flex items-center justify-center">
            <CalendarDays className="h-20 w-20 text-white" />
          </div>
        </div>

        <div className="text-center space-y-2 mt-12">
          <p className="text-white text-base mb-6">Konfirmasi Jadwal</p>
          <h2 className="text-white text-3xl font-bold">Kamu Sudah Yakin?</h2>
          <p className="text-white text-base">Pilihan Jadwal Tidak Dapat Dirubah</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-8 px-10 py-8">
          <AlertDialogCancel asChild>
            <Button variant={"outline"} className="h-12 text-xl">Batal</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="h-12 text-xl">Pilih</Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};