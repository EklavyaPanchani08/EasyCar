import express from "express";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log("🙂 ~ router.post ~ req", req);
    const car = await Car.findById(data.carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    const newBooking = new Booking({
      car: car._id,
      pickupDate: data.pickupDate,
      returnDate: data.returnDate,
      pickupLocation: data.pickupLocation,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      basePrice: data.basePrice,
      tax: data.tax,
      insurance: data.insurance,
      total: data.total,
      days: data.days,
      status: "confirmed",
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error while booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { _id } = req.query;
    if (!_id) {
      return res.status(400).json({ message: "Id is required" });
    }
    await Booking.findByIdAndUpdate(_id, { status: "cancelled" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const bookings = await Booking.find({ email }).populate("car");
    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this email" });
    }
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
