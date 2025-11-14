import { FilterProps } from "@/types/types";
import { formatDistanceToNow } from "date-fns";

export const Transactions = ({ filteredAmounts }: FilterProps) => {
  return (
    <div className="mt-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-[660px] overflow-y-auto">
        {filteredAmounts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm">No transactions found</p>
          </div>
        ) : (
          filteredAmounts.map((item, index) => (
            <div
              className="px-6 py-4 hover:bg-gray-50/50 transition-colors duration-150"
              key={index}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-start">
                  <img
                    src={item.donor.profile.avatarImage}
                    alt="profile"
                    className="w-12 h-12 rounded-full ring-2 ring-gray-100 shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {item.donor.profile.name || "Anonymous"}
                    </p>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {item.donor.profile.socialMediaURL}
                    </p>
                    {item.specialMesssage && (
                      <p className="mt-2 text-gray-700 text-sm leading-relaxed italic">
                        &quot;{item.specialMesssage}&quot;
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">
                    ${item.amount}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              {index < filteredAmounts.length - 1 && (
                <div className="border-b border-gray-100 mt-4"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
