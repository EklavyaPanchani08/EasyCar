import { Award, MapPin, Shield, Users } from "lucide-react"

const Features = () => {
  return (
    <section className="py-16 px-4 bg-card/50">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-muted-foreground">Experience the best easycar service</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Fully Insured</h3>
          <p className="text-muted-foreground">All our vehicles come with comprehensive insurance coverage</p>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">24/7 Support</h3>
          <p className="text-muted-foreground">Round-the-clock customer support for your peace of mind</p>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Multiple Locations</h3>
          <p className="text-muted-foreground">Convenient pickup and drop-off locations across the city</p>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Best Prices</h3>
          <p className="text-muted-foreground">Competitive pricing with no hidden fees</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Features