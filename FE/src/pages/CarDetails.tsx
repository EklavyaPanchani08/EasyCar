import { ArrowLeft, Calendar, Fuel, MapPin, Settings, Shield, Star, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BookingModal } from "../components/booking-modal"
import { Footer } from "../components/footer"
import { Header } from "../components/header"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Car } from "../lib/types"
import Spinner from "../components/ui/spinner"
import { mockReviews } from "../lib/mock-data"

export default function CarDetails() {
  const params = useParams()
  const carId = params.id

  const [car, setCar] = useState<Car | any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [showBookingModal, setShowBookingModal] = useState(false)

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cars/${carId}`)
      const data = await response.json()
      setCar(data)
      setLoading(false)
    }
    fetchCar()
  }, [carId]);

  if (loading) return <div className="w-fit mx-auto"><Spinner /></div>;
  if (!car && !loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Button asChild>
            <a href="/browse">Back to Browse</a>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }
  return (
    <>
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <a href="/browse">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </a>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    width={800}
                    height={500}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary/90">{car.type}</Badge>
                  {car.featured && <Badge className="absolute top-4 right-4 bg-green-500/90">Featured</Badge>}
                </div>
              </CardContent>
            </Card>

            {/* Car Information Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About this car</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Experience luxury and comfort with the {car.name}. This premium {car.type.toLowerCase()}
                      offers exceptional performance, advanced safety features, and a smooth driving experience perfect
                      for any occasion.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-sm">{car.seats} Passengers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Fuel className="h-4 w-4 text-primary" />
                          <span className="text-sm">{car.fuel} Engine</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4 text-primary" />
                          <span className="text-sm">{car.transmission} Transmission</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-primary" />
                          <span className="text-sm">Fully Insured</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-sm">Multiple Pickup Locations</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-sm">Flexible Booking</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Brand</span>
                          <span className="font-medium">{car.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Model</span>
                          <span className="font-medium">{car.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Year</span>
                          <span className="font-medium">2023</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Body Type</span>
                          <span className="font-medium">{car.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Seats</span>
                          <span className="font-medium">{car.seats}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fuel Type</span>
                          <span className="font-medium">{car.fuel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transmission</span>
                          <span className="font-medium">{car.transmission}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mileage</span>
                          <span className="font-medium">15-20 km/l</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Air Conditioning</span>
                          <span className="font-medium">Yes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">GPS Navigation</span>
                          <span className="font-medium">Yes</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Customer Reviews
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-primary text-primary" />
                        <span className="text-lg font-semibold">{car.rating}</span>
                        <span className="text-sm text-muted-foreground">({car.reviews} reviews)</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{review.user}</span>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                      }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">{car.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{car.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({car.reviews} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">${car.price}</div>
                  <div className="text-sm text-muted-foreground">per day</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span>{car.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fuel</span>
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Transmission</span>
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Seats</span>
                    <span>{car.seats}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={() => setShowBookingModal(true)}>
                  Book Now
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  Free cancellation up to 24 hours before pickup
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingModal car={car} open={showBookingModal} onOpenChange={setShowBookingModal} />
    </>
  )
}
