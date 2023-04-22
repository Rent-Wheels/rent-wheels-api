import CarModel from '../models/car.mongo'
import { Car } from '../models/dto/userInputs'

async function availableCars() {
  return await CarModel.find({ availability: true })
}

async function addCar(carDetails: Car) {
  const car = await CarModel.create(carDetails)

  return car
}

async function updateCar({ carId, carDetails }: { carId: string; carDetails: Car }) {
  return await CarModel.findOneAndUpdate({ _id: carId }, carDetails)
}
export { availableCars, addCar, updateCar }
