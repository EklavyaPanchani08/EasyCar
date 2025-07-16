# 🚗 Car Rental Platform
A modern, full-stack car rental platform built with React.js & Node.js.

## ✨ Features

### **Homepage**
- Hero section with call-to-action
- Featured cars showcase
- Company statistics and features
- Responsive design with smooth animations

### **Browse Cars**
- Advanced filtering system (type, fuel, transmission, price range, rating)
- Real-time search functionality
- Car cards with detailed information

### **Car Details**
- Comprehensive specifications
- Customer reviews and ratings
- Sticky booking card
- Book Now modal integration

### **Booking System**
- Multi-step booking flow
- Calendar date picker with validation
- Multiple pickup locations
- Personal information collection
- Dynamic price calculation
- Tax and insurance breakdown

### **My Bookings**
- Upcoming and past bookings tabs
- Detailed booking information
- Cancel booking functionality
- Booking status management

## 🛠 Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM

---

## 📦 Database Schema

### 🔹 Car Model
```ts
{
  name: String,
  brand: String,
  type: "Sedan" | "SUV" | "Hatchback" | "Convertible" | "Coupe" | "Electric",
  fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid",
  transmission: "Automatic" | "Manual",
  seats: Number,
  price: Number,
  rating: Number,
  reviews: Number,
  image: String,
  featured: Boolean
}
```

### 🔹 Booking Model

```ts
{
  car: ObjectId (ref: "Car"),
  pickupDate: Date,
  returnDate: Date,
  pickupLocation: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  basePrice: Number,
  tax: Number,
  insurance: Number,
  total: Number,
  days: Number,
  status: "pending" | "confirmed" | "cancelled",
  bookingDate: Date
}
```

---

## 🤖 AI Tools - v0 for forntend component

---

## 🚀 Setup Instructions

1. **Clone the repository**
2. **Add environment variables in both: FE & BE**
   PORT
   MONGO_URI
   REACT_APP_API_URL

4. **Install dependencies in both: FE & BE**
   npm install

5. **Start the development server for both: FE & BE**
   npm run start

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## ✨ Screenshot

<img width="1900" height="3284" alt="localhost_3000_ (5)" src="https://github.com/user-attachments/assets/4f73b534-4368-4858-a3dc-fd9e90cf15a8" />
