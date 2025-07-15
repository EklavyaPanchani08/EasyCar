import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Car } from "../lib/types"
import CarCard from "./car-card"
import Spinner from "./ui/spinner"

const FeaturedCars = () => {
    const [featuredCars, setFeaturedCars] = useState<Car[] | []>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cars`)
            const data = await response.json()
            setFeaturedCars(data.splice(0, 3))
            setLoading(false)
        }
        fetchCars()
    }, [])

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Featured Cars</h2>
                    <p className="text-muted-foreground">Discover our most popular rental vehicles</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {!loading && (featuredCars || []).map((car) => (
                        <CarCard car={car} key={car?._id} />
                    ))}
                </div>
                {loading && <div className="w-fit mx-auto"><Spinner /></div>}

                <div className="text-center mt-12">
                    <Button asChild variant="outline" size="lg">
                        <a href="/browse">View All Cars</a>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCars