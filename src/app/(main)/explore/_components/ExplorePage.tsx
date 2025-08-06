"use client";

import { useEffect, useState } from "react";
import { ExploreUserSection } from "./ExploreUserSectionItem";
import { NoUser } from "./NoUsers";
import { UserSearchInput } from "./UserSearchInput";

import axios from "axios";
// type user = {
//   id: string;
//   username: string;
//   email: string;
//   name?: string;
// };
export const ExplorePage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("")
  const getExplore = async () => {
    try {
      const response = await axios.get("http://localhost:4001/profile/explore");

      const data = await response.data;

      setUsers(data?.usersProfile);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExplore();
  }, []);

  const filteredUsers = users.filter((user) =>
  user.username.toLowerCase().includes(search.toLowerCase())
);
console.log()


  return (
    <div className=" py-10 flex flex-col gap-6">
      <p className="font-semibold text-xl">Explore creators</p>
      <div>
        <UserSearchInput value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>

      {filteredUsers.length !== 0 ? (
        filteredUsers.map((item, i) => (
          <div key={i} className="w-full">
            <ExploreUserSection item={item} />
          </div>
        ))
      ) : (
        <div className="py-6 w-[100%]">
          <NoUser />
        </div>
      )}
    </div>
  );
};
