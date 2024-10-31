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
import { Smile } from "lucide-react";

const Pengumuman = () => {
  return (
    <div className="space-y-8">
      <Title />
      <div className="flex flex-col h-96 items-center justify-center gap-4 rounded-xl bg-custom-gray-dark p-6">
        <Smile size={100} />
        <h1 className="text-xl text-center font-medium">kamu dapat membuka pengumuman</h1>
        <HasilButton />
      </div>
    </div>
  );
};

// title
const Title = () => (
  <div>
    <h1 className="text-2xl font-semibold sm:text-4xl">Pengumuman</h1>
    <p className={``}>
      Kamu dapat membuka hasil pengumuman{" "}
      <span className={`font-semibold`}>Open Recruitment</span>
    </p>
  </div>
);

const HasilButton = ({ className }: { className?: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-base" size={`lg`} variant={`white`}>Buka Pengumuman</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Pengumuman;
