import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'

import { Roles } from '../models/enums'
import { deleteCar } from './car.service'
import UserModel from '../models/user.mongo'
import { User } from '../models/dto/userInputs'

async function createUser(userDetails: User) {
  try {
    const user = await UserModel.create(userDetails)

    return user.toJSON()
  } catch (e: any) {
    throw new Error(e)
  }
}

async function updateUser(
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions,
) {
  try {
    return await UserModel.findOneAndUpdate(query, update, options)
  } catch (e: any) {
    throw new Error(e)
  }
}

async function deleteUser(query: FilterQuery<User>) {
  const user = await findUser(query)
  if (user && user.role === Roles.Renter) {
    const userCars: string[] = user.cars as string[]
    for (const car of userCars) {
      await deleteCar({ _id: car })
    }
  }

  return await UserModel.deleteOne(query)
}

async function findUser(query: FilterQuery<User>) {
  return await UserModel.findOne(query)
}

export { createUser, updateUser, deleteUser, findUser }
