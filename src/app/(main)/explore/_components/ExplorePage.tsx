"use client";

import { useEffect, useState } from "react";
import { ExploreUserSection } from "./ExploreUserSectionItem";
import { NoUser } from "./NoUsers";
import { UserSearchInput } from "./UserSearchInput";

import axios from "axios";
import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { ProfileWithUserNameType } from "@/types/DonationType";
import { ExploreUserSectionSkeleton } from "@/components/ui/skeletons";

import { toast } from "sonner";

type exploreType = {
  usersProfile: ProfileWithUserNameType[];
  totalUsers: number;
  totalPage: number;
};

export const ExplorePage = () => {
  const [users, setUsers] = useState<null | exploreType>(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useQueryState<number>(
    "page",
    parseAsInteger.withDefault(1)
  );

  const getExplore = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/explore?page=${page}`
      );

      const data = (await response.data) as exploreType;

      setUsers(data);
    } catch (error) {
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExplore();
  }, [page]);

  const totalPage = users?.totalPage || 1;

  const arr = Array(totalPage - 1)
    .fill(null)
    .map((_, index) => index + 1);

  const handleSelect = (huudas: number) => {
    setPage(huudas);
  };

  return (
    <div className=" py-10 flex flex-col gap-6">
      <p className="font-semibold text-xl">Explore creators</p>
      <div>
        <UserSearchInput />
      </div>

      {loading ? (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-full">
              <ExploreUserSectionSkeleton />
            </div>
          ))}
        </div>
      ) : users?.usersProfile.length != 0 ? (
        users?.usersProfile.map((item, i) => (
          <div key={i} className=" w-full">
            <ExploreUserSection item={item} />
          </div>
        ))
      ) : (
        <div className="py-6 w-[100%]">
          <NoUser />
        </div>
      )}

      <div className="mt-5 flex justify-end gap-5">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <div className="flex gap-2">
          {arr.length > 0 &&
            arr.map((number, i) => {
              if (page + 1 >= number && page - 1 < number) {
                return (
                  <Button
                    onClick={() => handleSelect(number)}
                    variant="outline"
                    key={i}
                  >
                    {number}
                  </Button>
                );
              }
            })}

          <Button onClick={() => handleSelect(totalPage)} variant="outline">
            {totalPage}
          </Button>
        </div>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === users?.totalPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
