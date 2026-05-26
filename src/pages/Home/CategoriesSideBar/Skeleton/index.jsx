import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategorySidebarSkeleton() {
  return (
    <div className="hidden w-[260px] lg:block">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-4">
          <Skeleton height={24} width={120} />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton circle width={36} height={36} />

              <Skeleton height={14} width={140} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
