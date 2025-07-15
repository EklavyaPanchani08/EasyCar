import express from "express";
import Car from "../models/Car.js";
import mongoose from "mongoose";

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.get("/", async (req, res) => {
  const {
    type,
    fuel,
    search,
    transmission,
    priceRange = [0, 200],
    rating = 0,
  } = req.query;
  const filter = {
    ...(search ? { name: { $regex: search, $options: "i" } } : {}),
    ...(type && type !== "All" ? { type } : {}),
    ...(fuel && fuel !== "All" ? { fuel } : {}),
    ...(transmission && transmission !== "All" ? { transmission } : {}),
    price: { $gte: +priceRange[0], $lte: +priceRange[1] },
    rating: { $gte: +rating },
  };
  const cars = await Car.find(filter);
  res.json(cars);
});

router.get("/:id", async (req, res) => {
  const car = await Car.findById(new ObjectId(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
});

export default router;
