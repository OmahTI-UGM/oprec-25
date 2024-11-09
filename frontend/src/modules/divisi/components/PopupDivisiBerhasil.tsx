'use client'
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function PopupDivisiBerhasil({ open, onClose }: { open: boolean; onClose:()=>void }) {

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="rounded-lg bg-custom-gray-dark p-0 w-[90vw] xxs:w-[76vw] xs:w-[56vw] sm:w-[48vw] md:w-[40vw] lg:w-[38vw] xl:w-[30vw] 2xl:w-[25vw] h-auto">
        <div className="h-14 sm:h-20 lg:h-24 bg-custom-black rounded-t-lg" />

        <div className="absolute left-1/2 -translate-x-1/2 top-[25px] sm:top-[35px] lg:top-[40px]">
          <div className="relative bg-custom-black rounded-full p-3 sm:p-4 lg:p-6 border border-white w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 flex items-center justify-center">
            <Check className="h-10 sm:h-12 lg:h-16 w-10 sm:w-12 lg:w-16 text-white" />
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8 lg:mt-16 px-4">
          <p className="text-white text-sm mb-0 sm:mb-1 lg:mb-2">Konfirmasi Jadwal</p>
          <h2 className="text-white text-xl lg:text-2xl font-bold mb-0 sm:mb-1 lg:mb-2">Pilih Divisi Berhasil</h2>
          <p className="text-white text-sm mb-4">Jangan lupa mengerjakan tugas</p>
        </div>

        <div className="flex flex-col-reverse xxs:flex-row lg:flex-row justify-center items-center gap-2 p-4 pt-0 lg:pt-4 sm:px-4">
          <AlertDialogAction asChild>
            <Button onClick={onClose} className="w-full h-8 sm:h-10 lg:h-12 text-sm lg:text-base">
              Selesai
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
