import HeroCarousel from "@/components/HeroCarousel";
import HotelResourts from "@/components/HotelResourts";
export default function Home() {
  return (
    <div className="space-y-6 md:space-y-16">
      <HeroCarousel></HeroCarousel>
      <HotelResourts></HotelResourts>
    </div>
  );
}
