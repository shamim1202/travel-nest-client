"use client";

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllRooms() {
  const categories = ["All", "Budget", "Business", "Luxury"];

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  const fetchRoom = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/rooms");
      setRooms(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <div className="loading loading-xl loading-dots"></div>;
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search room..."
          className="input input-bordered w-full md:w-1/3"
        />

        <div className="flex gap-3">
          <select className="select select-bordered">
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select className="select select-bordered">
            <option value="">Sort by price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>
      </div>

      {/* Animated Grid */}
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key="rooms-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {rooms.map((room) => (
              <motion.div
                key={room._id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rounded-xl border border-primary shadow-sm bg-white overflow-hidden"
              >
                <div className="relative h-40 md:h-52">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 space-y-1.5 md:space-y-2.5">
                  <h3 className="text-neutral font-semibold md:text-xl">
                    {room.name}
                  </h3>

                  <p className="text-accent text-xs md:text-sm line-clamp-2">
                    {room.short_desc}
                  </p>

                  <p className="text-secondary font-semibold text-2xl">
                    {room.offer_rate}/
                    <span className="text-sm md:text-base font-semibold">
                      night
                    </span>
                  </p>

                  <Link href={`/rooms/${room._id}`}>
                    <button className="w-full py-1.5 md:py-2 bg-primary text-sm md:text-base font-medium text-white hover:bg-secondary">
                      Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
