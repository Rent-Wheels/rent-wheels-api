import { findUser } from './user.service'
import CarModel from '../models/car.mongo'
import { Car } from '../models/dto/userInputs'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'

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

async function updateCar(
  filter: FilterQuery<Car>,
  update: UpdateQuery<Car>,
  options: QueryOptions,
) {
  return await CarModel.findOneAndUpdate(filter, update, options)
}

async function deleteCar(filter: FilterQuery<Car>) {
  return await CarModel.deleteOne(filter)
}

async function findCar(filter: FilterQuery<Car>) {
  return await CarModel.findOne(filter)
}

export { availableCars, addCar, updateCar, deleteCar, findCar }
