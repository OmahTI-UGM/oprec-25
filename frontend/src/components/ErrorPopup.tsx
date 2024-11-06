
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

export default function ErrorPopup({
  open,
  onErrorClose,
  errorMessage,
}: {
  open: boolean;
  onErrorClose: () => void;
  errorMessage?: string;  // Optional error message from the backend
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="rounded-lg bg-custom-gray-dark p-0 w-[90vw] xxs:w-[80vw] xs:w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw] 2xl:w-[30vw] h-auto relative">
        
        {/* Top bar */}
        <div className="h-16 sm:h-20 lg:h-24 bg-custom-red rounded-t-lg flex items-center justify-center">
          <div className="relative bg-white rounded-full p-4 border-4 border-white w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 flex items-center justify-center">
            <X className="h-14 sm:h-16 lg:h-18 w-14 sm:w-16 lg:w-18 text-custom-red" />
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12 px-6">
          <h2 className="text-white text-xl lg:text-2xl font-bold mb-4">There's an error</h2>
          {/* Conditionally render the error message if it's passed */}
          {errorMessage ? (
            <p className="text-custom-red text-sm lg:text-base mt-4 mb-6">{errorMessage}</p> // Red color for error message
          ) : (
            <p className="text-white text-sm lg:text-base mb-6">Maaf, sepertinya ada error. Coba lagi nanti.</p>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-center items-center gap-4 p-6">
          <AlertDialogAction asChild>
            <Button
              onClick={onErrorClose}
              className="w-full sm:w-auto h-12 text-sm lg:text-base bg-custom-red hover:bg-custom-red text-white rounded-lg transition duration-200"
            >
              Tutup Popup
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
