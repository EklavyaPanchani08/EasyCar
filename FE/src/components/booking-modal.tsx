import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "../lib/utils"
import { useNavigate } from "react-router-dom"

interface BookingModalProps {
  car: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingModal({ car, open, onOpenChange }: BookingModalProps) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    pickupDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    pickupLocation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const locations = [
    "Downtown Office - 123 Main St",
    "Airport Terminal - Gate A",
    "Mall Plaza - Shopping Center",
    "Hotel District - 456 Oak Ave",
    "Business Center - 789 Pine St",
  ]

  const calculateDays = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate) return 0
    const diffTime = Math.abs(bookingData.returnDate.getTime() - bookingData.pickupDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const days = calculateDays()
    const basePrice = car.price * days
    const tax = basePrice * 0.1
    const insurance = 15 * days
    return {
      basePrice,
      tax,
      insurance,
      total: basePrice + tax + insurance,
    }
  }

  const handleBooking = async () => {
    try {
      const booking = {
        carId: car._id,
        ...bookingData,
        ...calculateTotal(),
        days: calculateDays(),
      }

      await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      })
      localStorage.setItem("email", bookingData.email);
      onOpenChange(false)
      navigate("/bookings")
    } catch (error) {
      console.error("Error booking car:", error)
    }
  }

  const isStep1Valid = bookingData.pickupDate && bookingData.returnDate && bookingData.pickupLocation
  const isStep2Valid =
    bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {car.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
              >
                1
              </div>
              <span className="text-sm">Dates & Location</span>
            </div>
            <div className="w-8 h-px bg-border"></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
              >
                2
              </div>
              <span className="text-sm">Personal Info</span>
            </div>
            <div className="w-8 h-px bg-border"></div>
            <div className={`flex items-center space-x-2 ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
              >
                3
              </div>
              <span className="text-sm">Confirmation</span>
            </div>
          </div>

          {/* Step 1: Dates & Location */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !bookingData.pickupDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingData.pickupDate ? format(bookingData.pickupDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={bookingData.pickupDate}
                        onSelect={(date) => setBookingData({ ...bookingData, pickupDate: date })}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !bookingData.returnDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {bookingData.returnDate ? format(bookingData.returnDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={bookingData.returnDate}
                        onSelect={(date) => setBookingData({ ...bookingData, returnDate: date })}
                        disabled={(date) => date < (bookingData.pickupDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Pickup Location</Label>
                <Select
                  value={bookingData.pickupLocation}
                  onValueChange={(value) => setBookingData({ ...bookingData, pickupLocation: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {calculateDays() > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span>Rental Duration</span>
                      <span className="font-medium">{calculateDays()} days</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!isStep1Valid}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={bookingData.firstName}
                    onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={bookingData.lastName}
                    onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!isStep2Valid}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Car</span>
                    <span className="font-medium">{car.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pickup Date</span>
                    <span className="font-medium">
                      {bookingData.pickupDate ? format(bookingData.pickupDate, "PPP") : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Return Date</span>
                    <span className="font-medium">
                      {bookingData.returnDate ? format(bookingData.returnDate, "PPP") : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration</span>
                    <span className="font-medium">{calculateDays()} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pickup Location</span>
                    <span className="font-medium text-sm">{bookingData.pickupLocation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Customer</span>
                    <span className="font-medium">
                      {bookingData.firstName} {bookingData.lastName}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Price Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>
                      Base Price ({calculateDays()} days × ${car.price})
                    </span>
                    <span>${calculateTotal().basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Insurance</span>
                    <span>${calculateTotal().insurance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax (10%)</span>
                    <span>${calculateTotal().tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">${calculateTotal().total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleBooking} className="bg-primary">
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
