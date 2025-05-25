import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesLoading() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="mt-4 md:mt-0">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="rounded-md border">
          <div className="p-4">
            <Skeleton className="h-10 w-full mb-4" />
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-16 w-full mb-2" />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
