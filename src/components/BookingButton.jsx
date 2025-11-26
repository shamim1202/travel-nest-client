// "use client";

// import { auth } from "@/lib/firebase";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import BookingModal from "./BookingModal";

// export default function BookingButton({ roomId, autoOpen = false }) {
//   const router = useRouter();
//   const [showModal, setShowModal] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (autoOpen && user) setShowModal(true);
//   }, [autoOpen, user]);

//   const handleBookingClick = () => {
//     console.log(user)
//     if (!user) {
//       router.push(`/login?redirect=/rooms/${roomId}&booking=true`);
//     } else {
//       setShowModal(true);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={handleBookingClick}
//         className="btn btn-sm md:btn-md btn-primary rounded-none font-medium"
//       >
//         Book Now
//       </button>

//       {showModal && (
//         <BookingModal roomId={roomId} onClose={() => setShowModal(false)} />
//       )}
//     </>
//   );
// }

"use client";

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";

export default function BookingButton({ roomId, autoOpen = false }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Subscribe to auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setInitialized(true); // auth check complete
    });
    return () => unsubscribe();
  }, []);

  // Auto-open modal if user logged in
  useEffect(() => {
    if (!initialized) return; // wait for auth check
    if (autoOpen && user) setShowModal(true);
    if (autoOpen && !user) {
      router.push(`/login?redirect=/rooms/${roomId}&booking=true`);
    }
  }, [initialized, autoOpen, user, router, roomId]);

  const handleBookingClick = () => {
    if (!initialized) return; // wait for auth check
    if (!user) {
      router.push(`/login?redirect=/rooms/${roomId}&booking=true`);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleBookingClick}
        className="btn btn-sm md:btn-md btn-primary rounded-none font-medium"
      >
        Book Now
      </button>

      {showModal && (
        <BookingModal roomId={roomId} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
