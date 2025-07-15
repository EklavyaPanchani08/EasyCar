export interface Car {
  brand: string;
  featured: string;
  fuel: string;
  image: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  seats: number;
  transmission: string;
  type: string;
  _id: string;
}
export interface Booking {
  _id: string;
  car: {
    _id: string;
    name: string;
    brand: string;
    type: string;
    fuel: string;
    transmission: string;
    seats: number;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    featured: boolean;
  };
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  basePrice: number;
  tax: number;
  insurance: number;
  total: number;
  days: number;
  status: string;
  bookingDate: string;
}
