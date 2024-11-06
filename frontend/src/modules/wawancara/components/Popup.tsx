import { useState } from "react";
import { X, Check, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ErrorPopup from "@/components/ErrorPopup";
interface ScheduleSlot {
  id: string;
  sesi: Date;
  himakom: boolean;
}

interface PopupProps {
  type: "gagal" | "berhasil" | "konfirmasi";
  className?: string;
  selectedSlot: ScheduleSlot | null; // Pass selected slot information
}

export default function Popup({ type, className, selectedSlot }: PopupProps) {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const getContent = () => {
    switch (type) {
      case "gagal":
        return {
          icon: <X className="h-10 sm:h-12 lg:h-16 w-10 sm:w-12 lg:w-16 text-white" />,
          title: "Isi Divisi Terlebih Dahulu",
          subtitle: "Sebelum memilih pilihan wawancara",
          headerText: "Akses Wawancara",
          buttonLabel: "Selesai",
          cancelable: false,
        };
      case "berhasil":
        return {
          icon: <Check className="h-10 sm:h-12 lg:h-16 w-10 sm:w-12 lg:w-16 text-white" />,
          title: "Pilih Jadwal Berhasil",
          subtitle: "Sampai jumpa di hari Wawancara",
          headerText: "Konfirmasi Jadwal",
          buttonLabel: "Selesai",
          cancelable: false,
        };
      case "konfirmasi":
        return {
          icon: <CalendarDays className="h-10 sm:h-12 lg:h-16 w-10 sm:w-12 lg:w-16 text-white" />,
          title: "Kamu Sudah Yakin?",
          subtitle: "Pilihan Jadwal Tidak Dapat Dirubah",
          headerText: "Konfirmasi Jadwal",
          buttonLabel: "Pilih",
          cancelable: true,
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  const handleConfirm = async () => {
    const hima = selectedSlot?.himakom ? "hima" : "oti";
    if (type === "konfirmasi" && selectedSlot) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wawancara/${hima}/${selectedSlot.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jamWawancara: selectedSlot.sesi,
          }),
          credentials: 'include'
        });
        const responseJSON = await response.json();
        if (response.ok) {
          console.log("Schedule confirmed successfully.");
          // Handle successful confirmation here (e.g., show success popup)
        } else {
          setErrorMessage(responseJSON.message);
          setShowErrorModal(true);
          console.error("Failed to confirm schedule.");
        }
      } catch (error) {
        console.error("Error confirming schedule:");
      }
    }
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
  }

  return (
    <AlertDialog>
      {showErrorModal && <ErrorPopup open={showErrorModal} onErrorClose={handleErrorClose} errorMessage={errorMessage || ""}/>}
      <AlertDialogTrigger asChild>
        <Button className="w-20 sm:w-24 lg:w-32 text-sm lg:text-md tracking-wide">Pilih</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg bg-custom-gray-dark p-0 w-[90vw] xxs:w-[76vw] xs:w-[56vw] sm:w-[48vw] md:w-[40vw] lg:w-[38vw] xl:w-[30vw] 2xl:w-[25vw] h-auto">
        <div className="h-14 sm:h-20 lg:h-24 bg-custom-black rounded-t-lg" />

        <div className="absolute left-1/2 -translate-x-1/2 top-[25px] sm:top-[35px] lg:top-[40px]">
          <div className="relative bg-custom-black rounded-full p-3 sm:p-4 lg:p-6 border border-white w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 flex items-center justify-center">
            {content.icon}
          </div>
        </div>
        <div className="text-center mt-6 sm:mt-8 lg:mt-16 px-4">
          <p className="text-white text-sm mb-0 sm:mb-1 lg:mb-2">{content.headerText}</p>
          <h2 className="text-white text-xl lg:text-2xl font-bold mb-0 sm:mb-1 lg:mb-2">{content.title}</h2>
          <p className="text-white text-sm mb-4">{content.subtitle}</p>
        </div>

        <div className="flex flex-col-reverse xxs:flex-row lg:flex-row justify-center items-center gap-2 p-4 pt-0 lg:pt-4 sm:px-4">
          {content.cancelable && (
            <AlertDialogCancel asChild>
              <Button variant={"outline"} className="w-full lg:w-1/2 h-8 sm:h-10 lg:h-12 text-sm lg:text-base mt-0">
                Batal
              </Button>
            </AlertDialogCancel>
          )}
          <AlertDialogAction asChild>
            <Button 
              onClick={handleConfirm} // Trigger confirmation request
              className={`w-full ${content.cancelable ? "lg:w-1/2" : ""} h-8 sm:h-10 lg:h-12 text-sm lg:text-base`}
            >
              {content.buttonLabel}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
