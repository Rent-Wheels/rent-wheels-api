import { findUser } from './user.service'
import CarModel from '../models/car.mongo'
import { Car } from '../models/dto/userInputs'

async function availableCars() {
  return await CarModel.find({ availability: true })
}

async function addCar({ carDetails, userId }: { carDetails: Car; userId: string }) {
  const car = await CarModel.create(carDetails)

  const owner = await findUser({ _id: userId })

  if (!owner) throw new Error('Car cannot be added')

  owner.addCar(car._id)
  await owner.save()

  return car.toJSON()
}

async function updateCar({ carId, carDetails }: { carId: string; carDetails: Car }) {
  return await CarModel.findOneAndUpdate({ _id: carId }, carDetails)
}
export { availableCars, addCar, updateCar }
