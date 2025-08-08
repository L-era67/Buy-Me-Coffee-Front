"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Coffee } from "lucide-react";
import { useContext, useState } from "react";
import { QRdialog } from "./QR-Dialog";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { UserContext } from "@/provider/currentUserProvider";

import { LoaderCoffee } from "../loading.tsx/loader";
import { toast } from "sonner";
import { DonationComplatePage } from "./succes";

type DonationSupportType = {
  isEditable: boolean;
  userid: number;
  name: string;
};

export const DonationBuyCoffeeCart = ({
  isEditable,
  userid,
  name,
}: DonationSupportType) => {
  const [amount, setAmount] = useState(0);

  const [socialUrl, setSocialUrl] = useState("");
  const [specialMsg, setSpecialMsg] = useState("");

  const [loading, setLoading] = useState(false);

 

  const { userProvider } = useContext(UserContext);

  console.log("DONAR id :", userProvider.id);
  console.log("RECIPIENT ID:", userid);

  const handleSupport = async () => {
    setLoading(true);
    axios
      .post("http://localhost:4001/donation/create-donation", {
        amount,
        donorId: userProvider.id,
        recipientId: userid,
        socialURLOrBuyMeACoffee: socialUrl,
        specialMesssage: specialMsg,
      })
      .then((response) => {
        console.log("responseeee:", response);
        if (response.status === 200) {
  
          toast.custom((t) => <div className="bg-white p-4 rounded-lg w-[600px] flex flex-col items-center">
            <DonationComplatePage />
          </div>, {
            position: "top-center",
            duration: 3000,
          
          });
        }

        console.log("ok");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    // console.log("handleSupport:", response.data);
  };

  return (
    <div>
      {loading && <LoaderCoffee />}
      <div className="p-6 border w-[632px] h-[509px] rounded-lg bg-white">
        <div className="flex flex-col gap-6 ">
          <h1 className="font-semibold">Buy &quot;{name}&quot; a Coffee</h1>

          <div className="flex flex-col gap-2">
            <p className="font-medium">Select amount:</p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="cursor-pointer hover:bg-gray-400  focus:border-2 border-black"
                onClick={() => setAmount(1)}
              >
                <Coffee />
                $1
              </Button>
              <Button
                variant="secondary"
                className="cursor-pointer hover:bg-gray-400  focus:border-2 border-black"
                onClick={() => setAmount(2)}
              >
                <Coffee />
                $2
              </Button>
              <Button
                variant="secondary"
                className="cursor-pointer hover:bg-gray-400  focus:border-2 border-black"
                onClick={() => setAmount(5)}
              >
                <Coffee />
                $5
              </Button>
              <Button
                variant="secondary"
                className="cursor-pointer hover:bg-gray-400  focus:border-2 border-black"
                onClick={() => setAmount(10)}
              >
                <Coffee />
                $10
              </Button>
              <p className="p-2 h-9 w-9 flex justify-center items-center bg-black text-white rounded-md">
                {amount}
              </p>
            </div>
          </div>
        </div>

        <div className="grid items-center gap-2 pt-8">
          <Label htmlFor="text" className="font-medium">
            Enter BuyMeCoffee or social acount URL:
          </Label>
          <Input
            type="url"
            id="text"
            placeholder="buymeacoffee.com/"
            className="w-full"
            onChange={(e) => setSocialUrl(e.target.value)}
          />
        </div>

        <div className="grid items-center gap-2 pt-5">
          <Label htmlFor="text" className="font-medium">
            Special message:
          </Label>
          <Textarea
            //   type="text"
            id="text"
            placeholder="Please write your message here"
            className="w-full h-[131px] resize-none"
            onChange={(e) => setSpecialMsg(e.target.value)}
          />
        </div>
        <div className="w-full mt-8">
          {!isEditable ? (
            <QRdialog handleSupport={handleSupport} />
          ) : (
            <Button className="w-full" disabled={true}>
              Support
            </Button>
          )}
        </div>
        {/* <Button className="w-full mt-8" onClick={handleSupport}>
          Support
        </Button> */}
      </div>
    </div>
  );
};
