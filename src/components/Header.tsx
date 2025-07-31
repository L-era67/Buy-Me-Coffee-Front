"use client";

import { ChevronDown, CoffeeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const pathName = usePathname();

  const { push } = useRouter();

  const onLogInPage = pathName.includes("/login");

  const onSignUpPage = pathName.includes("/sign-up");

  const onCreateProfile = pathName.includes("/create-profile");

  return (
    <div className="justify-between flex mx-30 my-4 ">
      <p className="font-bold flex gap-[10px]">
        <CoffeeIcon className="w-6" />
        Buy Me Coffee
      </p>
      <div>
        <div>
          {onLogInPage && (
            <Button variant="secondary" onClick={() => push("/sign-up")}>
              Sign up
            </Button>
          )}

          {onSignUpPage && (
            <Button variant="secondary" onClick={() => push("/login")}>
              Login
            </Button>
          )}

          {onCreateProfile && (
            <Button variant="secondary" onClick={() => push("/login")}>
              Log out
            </Button>
          )}

          {!onLogInPage && !onSignUpPage && !onCreateProfile && (
            <div className="flex gap-2 items-center">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="pr-9 pt-1 ">Jake</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-none">
                    <ChevronDown></ChevronDown>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[187px]">
                  <Button
                    variant="outline"
                    className="border-none "
                    onClick={() => push("/login")}
                  >
                    Log Out
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
