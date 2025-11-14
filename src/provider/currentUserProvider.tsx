"use client";

import { UserType } from "@/types/DonationType";
import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";

type userContextType = {
  userProvider: UserType;
  refreshUser: () => Promise<void>;
};

export const UserContext = createContext({} as userContextType);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProvider, setUserProvider] = useState({} as UserType);

  const getCurrentUserByAccessToken = useCallback(async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) {
      setUserProvider({} as UserType);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserProvider(response?.data?.user);
    } catch {
      setUserProvider({} as UserType);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await getCurrentUserByAccessToken();
  }, [getCurrentUserByAccessToken]);

  useEffect(() => {
    getCurrentUserByAccessToken();

    // Listen for storage changes (when token is set/removed in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        getCurrentUserByAccessToken();
      }
    };

    // Listen for custom event when token is set programmatically
    const handleTokenSet = () => {
      getCurrentUserByAccessToken();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("tokenSet", handleTokenSet);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tokenSet", handleTokenSet);
    };
  }, [getCurrentUserByAccessToken]);

  // Separate effect to check if token exists but user data is missing
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !userProvider?.id) {
      const timeout = setTimeout(() => {
        getCurrentUserByAccessToken();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [userProvider?.id, getCurrentUserByAccessToken]);

  return (
    <UserContext.Provider value={{ userProvider, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}
