"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      const redirectTo = window.location.pathname;
      router.push(`/login?redirect=${redirectTo}`);
      return;
    }

    setVerified(true);
  }, []);

  if (!verified) return null;

  return <>{children}</>;
}
