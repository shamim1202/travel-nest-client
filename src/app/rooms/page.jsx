import AllRooms from "@/components/AllRooms";

export default function page() {
  return (
    <div className="my-8 md:my-16 bg-green-100 p-5 md:p-16">
      <div className="text-center space-y-3 md:space-y-5 mb-6 md:mb-10">
        <h1 className="text-2xl md:text-5xl font-bold text-primary">
          Unlock Every Destination
        </h1>
        <p className="md:w-3/4 mx-auto text-xs md:text-sm text-accent">
          TravelNest brings every hotel to your fingertips. Discover hidden
          gems, renowned resorts, and cozy retreats in one place. With options
          for every traveler, every trip becomes easier to plan and more
          exciting. Find the hotel that turns your journey into an adventure.
        </p>
      </div>
      <div>
        <AllRooms></AllRooms>
      </div>
    </div>
  );
}
