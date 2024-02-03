import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loader() {
  return (
    <div>
      <div className="mt-8 bg-gray-50 rounded-xl shadow-md p-6 text-black max-w-3xl mx-auto">
        <Skeleton className="h-[200px] mb-8 p-6 bg-gray-300" />
        <Skeleton className="h-[200px] mb-8 p-6 bg-gray-300" />
        <Skeleton className="h-[200px] mb-8 p-6 bg-gray-300" />
      </div>
    </div>
  );
}

export default Loader;
