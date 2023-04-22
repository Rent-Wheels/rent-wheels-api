import UserModel from '../models/user.mongo'
import { User } from '../models/dto/userInputs'
import { FilterQuery } from 'mongoose'

async function createUser(userDetails: User) {
  try {
    return await UserModel.create(userDetails)
  } catch (e: any) {
    throw new Error(e)
  }
}

async function updateUser(userDetails: User) {
  try {
    return await UserModel.findOneAndUpdate({ id: userDetails.id }, userDetails)
  } catch (e: any) {
    throw new Error(e)
  }
}

async function findUser(query: FilterQuery<User>) {
  return await UserModel.findOne(query)
}

export { createUser, updateUser, findUser }
