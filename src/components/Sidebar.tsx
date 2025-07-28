import Link from "next/link";
import { Button } from "./ui/button";

export const Sidebar = () => {
  return (
    <div className="">
      <div className="flex flex-col">
        <Link href="/home">
          <Button
            variant="outline"
            className="w-[250px] h-9 pr-45 border-none "
          >
            <p className="">Home</p>
          </Button>
        </Link>
        <Link href="/explore">
          <Button
            variant="outline"
            className="w-[250px] h-9 pr-43 border-none "
          >
            <p className="">Explore</p>
          </Button>
        </Link>
        <Link href="/view-page">
          <Button
            variant="outline"
            className="w-[250px] h-9 pr-38 border-none "
          >
            <p className="">View page</p>
          </Button>
        </Link>
        <Link href="/account-settings">
          <Button
            variant="outline"
            className="w-[250px] h-9 pr-27 border-none "
          >
            <p className="">Account settings</p>
          </Button>
        </Link>
        sadasd
      </div>
    </div>
  );
};
