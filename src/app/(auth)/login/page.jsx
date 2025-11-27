
import LoginPage from "@/components/LoginPage";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense>
        <LoginPage></LoginPage>
      </Suspense>
    </div>
  );
}
