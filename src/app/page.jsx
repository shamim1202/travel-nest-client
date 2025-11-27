import HeroCarousel from "@/components/HeroCarousel";
import HotelResourts from "@/components/HotelResourts";
import Testimonial from "@/components/Testimonial";
import TopRooms from "@/components/TopRooms";
export default function Home() {
  return (
    <div className="space-y-6 md:space-y-16">
      <HeroCarousel></HeroCarousel>
      <HotelResourts></HotelResourts>
      <TopRooms></TopRooms>
      <Testimonial></Testimonial>
    </div>
  );
}
