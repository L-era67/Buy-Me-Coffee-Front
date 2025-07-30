"use client";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const donationAmounts = [
  { amount: "$1" },
  { amount: "$2" },
  { amount: "$5" },
  { amount: "$10" },
];

export const Amount = () => {
  const [amountSelected, setAmountSelected] = useState("");
  const handleAmountSelect = (value: string) => {
    setAmountSelected(value);
  };
  return (
    <div className="mt-7 flex justify-between">
      <p className="font-[500] ">Recent transactions</p>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Amount {amountSelected} <ChevronDown></ChevronDown>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              {donationAmounts.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => handleAmountSelect(item.amount)}
                >
                  {item.amount}
                  {amountSelected === item.amount && (
                    <Checkbox
                      checked
                      className="ml-2 h-4 w-4  text-green-400"
                    />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
