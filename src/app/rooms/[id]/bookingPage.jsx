// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function BookingPage({ params }) {
//   const router = useRouter();
//   const { id } = params;

//   const [room, setRoom] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [name, setName] = useState("");
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       router.push(`/login?redirect=/booking/${id}`);
//       return;
//     }

//     // Fetch room details
//     fetch(`https://travel-nest-server-iota.vercel.app/rooms/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRoom(data);
//         setLoading(false);
//       });
//   }, [id, router]);

//   const handleConfirmBooking = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     const bookingData = {
//       roomId: id,
//       userId: user._id,
//       name,
//       date,
//     };

//     const res = await fetch("https://travel-nest-server-iota.vercel.app/bookings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(bookingData),
//     });

//     if (res.ok) {
//       alert("Booking confirmed!");
//       router.push("/rooms");
//     } else {
//       alert("Booking failed");
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="px-6 md:px-20 py-10">
//       <h1 className="text-3xl font-bold mb-4">Book: {room.name}</h1>

//       <div className="space-y-4 max-w-md">
//         <input
//           type="text"
//           placeholder="Your Name"
//           className="input input-bordered w-full"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           type="date"
//           className="input input-bordered w-full"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <button onClick={handleConfirmBooking} className="btn btn-primary w-full">
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//   );
// }
