"use client";

import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!auth.currentUser) return;
    try {
      const res = await fetch(
        `https://travel-nest-server-iota.vercel.app/my-bookings/${auth.currentUser.uid}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchBookings();
  // }, []);
  useEffect(() => {
    if (!auth.currentUser) {
      Swal.fire("Unauthorized", "Please login first", "warning");
    } else {
      fetchBookings();
    }
  }, []);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        await fetch(
          `https://travel-nest-server-iota.vercel.app/bookings/${id}`,
          {
            method: "DELETE",
          }
        );
        Swal.fire("Deleted!", "Booking has been deleted.", "success");
        fetchBookings();
      } catch (err) {
        Swal.fire("Error", "Failed to delete booking.", "error");
      }
    }
  };

  const handleUpdate = async (id) => {
    const { value: formValues, isConfirmed } = await Swal.fire({
      title: "Update Booking",
      html:
        `<input id="checkIn" class="swal2-input" placeholder="Check-in Date" type="date">` +
        `<input id="checkOut" class="swal2-input" placeholder="Check-out Date" type="date">` +
        `<input id="guests" class="swal2-input" placeholder="Guests" type="number">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        return {
          checkIn: document.getElementById("checkIn").value,
          checkOut: document.getElementById("checkOut").value,
          guests: document.getElementById("guests").value,
        };
      },
    });

    // check if user clicked confirm
    if (isConfirmed && formValues) {
      try {
        await fetch(
          `https://travel-nest-server-iota.vercel.app/bookings/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValues),
          }
        );
        Swal.fire("Updated!", "Booking has been updated.", "success");
        fetchBookings(); // ensure this function exists
      } catch (err) {
        Swal.fire("Error", "Failed to update booking.", "error");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  console.log(bookings);

  if (bookings.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">No bookings found.</p>
    );

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">My Bookings</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Room Name</th>
              <th className="border border-gray-300 p-2">Check-In</th>
              <th className="border border-gray-300 p-2">Check-Out</th>
              <th className="border border-gray-300 p-2">Guests</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="text-center">
                <td className="border border-gray-300 p-2">
                  {b.roomName || "Room"}
                </td>
                <td className="border border-gray-300 p-2">{b.checkIn}</td>
                <td className="border border-gray-300 p-2">{b.checkOut}</td>
                <td className="border border-gray-300 p-2">{b.guests}</td>
                <td className="border border-gray-300 p-2 flex flex-col md:flex-row justify-center gap-2">
                  <button
                    className="btn btn-xs md:btn-sm btn-info text-white rounded-none"
                    onClick={() => {
                      Swal.fire({
                        title: "Booking Details",
                        html: `
        <p><strong>Name:</strong> ${b.name}</p>
        <p><strong>Email:</strong> ${b.email}</p>
        <p><strong>Phone:</strong> ${b.phone}</p>
        <p><strong>Check In:</strong> ${b.checkIn || "-"}</p>
        <p><strong>Check Out:</strong> ${b.checkOut || "-"}</p>
        <p><strong>Guests:</strong> ${b.guests || "-"}</p>
        <p><strong>Special Request:</strong> ${b.specialRequest || "-"}</p>
      `,
                        icon: "info",
                        confirmButtonText: "Close",
                      });
                    }}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-xs md:btn-sm btn-warning text-white rounded-none"
                    onClick={() => handleUpdate(b._id)}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-xs md:btn-sm btn-error text-white rounded-none"
                    onClick={() => handleDelete(b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
