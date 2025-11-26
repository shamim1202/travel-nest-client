// app/about/page.jsx
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="px-6 md:px-20 py-12 bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-6 md:mb-12">
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            Welcome to TravelNest
          </h1>
          <p className="text-sm md:text-base text-gray-700 mb-6">
            TravelNest brings you the best hotels and resorts across Bangladesh. 
            Explore, compare, and book your ideal room effortlessly, all in one place.
          </p>
          <Link href="/rooms">
            <button className="btn btn-sm md:btn-md btn-primary rounded-none">
              Explore Rooms
            </button>
          </Link>
        </div>
        <div className="flex-1 relative w-full h-52 md:h-96 rounded-lg overflow-hidden">
          <Image
            src="https://i.ibb.co.com/QvgskB9W/aronnok-park-1024x576.jpg"
            alt="TravelNest Hero"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 md:mb-12">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all">
          <h2 className="text-lg md:text-2xl font-semibold mb-2 text-primary">Wide Selection</h2>
          <p className="text-sm md:text-base text-gray-600">
            Discover a diverse collection of hotels and resorts to suit your needs and budget.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all">
          <h2 className="text-lg md:text-2xl font-semibold mb-2 text-primary">Easy Booking</h2>
          <p className="text-sm md:text-base text-gray-600">
            Seamlessly book your favorite rooms with a few clicks and enjoy instant confirmation.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all">
          <h2 className="text-lg md:text-2xl font-semibold mb-2 text-primary">Trusted Partners</h2>
          <p className="text-sm md:text-base text-gray-600">
            We partner with reputable hotels to ensure a safe, comfortable, and enjoyable stay.
          </p>
        </div>
      </div>

      {/* About & Mission */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="flex-1 relative w-full h-52 md:h-80 rounded-lg overflow-hidden">
          <Image
            src="https://i.ibb.co.com/vvm7wkbJ/bangladesh.jpg"
            alt="Our Mission"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl md:text-3xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-sm md:text-base text-gray-700 mb-4">
            TravelNest aims to simplify travel planning for everyone. By providing comprehensive information, transparent pricing, and easy booking options, we ensure that your stay is stress-free and memorable.
          </p>
          <p className="text-sm md:text-base text-gray-700">
            Whether you're planning a solo trip, a family vacation, or a business stay, TravelNest connects you to the perfect accommodations across Bangladesh.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center px-4 md:px-0 py-6 md:py-12 bg-primary text-white rounded-lg">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Ready to Start Your Journey?</h2>
        <p className="mb-6">Browse our curated rooms and book your stay today!</p>
        <Link href="/rooms">
          <button className="btn btn-sm md:btn-md btn-outline border-white text-white hover:btn-secondary hover:border-0 rounded-none">
            Explore Rooms
          </button>
        </Link>
      </div>
    </div>
  );
}
