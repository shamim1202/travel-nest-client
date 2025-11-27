"use client";

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AddHotelPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    hotel: "",
    location: "",
    image: "",
    desc: "",
    regularPrice: "",
    pricePerDay: "",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) router.push("/login?redirect=/add-hotel");
      else setUser(u);
    });
    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://travel-nest-server-iota.vercel.app/add-hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add hotel");

      Swal.fire("Success", "Hotel added successfully!", "success");
      router.push("/hotels");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div
      className="px-4 md:px-20 py-12 bg-gray-50"
      style={{
        backgroundImage:
          "url('https://i.ibb.co.com/rKWPHyft/tourist-spot.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Add New Hotel
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white/40 p-4 md:p-6 rounded-lg shadow flex flex-col gap-2 md:gap-4"
      >
        <input
          name="hotel"
          placeholder="Hotel Name"
          className="input input-bordered w-full bg-white/40"
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          className="input input-bordered w-full bg-white/40"
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full bg-white/40"
          onChange={handleChange}
          required
        />
        <input
          name="regularPrice"
          placeholder="Regular Price"
          type="number"
          className="input input-bordered w-full bg-white/40"
          onChange={handleChange}
          required
        />
        <input
          name="pricePerDay"
          placeholder="Price per Day"
          type="number"
          className="input input-bordered w-full bg-white/40"
          onChange={handleChange}
          required
        />
        <div className="flex gap-2">
          <input
            name="dateFrom"
            type="date"
            className="input input-bordered w-1/2 bg-white/40"
            onChange={handleChange}
            required
          />
          <input
            name="dateTo"
            type="date"
            className="input input-bordered w-1/2 bg-white/40"
            onChange={handleChange}
            required
          />
        </div>
        <textarea
          name="desc"
          placeholder="Description"
          className="textarea textarea-bordered w-full bg-white/40"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary rounded-none mt-2">
          Add Hotel
        </button>
      </form>
    </div>
  );
}
