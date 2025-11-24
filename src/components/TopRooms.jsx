"use client";

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopRooms() {
  const tabs = ["budget", "business", "luxury"];
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState("budget");

  const tabRooms = async (type) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/top-rooms?type=${type}`
      );
      setRooms(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    tabRooms(activeTab);
  }, [activeTab]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <div className="loading loading-xl loading-dots"></div>;
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-10 md:mt-0 px-5 md:px-16">
      <div className="mb-4 md:mb-10">
        <h5 className="text-primary md:text-xl font-semibold md:mb-2">
          Explore Rooms
        </h5>
        <h1 className="text-neutral text-2xl md:text-5xl font-bold">
          Find Your Perfect Stay
        </h1>
      </div>

      {/* ---- Tabs ---- */}
      <div className="flex justify-center gap-4 my-3 md:my-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-1.5 md:py-2 text-sm md:text-base md:font-medium transition-all duration-300 capitalize
     ${
       activeTab === tab
         ? "bg-primary text-white"
         : "bg-white border border-primary"
     }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ---- Animated Cards ---- */}
      <AnimatePresence mode="wait">
        {loading ? (
          <p className="text-center text-gray-500">Loading rooms...</p>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {rooms.map((room) => (
              <motion.div
                key={room._id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rounded-xl overflow-hidden border border-secondary shadow-sm hover:shadow-lg bg-white"
              >
                <div className="relative h-40 md:h-52">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-3 md:p-4 md:space-y-1">
                  <h2 className="font-semibold text-lg md:text-2xl text-primary">
                    {room.name}
                  </h2>
                  <h3 className="font-semibold md:text-xl text-secondary">
                    {room.hotel}
                  </h3>
                  <p className="text-xs md:text-sm text-accent">
                    {room.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center mt-5 md:mt-8">
        <Link
          href="/rooms"
          className="px-3 py-1.5 md:px-6 md:py-2 bg-primary text-sm md:text-base font-medium text-white hover:bg-secondary"
        >
          Explore all
        </Link>
      </div>
    </div>
  );
}
