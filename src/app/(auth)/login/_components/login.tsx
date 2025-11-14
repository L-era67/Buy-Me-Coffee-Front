"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "" })
    .email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters." }),
});

export const LogInEmailPassword = () => {
  const { push } = useRouter();
  const submitLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ accesstoken: string }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/sign-in`,
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("token", response.data.accesstoken);

      // Dispatch custom event to trigger user data refresh
      window.dispatchEvent(new Event("tokenSet"));

      // Small delay to ensure context updates before navigation
      setTimeout(() => {
        push("/home");
      }, 100);
    } catch {
      toast.error("Error");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await submitLogin(values.email, values.password);
  }

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 bg-[#FBBF24] flex items-center justify-center">
        <div className="text-center px-10 ">
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
        <div className="max-w-md w-[407px] px-8">
          <h1 className="text-2xl font-semibold mb-6 text-black">
            Welcome back
          </h1>
          <p className="text-sm mb-2 text-gray-600">
            Enter your email and password
          </p>

          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Test Account:
            </p>
            <p className="text-xs text-gray-600">
              Email: boloroots47@gmail.com
            </p>
            <p className="text-xs text-gray-600">Password: 1234</p>
          </div>

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
                      <Input placeholder="email" {...field} />
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
                        placeholder="password"
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
