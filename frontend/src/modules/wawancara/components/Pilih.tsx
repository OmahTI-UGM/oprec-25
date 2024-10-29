import { CalendarDays } from "lucide-react";
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
      <AlertDialogContent className="rounded-lg bg-custom-gray-dark p-0 w-[80vw] xxs:w-[70vw] xs:w-[50vw] md:w-[35vw]  lg:w-[38vw] xl:w-[30vw] 2xl:w-[25vw] h-auto">
        {/* Reduced height for top background */}
        <div className="h-14 sm:h-20 lg:h-24 bg-custom-black rounded-t-lg" />
        
        {/* Adjusted calendar icon position and size */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[25px] sm:top-[35px] lg:top-[40px]">
          <div className="relative bg-custom-black rounded-full p-3 sm:p-4 lg:p-6 border border-white w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 flex items-center justify-center">
            <CalendarDays className="h-10 sm:h-12 lg:h-16 w-10 sm:w-12 lg:w-16 text-white" />
          </div>
        </div>

        {/* Reduced vertical spacing */}
        <div className="text-center space-y-1 sm:space-y-2 mt-6 sm:mt-8 lg:mt-16 px-4">
          <p className="text-white text-xxs sm:text-xs lg:text-sm mb-2 sm:mb-4">Konfirmasi Jadwal</p>
          <h2 className="text-white text-md xs:text-lg sm:text-xl lg:text-2xl font-bold">Kamu Sudah Yakin?</h2>
          <p className="text-white text-xxs sm:text-xs lg:text-sm">Pilihan Jadwal Tidak Dapat Dirubah</p>
        </div>
        
        {/* Compact button section */}
        <div className="flex flex-col-reverse xxs:flex-row lg:flex-row justify-center items-center gap-2 p-4 pt-0 lg:pt-4 sm:px-4">
          <AlertDialogCancel className="mt-0" asChild>
            <Button variant={"outline"} className="w-full lg:w-1/2 h-8 sm:h-10 text-sm lg:text-base">
              Batal
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="w-full lg:w-1/2 h-8 sm:h-10 text-sm lg:text-base">
              Pilih
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}