"use client";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios, { AxiosError } from "axios";
// import { Router } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrendingUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/provider/currentUserProvider";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "" })
    .email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters." }),
});

export const SignUpEmailPassword = ({ userName }: { userName: string }) => {
  const router = useRouter();
  const { refreshUser, userProvider } = useContext(UserContext);
  const [isNavigating, setIsNavigating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const handleOtgoo = async (
    email: string,
    password: string,
    userName: string
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/create-user`,
        {
          username: userName,
          password,
          email,
        }
      );

      localStorage.setItem("token", response?.data?.signUpUserAccessToken);

      // Dispatch custom event to trigger user data refresh
      window.dispatchEvent(new Event("tokenSet"));

      return TrendingUpDownIcon;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const errorMessage = (axiosError.response.data as { message: string })
          .message;

        if (errorMessage === "User profile already created") {
          alert("User profile already created");
          return false;
        } else {
          alert(`error ${errorMessage}`);
          return false;
        }
      }
    }
  };

  // Navigate to create-profile when user data is loaded
  useEffect(() => {
    if (isNavigating && userProvider?.id) {
      router.push("/create-profile");
      setIsNavigating(false);
    }
  }, [isNavigating, userProvider?.id, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // if (!values || userName) return;

    const isSuccess = await handleOtgoo(
      values.email,
      values.password,
      userName
    );

    if (!isSuccess) {
      alert("User profile already created");
    } else {
      // Trigger user data refresh and wait for it
      setIsNavigating(true);
      await refreshUser();

      // If userProvider already has id, navigate immediately
      // Otherwise, useEffect will handle navigation when userProvider updates
      if (userProvider?.id) {
        router.push("/create-profile");
        setIsNavigating(false);
      }
    }
  }

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 bg-[#FBBF24] flex items-center justify-center">
        <div className="text-center px-10">
          <div className="mb-6">
            <div className="w-[240px] h-[240px] rounded-full mx-auto flex items-center justify-center bg-[#D97706]">
              <img src="illustration.png" alt="image" className="w-full" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-black ">
            Fund your creative work
          </h2>
          <p className="text-black text-base w-[455px]">
            Accept support. Start a membership. Set up a shop. It&apos;s easier
            than you think.
          </p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full px-8">
          <h1 className="text-2xl font-semibold mb-6 text-black">
            Welcome, baconpancakes1
          </h1>
          <p className="text-sm mb-2 text-gray-600">
            Connect email and set a password
          </p>

          <Form {...form}>
            <form
              className="space-y-8 text-black"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email here" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              <Button
                className={`w-full transition ${
                  !form.formState.isValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
                type="submit"
                disabled={!form.formState.isValid}
              >
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
