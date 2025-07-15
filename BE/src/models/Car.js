import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: {
    type: String,
    enum: ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Electric"],
    required: true,
  },
  fuel: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    required: true,
  },
  transmission: {
    type: String,
    enum: ["Automatic", "Manual"],
    required: true,
  },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  image: { type: String },
  featured: { type: Boolean, default: false },
});

export default mongoose.model("Car", carSchema);
