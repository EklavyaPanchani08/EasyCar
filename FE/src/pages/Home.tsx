import Features from "../components/Features"
import Banner from "../components/banner"
import FeaturedCars from "../components/featured-cars"
import QuickBooking from "../components/quick-booking"

export default function HomePage() {

  return (
    <>
      <Banner />
      <QuickBooking />
      <FeaturedCars />
      <Features />
    </>
  )
}
