"use client";

import { useRouter } from "next/navigation";

export default function BookingButton({ roomId }) {
  const router = useRouter();

  const handleBookingClick = () => {
    const user = localStorage.getItem("user"); 
    if (!user) {
      router.push(`/login?redirect=/booking/${roomId}`);
    } else {
      router.push(`/booking/${roomId}`);
    }
  };

  return (
    <button onClick={handleBookingClick} className="btn btn-sm md:btn-md btn-primary rounded-none font-medium">
      Book Now
    </button>
  );
}
