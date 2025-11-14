"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, SquareArrowOutUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserContext } from "@/provider/currentUserProvider";
import { use, useContext, useEffect, useState } from "react";
import { ProfileType } from "@/types/DonationType";
import axios, { AxiosError } from "axios";
import { subDays } from "date-fns";

import { toast } from "sonner";

export const AccountEarnings = () => {
  const [selected, setSelected] = useState("Select");
  const [totalEarnings, setTotalEarnings] = useState<number>();
  const { userProvider } = useContext(UserContext);
  const [userData, setUserData] = useState({} as ProfileType);
  const [dateRange, setDateRange] = useState<{
    from: string;
    to: string;
  } | null>(null);
  console.log(process.env.BACKEND_URL);
  useEffect(() => {
    const getEarnings = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/total/${userProvider.id}?from=${dateRange?.from}&to=${dateRange?.to}`;

        const response = await fetch(url);
        const data = await response.json();
        setTotalEarnings(data.total);
      } catch (error) {
        toast.error("Error");
      }
    };
    if (userProvider.id) getEarnings();
  }, [userProvider.id, dateRange]);

  const handleSelect = (value: string) => {
    setSelected(value);
    const today = new Date();
    if (value === "Last 30 days") {
      const from = subDays(today, 1).toISOString();
      const to = today.toISOString();
      setDateRange({ from, to });
    } else if (value === "Last 90 days") {
      const from = subDays(today, 90).toISOString();
      const to = today.toISOString();
      setDateRange({ from, to });
    } else if (value === "All time") {
      setDateRange(null);
    }
  };

  const getDonationPage = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/view/${userProvider.username}`
      );

      const data = await response?.data;

      setUserData(data?.userProfile);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const errorMessage = (axiosError.response.data as { message: string })
          .message;

        if (errorMessage === "User profile not found.") {
          toast.error("Please enter your profile details!");
        } else {
          toast.error(`error ${errorMessage}`);
        }
      }
    }
  };

  useEffect(() => {
    if (!userProvider.username) return;
    getDonationPage();
  }, [userProvider.username]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(userData.socialMediaURL)
      .then(() => {
        alert("Page link copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="px-6 pt-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4 items-center flex-1 min-w-0">
            {userData.avatarImage ? (
              <img
                src={userData.avatarImage}
                alt="profile"
                className="w-12 h-12 rounded-full ring-2 ring-white shadow-md flex-shrink-0"
              />
            ) : (
              <img
                src="https://i.pinimg.com/originals/5c/44/45/5c4445eea6c9386d27b348af65ce8278.gif"
                alt="profile"
                className="w-12 h-12 rounded-full ring-2 ring-white shadow-md flex-shrink-0"
              />
            )}

            <div className="min-w-0">
              <p className="font-bold text-gray-900 text-lg truncate">
                {userData.name}
              </p>
              <p className="text-gray-500 text-sm truncate">
                {userData.socialMediaURL}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button
              onClick={handleShare}
              className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto"
            >
              <SquareArrowOutUpRight className="mr-2 h-4 w-4"></SquareArrowOutUpRight>
              Share Page
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 mx-6"></div>

        <div className="px-6 py-5">
          <div className="flex gap-3 items-center mb-4">
            <p className="font-semibold text-xl text-gray-800">Earnings</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  {selected}{" "}
                  <ChevronDown className="ml-2 h-4 w-4"></ChevronDown>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem onSelect={() => handleSelect("Last 30 days")}>
                  Last 30 days
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleSelect("Last 90 days")}>
                  Last 90 days
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleSelect("All time")}>
                  All time
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="font-bold text-4xl text-gray-900">
                ${totalEarnings || 0}
              </p>
              <span className="text-gray-400 text-sm font-medium">USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
