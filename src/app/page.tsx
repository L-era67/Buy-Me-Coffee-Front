import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Popover } from "@/components/ui/popover";
import { Coffee } from "lucide";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <div className="mx-20 my-11">
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}
