import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'

import { findUser } from './user.service'
import CarModel from '../models/car.mongo'
import { Car } from '../models/dto/userInputs'
import { Availability, Roles } from '../models/enums'
import { deleteFile } from '../util/deleteFromStorage'

async function availableCars() {
  return await CarModel.find({ availability: true })
}

async function addCar({ carDetails, userId }: { carDetails: Car; userId: string }) {
  const car = await CarModel.create(carDetails)

  const owner = await findUser({ _id: userId, role: Roles.Renter })

  if (!owner) throw new Error('Car cannot be added')

  await owner.addCar(car._id)

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

async function getCarHistory(filter: FilterQuery<Car>) {
  return await CarModel.findOne(filter, { rentalHistory: 1 }).populate('rentalHistory')
}

async function changeAvailability({
  filter,
  availability,
}: {
  filter: FilterQuery<Car>
  availability: Availability
}) {
  const car = await findCar(filter)
  if (!car) throw new Error('Car does not exist')
  return await car.changeAvailability(availability)
}

async function updateCarMedia(filter: FilterQuery<Car>, oldURL: string, newURL: string) {
  const car = await findCar(filter)

  return await car?.updateCarMedia(oldURL, newURL)
}

async function deleteCarMedia(filter: FilterQuery<Car>, mediaURLs: { mediaURL: string }[]) {
  const car = await findCar(filter)

  if (!car) throw new Error('Car not found')

  for (const media of mediaURLs) {
    car.media = car.media.filter(m => m.mediaURL === media.mediaURL)
    deleteFile(media.mediaURL)
  }

  return await car.save()
}

export {
  availableCars,
  addCar,
  updateCar,
  deleteCar,
  findCar,
  getCarHistory,
  updateCarMedia,
  deleteCarMedia,
  changeAvailability,
}
