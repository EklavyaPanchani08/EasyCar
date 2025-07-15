import { Calendar, MapPin } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"

const QuickBooking = () => {
    return (
        <section className="py-16 px-4 bg-card/50">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Quick Booking</h2>
                    <p className="text-muted-foreground">Find and book your perfect car in minutes</p>
                </div>

                <Card className="p-6 shadow-lg border-primary/10">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Pickup Location</label>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="text-sm">Select location</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Pickup Date</label>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="text-sm">Select date</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Return Date</label>
                            <div className="flex items-center space-x-2 p-3 border rounded-lg">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="text-sm">Select date</span>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <Button asChild className="w-full">
                                <a href="/browse">Search Cars</a>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}

export default QuickBooking