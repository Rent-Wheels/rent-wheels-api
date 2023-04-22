import UserModel from '../models/user.mongo'
import { SignUpDetails, UserDetails } from '../models/dto/userInputs'
import { FilterQuery } from 'mongoose'

async function createUser(userDetails: SignUpDetails) {
  try {
    return await UserModel.create(userDetails)
  } catch (e: any) {
    throw new Error(e)
  }
}

async function updateUser(userDetails: UserDetails) {
  try {
    return await UserModel.findOneAndUpdate({ id: userDetails.id }, userDetails)
  } catch (e: any) {
    throw new Error(e)
  }
}

async function findUser(query: FilterQuery<UserDetails>) {
  return await UserModel.findOne(query)
}

export { createUser, updateUser, findUser }
