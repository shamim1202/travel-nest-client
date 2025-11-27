import BookingButton from "@/components/BookingButton";
import Image from "next/image";
import Link from "next/link";

export default async function RoomDetailsPage({ params }) {
  const { id } = await params;

  const res = await fetch(`https://travel-nest-server-iota.vercel.app/rooms/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="text-red-500">Room not found</p>;
  }

  const room = await res.json();

  return (
    <div className="px-6 md:px-20 py-10 md:mt-16 bg-green-100">
      <div className="relative w-full h-56 md:h-[400px] rounded-lg overflow-hidden mb-2">
        <Image src={room.image} alt={room.name} fill className="object-cover" />
      </div>

      <div className="p-5 md:p-10">
        <h1 className="text-neutral text-2xl md:text-4xl font-bold mb-2 md:mb-4">
          {room.name}
        </h1>
        <h3 className="text-neutral text-xl md:text-2xl font-semibold mb-2 md:mb-4">
          {room.hotel}
        </h3>

        <p className="text-neutral text-sm md:text-base mb-4 md:mb-6">
          {room.short_desc} {room.medium_desc}
        </p>

        <div className="flex flex-col gap-2 mb-6 text-gray-600">
          {/* Type Related info */}
          <p className="flex items-center justify-between">
            <strong>Type:</strong>
            <strong
              className={`px-4 md:px-6 py-1 md:py-1.5 text-sm  font-medium ${
                room.type === "budget"
                  ? "bg-green-200 text-green-700"
                  : room.type === "business"
                  ? "bg-blue-200 text-blue-700"
                  : room.type === "luxury"
                  ? "bg-purple-200 text-purple-700"
                  : ""
              }
  `}
            >
              {room.type}
            </strong>
          </p>

          {/* Regular Price Related Info */}
          <p className="flex items-center justify-between">
            <span>
              <strong>Regular Price:</strong>
            </span>{" "}
            <span>
              Tk. <strong>{room.regular_rate}</strong>/night
            </span>
          </p>
          {/* Offer Price Related Info */}
          <p className="flex items-center justify-between">
            <span>
              <strong>Offer Price:</strong>
            </span>{" "}
            <span>
              Tk. <strong>{room.offer_rate}</strong>
              /night
            </span>
          </p>

          {/* Offer Price Date Related Info */}
          <p className="flex items-center justify-between">
            <strong>Date:</strong>
            <span>
              {room.offer_date.from} to {room.offer_date.to}
            </span>
          </p>

          {/* :ocation Related Info */}
          <p className="flex items-center justify-between">
            <strong>Location:</strong>
            <span>{room.location}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <Link href="/rooms">
            <button className="btn btn-outline btn-sm md:btn-md btn-secondary rounded-none font-medium">
              Back
            </button>
          </Link>

          <BookingButton roomId={id} />
        </div>
      </div>
    </div>
  );
}
