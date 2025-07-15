import Car from "../assets/images/car.png"
import { Button } from './ui/button'

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-background to-primary/5 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Find Your Perfect
                  <span className="text-primary block">Rental Car</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Discover amazing deals on premium vehicles. Book instantly with flexible pickup locations and
                  competitive pricing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <a href="/browse">Browse Cars</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <a href="/bookings">My Bookings</a>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Premium Cars</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src={Car}
                  alt="Premium Car"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Banner