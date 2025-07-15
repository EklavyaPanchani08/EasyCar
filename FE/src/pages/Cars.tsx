import { useEffect, useState } from "react"
import CarCard from "../components/car-card"
import CarFilter from "../components/car-filter"
import Spinner from "../components/ui/spinner"
import { Car } from "../lib/types"

export default function BrowseCarsPage() {
  const [cars, setCars] = useState<Car[] | []>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    type: "All",
    fuel: "All",
    transmission: "All",
    priceRange: [0, 300],
    rating: 0,
  })

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cars?search=${search}&cars?type=${filters.type}&fuel=${filters.fuel}&transmission=${filters.transmission}&price=${filters.priceRange}&rating=${filters.rating}`)
      const data = await response.json()
      setCars(data)
      setLoading(false)
    }
    fetchCars()
  }, [filters, search])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const resetFilters = () => {
    setFilters({
      type: "All",
      fuel: "All",
      transmission: "All",
      priceRange: [0, 300],
      rating: 0,
    })
    setSearchTerm("")
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Cars</h1>
        <p className="text-muted-foreground">Find your perfect rental car from our premium collection</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <CarFilter
          resetFilters={resetFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Cars Grid */}
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {!loading && (cars || []).map((car: Car) => (
              <CarCard car={car} key={car._id} />
            ))}
            {loading && <div className="w-fit mx-auto"><Spinner /></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
