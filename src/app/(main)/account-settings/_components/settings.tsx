"use client";

import { EditCreditCard } from "./EditCreditCard";
import { EditProfile } from "./EditProfile";
import { EditSuccessPage } from "./EditSuccessPage";
import { NewPassword } from "./NewPassword";

export const SettingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 md:ml-10 w-[900px] max-w-7xl flex flex-col gap-6">
      <div>
        <p className="text-[24px] font-semibold mb-6">My account</p> <EditProfile />
      </div>
      <div>
        <NewPassword />
      </div>
      <div>
        <EditCreditCard />
      </div>
      <div>
        <EditSuccessPage />
      </div>
    </div>
  );
};
