// src/app/explore/page.tsx (or wherever your main Explore page lives)
import { ExplorePage } from "./_components/ExplorePage";

const Explore = () => {
  // The outer div w-[100%] is fine, but the real container styling
  // should be on ExplorePage for better consistency.
  return (
    <div className="w-full">
      <ExplorePage />
    </div>
  );
};
export default Explore;
