import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  insurance: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "confirmed",
  },
  bookingDate: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
