import { Route, Routes } from "react-router-dom"
import { Header } from "./components/header"
import Home from "./pages/Home"
import { Footer } from "./components/footer"
import CarDetails from "./pages/CarDetails"
import Cars from "./pages/Cars"
import Bookings from "./pages/Booking"

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/browse" element={<Cars />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
