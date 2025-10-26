"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardInputsMain } from "@/components/userInfo/bankCardCreate/cardInputMain";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "@/provider/currentUserProvider";
import { LoaderCoffee } from "@/components/loading.tsx/loader";
import { toast } from "sonner";

export const bankFormSchema = z.object({
  selectCountry: z.string().min(2, { message: "Please select a country" }),
  name: z
    .string()
    .min(4, { message: "First name is too short" })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message: "First name must only contain letters",
    }),
  lastName: z
    .string()
    .min(4, { message: "Last name is too short" })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message: "Last name must only contain letters",
    }),
  cardNumber: z
    .string()
    .min(16, { message: "Card number is invalid" })
    .regex(/^\d+$/, { message: "Card number must contain only digits" }),
  // .transform((val)=>{
  //       return val.match(/.{1,4}/g)?.join("-") ?? val;
  // }),

  month: z.string().min(1, { message: "Select a month" }),
  year: z.string().min(4, { message: "Year is required" }),

  CVC: z
    .string()
    .min(3, { message: "CVC must be at least 3 digits" })
    .max(4, { message: "CVC must be 4 digits or less" }),
});

export type BankFormType = z.infer<typeof bankFormSchema>;

export const CreateBankCartForm = () => {
  const { push } = useRouter();

  const { userProvider } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const bankCardPost = async (
    selectCountry: string,
    name: string,
    lastName: string,
    cardNumber: string,
    CVC: string,
    expiryDate: string
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:4001/bank-cards/create/${userProvider.id}`,
        {
          firstName: name,
          lastName: lastName,
          country: selectCountry,
          cardNumber: cardNumber,
          expiryDate,
          CVC: CVC,
        }
      );
    } catch (error) {
      toast.error("Error");
    }
  };

  const form = useForm<z.infer<typeof bankFormSchema>>({
    resolver: zodResolver(bankFormSchema),

    defaultValues: {
      selectCountry: "",
      name: "",
      lastName: "",
      cardNumber: "",
      month: "",
      year: "",
      CVC: "",
    },
  });

  async function onSubmit(values: z.infer<typeof bankFormSchema>) {
    const { selectCountry, name, lastName, cardNumber, month, year, CVC } =
      values;

    const expiryDate = `${year}-${month}-01`;

    setLoading(true);

    await bankCardPost(
      selectCountry,
      name,
      lastName,
      cardNumber,
      CVC,
      expiryDate
    );

    setTimeout(() => {
      push("/home");
    }, 4000);
  }

  if (loading) return <LoaderCoffee />;

  return (
    <div className="w-[100%] h-[100vh] flex flex-col justify-center  bg-white items-center ">
      <div className="flex gap-6 flex-col w-[510px]">
        <p className="text-2xl font-semibold">
          How would you like to be paid?{" "}
        </p>
        <p className="text-sm text-muted-foreground font-normal">
          Enter location and payment details
        </p>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CardInputsMain control={form.control} />
              <div className="text-right mt-[24px]">
                <Button type="submit" className="w=1/2">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
