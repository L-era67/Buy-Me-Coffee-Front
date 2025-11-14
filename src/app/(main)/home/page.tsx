"use client";

import { useContext, useEffect, useState } from "react";
import { AccountEarnings } from "./_components/AccountEarnings";
import { Amount } from "./_components/Amount";
import { Transactions } from "./_components/Transactions";
import { UserContext } from "@/provider/currentUserProvider";
import { DonationItemType } from "@/types/DonationType";
import {
  AccountEarningsSkeleton,
  AmountSkeleton,
  TransactionsSkeleton,
} from "@/components/ui/skeletons";

const Home = () => {
  const [donations, setDonations] = useState<DonationItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const [amountSelected, setAmountSelected] = useState<string>("");

  const handleAmountSelect = (value: string) => {
    setAmountSelected(value);
  };

  const { userProvider } = useContext(UserContext);

  useEffect(() => {
    const donationAmounts = async () => {
      if (!userProvider.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/received/${userProvider.id}`
        );

        const data = await response.json();

        setDonations(data.donations ? data.donations : []);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };
    donationAmounts();
  }, [userProvider.id]);

  const filteredAmounts = donations.filter((item) => {
    if (!amountSelected) return item;
    return (
      amountSelected === "All" ||
      item.amount.toString() === amountSelected.replace("$", "")
    );
  });

  if (loading) {
    return (
      <div className="w-full">
        <AccountEarningsSkeleton />
        <AmountSkeleton />
        <TransactionsSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full">
      <AccountEarnings />
      <Amount
        amount={amountSelected}
        donations={donations}
        amountSelected={amountSelected}
        handleAmountSelect={handleAmountSelect}
      />
      <Transactions filteredAmounts={filteredAmounts} />
    </div>
  );
};
export default Home;
