import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">EasyCar</span>
            </a>
            <p className="text-muted-foreground">
              Your trusted partner for premium easycar services. Experience luxury and comfort on every journey.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Quick as */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick as</h3>
            <div className="space-y-2">
              <a href="/browse" className="block text-muted-foreground hover:text-primary">
                Browse Cars
              </a>
              <a href="/bookings" className="block text-muted-foreground hover:text-primary">
                My Bookings
              </a>
              <a href="/about" className="block text-muted-foreground hover:text-primary">
                About Us
              </a>
              <a href="/contact" className="block text-muted-foreground hover:text-primary">
                Contact
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <div className="text-muted-foreground">Luxury Cars</div>
              <div className="text-muted-foreground">Economy Cars</div>
              <div className="text-muted-foreground">SUVs</div>
              <div className="text-muted-foreground">Electric Vehicles</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@carrental.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">123 Main St, City, State</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 CarRental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
