
  import { Search } from "lucide-react";
type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
  export const UserSearchInput = ( {value, onChange}: Props) => {
    return (
      <div className="flex items-center border-1 rounded-lg border-zinc-200  w-[210px] p-2 gap-1">
        <Search className="text-muted-foreground stroke-[1] w-[20px] h-[20px] " />
        <input className="border-none p-0 outline-none" placeholder="Search users..." onChange={onChange} value={value} />
      </div>
    );
  };
