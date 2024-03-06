import React from "react";
import { Skeleton } from "../ui/skeleton";

export const SkeletonTable = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-5 space-x-4">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
};
