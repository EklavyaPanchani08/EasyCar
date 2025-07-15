import Car from "../models/Car.js";
import fs from "fs";

const seedCars = async () => {
  const count = await Car.countDocuments();
  if (count === 0) {
    const cars = JSON.parse(fs.readFileSync("./data/cars.json", "utf-8"));
    await Car.insertMany(cars);
    console.log("Cars seeded");
  }
};

export default seedCars;