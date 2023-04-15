import CarModel from '../models/car.mongo'
import { CarDetails } from '../models/dto/userInputs'

async function availableCars() {
  return await CarModel.find({ availability: true })
}

async function addCar(carDetails: CarDetails) {
  const car = await CarModel.create(carDetails)

  return car
}

export { availableCars, addCar }
