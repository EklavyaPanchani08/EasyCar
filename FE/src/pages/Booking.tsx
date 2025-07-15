import { Car, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { BookingCard } from "../components/booking-card"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Booking } from "../lib/types"

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([])

  const fetchBookings = async () => {
    const email = localStorage.getItem("email")
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings?email=${email}`)
    const data = await response.json()
    setBookings(data)
  }
  useEffect(() => {
    fetchBookings()
  }, [])

  const upcomingBookings = bookings.filter((booking) => {
    const pickupDate = new Date(booking.pickupDate)
    return pickupDate >= new Date() && booking.status !== "cancelled"
  })

  const pastBookings = bookings.filter((booking) => {
    const returnDate = new Date(booking.returnDate)
    return returnDate < new Date() || booking.status === "cancelled"
  })

  return (

    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">Manage your easycar bookings</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6 mt-6">
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any upcoming easycar. Book your next adventure!
                </p>
                <Button asChild>
                  <a href="/browse">Browse Cars</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcomingBookings.map((booking) => <BookingCard fetchBookings={fetchBookings} key={booking._id} booking={booking} showCancel={true} />)
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6 mt-6">
          {pastBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                <p className="text-muted-foreground">Your completed and cancelled bookings will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            pastBookings.map((booking) => <BookingCard fetchBookings={fetchBookings} key={booking._id} booking={booking} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
