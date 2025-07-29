"use client";
import { ChevronDown, CoffeeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Header = () => {
  return (
    <div className="justify-between flex mx-30 my-4 ">
      <p className="font-bold flex gap-[10px]">
        <CoffeeIcon className="w-6" />
        Buy Me Coffee
      </p>
      <div>
        <div className="flex gap-2">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <p className="w-[83px] pt-1">Jake</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-none">
                <ChevronDown></ChevronDown>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[187px]">
              <Button variant="outline" className="border-none ">
                Log Out
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
