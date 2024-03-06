"use client";

import { getCurrentUser } from "@/services/user";
import useUserStore from "@/stores/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const { setCurrentUser } = useUserStore();
  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (isSuccess) {
      setCurrentUser(data);
    }
  }, [data, isSuccess, setCurrentUser]);

  return <div>{children}</div>;
}
