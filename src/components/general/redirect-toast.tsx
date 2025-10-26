"use client";

import { deleteCookiesByKey, getCookiesByKey } from "@/actions/cookies";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const RedirectToast = () => {
  const pathname = usePathname();
  useEffect(() => {
    // TODO impl toast notification
    const showCookieToast = async () => {
      const message = await getCookiesByKey("toast");

      if (message) {
        toast.success(message);
        deleteCookiesByKey("toast");
      }
    };

    showCookieToast();
  }, [pathname]);
  return null;
};

export default RedirectToast;
