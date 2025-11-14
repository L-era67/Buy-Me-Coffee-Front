"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

import { ChevronDown } from "lucide-react";
import { AmountType } from "@/types/types";

const amounts = [
  { amount: "$1" },
  { amount: "$2" },
  { amount: "$5" },
  { amount: "$10" },
  { amount: "All" },
];

export const Amount = ({ amountSelected, handleAmountSelect }: AmountType) => {
  return (
    <div className="mt-8 flex justify-between items-center">
      <p className="font-semibold text-lg text-gray-800">Recent Transactions</p>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <span className="text-gray-600">Amount:</span>
              <span className="ml-2 font-medium text-gray-900">
                {amountSelected || "All"}
              </span>
              <ChevronDown className="ml-3 h-4 w-4 text-gray-400"></ChevronDown>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              {amounts?.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => handleAmountSelect(item.amount)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                >
                  <span
                    className={
                      amountSelected === item.amount ? "font-semibold" : ""
                    }
                  >
                    {item.amount}
                  </span>
                  {amountSelected === item.amount && (
                    <Checkbox
                      checked
                      className="ml-auto h-4 w-4 text-indigo-600"
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
