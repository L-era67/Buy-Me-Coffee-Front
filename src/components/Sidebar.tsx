import Link from "next/link";
import { Button } from "./ui/button";

export const Sidebar = () => {
  return (
    <div className="">
      <div className="flex flex-col">
        <Link href="/home">
          <Button
            variant="outline"
            className="w-[250px] h-9  border-none flex justify-start items-center"
          >
            Home
          </Button>
        </Link>
        <Link href="/explore">
          <Button
            variant="outline"
            className="w-[250px] h-9  border-none flex justify-start items-center "
          >
            Explore
          </Button>
        </Link>
        <Link href="/view-page">
          <Button
            variant="outline"
            className="w-[250px] h-9 flex justify-start items-center border-none "
          >
            View page
          </Button>
        </Link>
        <Link href="/account-settings">
          <Button
            variant="outline"
            className="w-[250px] h-9 flex justify-start items-center border-none "
          >
            Account Settings
          </Button>
        </Link>
      </div>
    </div>
  );
};
