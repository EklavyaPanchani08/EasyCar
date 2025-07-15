import { format } from "date-fns"
import { Calendar, Clock, Eye, MapPin, X } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Booking } from "../lib/types"
import { useState } from "react"

export const BookingCard = ({ booking, showCancel = false, fetchBookings }: { booking: Booking; showCancel?: boolean, fetchBookings: Function }) => {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

    const cancelBooking = async (bookingId: string) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/bookings/?_id=${bookingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        await fetchBookings();
    }
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <img
                            src={booking.car.image || "/placeholder.svg"}
                            alt={booking.car.name}
                            width={300}
                            height={200}
                            className="w-full h-48 md:h-full object-cover"
                        />
                    </div>
                    <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-1">{booking.car.name}</h3>
                            </div>
                            <Badge variant={booking.status === "cancelled" ? "destructive" : "default"}>
                                {booking.status === "cancelled" ? "Cancelled" : "Confirmed"}
                            </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                                    <span>Pickup: {format(new Date(booking.pickupDate), "MMM dd, yyyy")}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                                    <span>Return: {format(new Date(booking.returnDate), "MMM dd, yyyy")}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                                    <span className="truncate">{booking.pickupLocation}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-primary" />
                                    <span>{booking.days} days</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-2xl font-bold text-primary">${booking.total.toFixed(2)}</span>
                                <span className="text-sm text-muted-foreground ml-1">total</span>
                            </div>
                            <div className="flex space-x-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                                            <Eye className="h-4 w-4 mr-1" />
                                            View Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>Booking Details</DialogTitle>
                                        </DialogHeader>
                                        {selectedBooking && (
                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <img
                                                            src={selectedBooking.car.image || "/placeholder.svg"}
                                                            alt={selectedBooking.car.name}
                                                            width={400}
                                                            height={250}
                                                            className="w-full h-48 object-cover rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <h3 className="text-xl font-semibold">{selectedBooking.car.name}</h3>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Status</span>
                                                                <Badge variant={selectedBooking.status === "cancelled" ? "destructive" : "default"}>
                                                                    {selectedBooking.status === "cancelled" ? "Cancelled" : "Confirmed"}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Duration</span>
                                                                <span>{selectedBooking.days} days</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="font-semibold mb-3">Rental Details</h4>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Pickup Date</span>
                                                                <span>{format(new Date(selectedBooking.pickupDate), "PPP")}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Return Date</span>
                                                                <span>{format(new Date(selectedBooking.returnDate), "PPP")}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Pickup Location</span>
                                                                <span className="text-right">{selectedBooking.pickupLocation}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-semibold mb-3">Customer Information</h4>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Name</span>
                                                                <span>
                                                                    {selectedBooking.firstName} {selectedBooking.lastName}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Email</span>
                                                                <span>{selectedBooking.email}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-muted-foreground">Phone</span>
                                                                <span>{selectedBooking.phone}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold mb-3">Price Breakdown</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Base Price ({selectedBooking.days} days)</span>
                                                            <span>${selectedBooking.basePrice}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Insurance</span>
                                                            <span>${selectedBooking.insurance}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Tax</span>
                                                            <span>${selectedBooking.tax.toFixed(2)}</span>
                                                        </div>
                                                        <div className="border-t pt-2 flex justify-between font-semibold">
                                                            <span>Total</span>
                                                            <span className="text-primary">${selectedBooking.total.toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                                {showCancel && booking.status !== "cancelled" && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" size="sm">
                                                <X className="h-4 w-4 mr-1" />
                                                Cancel
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Cancel Booking</DialogTitle>
                                            </DialogHeader>
                                            <p>Are you sure you want to cancel this booking? This action cannot be undone.</p>
                                            <DialogFooter>
                                                <Button variant="outline">Keep Booking</Button>
                                                <Button variant="destructive" onClick={() => cancelBooking(booking._id)}>
                                                    Cancel Booking
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}