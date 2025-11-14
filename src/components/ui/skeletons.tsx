import { Skeleton } from "./skeleton";

export const AccountEarningsSkeleton = () => {
  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 pt-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4 items-center flex-1 min-w-0">
            <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 flex-shrink-0" />
        </div>
        <div className="border-t border-gray-200 mx-6"></div>
        <div className="px-6 py-5">
          <div className="flex gap-3 items-center mb-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-9 w-32" />
          </div>
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const TransactionsSkeleton = () => {
  return (
    <div className="mt-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-[660px] overflow-y-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="px-6 py-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-start flex-1">
                <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-6 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            {index < 4 && <div className="border-b border-gray-100 mt-4"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AmountSkeleton = () => {
  return (
    <div className="mt-8 flex justify-between items-center">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
};

export const LayoutSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex mx-auto gap-8 mt-10 max-w-[1400px] px-6">
        <div className="flex-shrink-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="mb-2">
              <Skeleton className="w-[250px] h-10 rounded-md" />
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const ExploreUserSectionSkeleton = () => {
  return (
    <div className="p-6 border-1 rounded-lg border-zinc-200 h-[230px] min-w-[900px]">
      <div className="flex justify-between items-center mb-[12px]">
        <div className="flex items-center gap-3">
          <Skeleton className="w-[40px] h-[40px] rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="flex gap-5 lg:gap-10">
        <div className="w-3/5">
          <Skeleton className="h-5 w-24 mb-[14px]" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="w-2/5">
          <Skeleton className="h-5 w-40 mb-[14px]" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};
