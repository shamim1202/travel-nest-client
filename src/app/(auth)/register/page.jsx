
import RegisterPage from "@/components/RegisterPage";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense>
        <RegisterPage></RegisterPage>
      </Suspense>
    </div>
  );
}
