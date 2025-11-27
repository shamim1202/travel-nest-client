// "use client";

// import { auth } from "@/lib/firebase";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// export default function BookingModal({ roomId, onClose }) {
//   const [userData, setUserData] = useState({ name: "", email: "" });
//   const [formData, setFormData] = useState({
//     phone: "",
//     checkIn: "",
//     checkOut: "",
//     guests: 1,
//     specialRequest: "",
//   });

//   useEffect(() => {
//     if (auth.currentUser) {
//       setUserData({
//         name: auth.currentUser.displayName,
//         email: auth.currentUser.email,
//       });
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       roomId,
//       userId: auth.currentUser.uid,
//       name: userData.name,
//       email: userData.email,
//       ...formData,
//     };

//     try {
//       const res = await fetch("https://travel-nest-server-iota.vercel.app/booking-room", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Booking failed");

//       Swal.fire("Success", "Your booking is confirmed!", "success");
//       onClose();
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
//       <div className="bg-white/90 m-4 md:m-0 p-4 md:p-6 rounded-lg w-full md:w-md">
//         <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-primary">Book Room</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           <input
//             type="text"
//             value={userData.name}
//             readOnly
//             className="input input-bordered w-full"
//           />
//           <input
//             type="email"
//             value={userData.email}
//             readOnly
//             className="input input-bordered w-full"
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//             required
//           />
//           <input
//             type="date"
//             name="checkIn"
//             value={formData.checkIn}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//             required
//           />
//           <input
//             type="date"
//             name="checkOut"
//             value={formData.checkOut}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//             required
//           />
//           <input
//             type="number"
//             name="guests"
//             min={1}
//             value={formData.guests}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//             required
//           />
//           <textarea
//             name="specialRequest"
//             placeholder="Special Request"
//             value={formData.specialRequest}
//             onChange={handleChange}
//             className="textarea textarea-bordered w-full"
//           />
//           <div className="flex items-center justify-between gap-2 mt-2">
//             <button type="button" onClick={onClose} className="btn btn-sm md:btn-md btn-outline btn-secondary flex-1 rounded-none">
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-sm md:btn-md btn-primary flex-1 rounded-none">
//               Confirm Booking
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function BookingModal({ roomId, onClose }) {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState({
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequest: "",
  });

  // Subscribe to auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUserData({ name: u.displayName, email: u.email });
      } else {
        setUserData({ name: "", email: "" });
        onClose(); // auto-close modal if user logs out
      }
    });

    return () => unsubscribe();
  }, [onClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      Swal.fire("Error", "You must be logged in to book!", "error");
      onClose();
      return;
    }

    const payload = {
      roomId,
      userId: auth.currentUser.uid,
      name: userData.name,
      email: userData.email,
      ...formData,
    };

    try {
      const res = await fetch("https://travel-nest-server-iota.vercel.app/booking-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");

      Swal.fire("Success", "Your booking is confirmed!", "success");
      onClose();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white/90 m-4 md:m-0 p-4 md:p-6 rounded-lg w-full md:w-md">
        <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-primary">
          Book Room
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" value={userData.name} readOnly className="input input-bordered w-full" />
          <input type="email" value={userData.email} readOnly className="input input-bordered w-full" />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} className="input input-bordered w-full" required />
          <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} className="input input-bordered w-full" required />
          <input type="number" name="guests" min={1} value={formData.guests} onChange={handleChange} className="input input-bordered w-full" required />
          <textarea name="specialRequest" placeholder="Special Request" value={formData.specialRequest} onChange={handleChange} className="textarea textarea-bordered w-full" />
          <div className="flex items-center justify-between gap-2 mt-2">
            <button type="button" onClick={onClose} className="btn btn-sm md:btn-md btn-outline btn-secondary flex-1 rounded-none">
              Cancel
            </button>
            <button type="submit" className="btn btn-sm md:btn-md btn-primary flex-1 rounded-none">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
