"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/provider/currentUserProvider";
import { toast } from "sonner";
import { LayoutSkeleton } from "@/components/ui/skeletons";

const sidebarItems = [
  {
    title: "Home",
    href: "/home",
  },
  {
    title: "Explore",
    href: "/explore",
  },
  {
    title: "View page",
    href: "/view-page",
  },
  {
    title: "Account Settings",
    href: "/account-settings",
  },
];

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { userProvider } = useContext(UserContext);
  const [hasShownToast, setHasShownToast] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    // If no token at all, show notification
    if (!token) {
      if (!hasShownToast) {
        setHasShownToast(true);
        setIsChecking(false);
        toast.error("Та нэвтэрнэ үү", {
          description:
            "Энэ хуудсыг харахын тулд та нэвтэрсэн байх шаардлагатай.",
        });
      }
      return;
    }

    // If token exists, wait a bit for userProvider to load
    const timer = setTimeout(() => {
      const isLoggedIn = userProvider?.id;

      if (!isLoggedIn && !hasShownToast) {
        setHasShownToast(true);
        setIsChecking(false);
        toast.error("Та нэвтэрнэ үү", {
          description:
            "Энэ хуудсыг харахын тулд та нэвтэрсэн байх шаардлагатай.",
        });
      } else if (isLoggedIn) {
        setIsChecking(false);
      }
    }, 500); // Wait 500ms for userProvider to load

    return () => clearTimeout(timer);
  }, [userProvider, hasShownToast]);

  if (isChecking) {
    return <LayoutSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex mx-auto gap-8 mt-10 max-w-[1400px] px-6">
        <div className="flex-shrink-0">
          {sidebarItems.map(({ title, href }, index) => {
            const isActive = pathname === href;

            return (
              <div key={index} className="mb-2">
                <Link href={href}>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[250px] h-10 border-gray-200 flex justify-start items-center transition-colors duration-200",
                      isActive
                        ? "bg-slate-900 text-white hover:bg-slate-800 border-slate-900"
                        : "hover:bg-gray-50"
                    )}
                  >
                    <p className="font-medium">{title}</p>
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
