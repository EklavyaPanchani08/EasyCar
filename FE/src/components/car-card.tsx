import { Fuel, Settings, Star, Users } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Car } from "../lib/types"

const CarCard = ({ car }: { car: Car }) => {
    return (
        <Card key={car._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
                <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary/90">{car.type}</Badge>
                {car.featured && <Badge className="absolute top-4 right-4 bg-green-500/90">Featured</Badge>}
            </div>
            <CardContent className="p-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">{car.name}</h3>
                        <p className="text-sm text-muted-foreground">{car.brand}</p>
                        <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{car.rating}</span>
                            <span className="text-xs text-muted-foreground">({car.reviews} reviews)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{car.seats} seats</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Fuel className="h-3 w-3" />
                            <span>{car.fuel}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Settings className="h-3 w-3" />
                            <span>{car.transmission}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-bold text-primary">${car.price}</span>
                            <span className="text-sm text-muted-foreground">/day</span>
                        </div>
                        <Button asChild>
                            <a href={`/car/${car._id}`}>View Details</a>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CarCard