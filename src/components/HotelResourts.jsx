"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HotelResourts() {
  const [hotels, setHotels] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPreview = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/top-resourts");
      console.log(res.data);
      setHotels(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch preview data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreview();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <div className="loading loading-xl loading-dots"></div>;
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 px-5 md:px-16">

      {/* ------- Text Content -------- */}
      <div className="w-full md:w-5/12 space-y-5 md:space-y-10">
        <div>
          <h5 className="text-primary md:text-xl font-semibold md:mb-4">
            Popular Destination
          </h5>
          <h1 className="text-neutral text-2xl md:text-5xl font-bold">
            Your Next Adventure Awaits
          </h1>
        </div>
        <p className="text-sm md:text-base text-accent">
          Discover hand-picked destinations, top-rated hotels, and unforgettable
          city experiences tailored just for you. Whether you’re planning a
          relaxing retreat or an exciting adventure, TravelNest helps you find
          the perfect stay for every journey.
        </p>
        <button
          onClick={() => router.push("/hotels")}
          className="px-3 py-1.5 md:px-6 md:py-2 bg-primary text-sm md:text-base font-medium text-white hover:bg-secondary"
        >
          Discover More
        </button>
      </div>

      {/* -------- Image Content --------- */}
      <div className="w-full md:w-7/12 grid md:grid-cols-2 gap-3 md:gap-6">
        {hotels.map((h) => (
          <div
            key={h._id}
            className="relative w-full h-48 md:h-64 rounded overflow-hidden shadow-lg group"
          >
            {/* Background Image */}
            <Image src={h.image} alt={h.hotel} fill className="object-cover" />

            {/* Text Box */}
            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-40 backdrop-blur-md p-2 md:p-4 rounded shadow-md md:space-y-1">
              <div className="flex flex-row items-baseline justify-between md:gap-2">
                <h2 className="md:text-xl font-semibold text-neutral">
                  {h.hotel}
                </h2>
                <h2 className="md:text-xl font-semibold text-primary">
                  {h.pricePerDay}
                </h2>
              </div>
              <div className="flex flex-row items-center justify-between">
                <p className="text-xs md:text-sm text-accent">
                {h.dateFrom} - {h.dateTo}
              </p>
                <p className="text-sm md:text-base text-neutral font-semibold">Per Day</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
