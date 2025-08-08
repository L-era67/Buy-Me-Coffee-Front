"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";



export function QRdialog({ handleSupport }: { handleSupport: () => void }) {
  const handleSupportandSuccesPage = () => {

    handleSupport();

  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full">Support</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="m-auto">Scan QR code</DialogTitle>
            <DialogDescription className="m-auto">
              Scan the QR code to complete your donation
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button onClick={handleSupportandSuccesPage}>Send Donation</Button>
          </DialogClose>
        </DialogContent>
      </form>
    </Dialog>
  );
}
