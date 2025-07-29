import { Button } from "@/components/ui/button";
import { ChevronDown, SquareArrowOutUpRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const earnings = [
  {
    earns: "450$",
  },
];
const amount = [
  {
    amount: "1$",
  },
  {
    amount: "2$",
  },
  {
    amount: "5$",
  },
  {
    amount: "10$",
  },
];

export const AccountEarnings = () => {
  return (
    <div className="">
      <div className="border-2 w-[907px] h-[257px] border-[#E4E4E7] rounded-lg">
        <div className="mx-6 my-6 flex justify-between ">
          <div className="flex gap-4 items-center">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-bold">Jake</p>
              <p>buymeacoffee.com/baconpancakes1</p>
            </div>
          </div>
          <div>
            <Button>
              <SquareArrowOutUpRight></SquareArrowOutUpRight>
              Share Page Link
            </Button>
          </div>
        </div>
        <div className="border-1 border-[#E4E4E7] w-[859px] mx-6"></div>
        <div className="mx-6 my-4 ">
          <div className="flex gap-4 items-center">
            <p className="font-[600] text-[20px]">Earnings</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Select <ChevronDown></ChevronDown>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                <DropdownMenuItem>All time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            {earnings.map((earn, index) => (
              <div key={index}>
                <p className="mt-5 font-[700] text-[36px]">{earn.earns}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
