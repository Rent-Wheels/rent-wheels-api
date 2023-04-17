import { Roles } from '../models/enums'
import UserModel from '../models/user.mongo'
import { SignUpDetails, UserDetails } from '../models/dto/userInputs'

async function createUser(userDetails: SignUpDetails) {
  try {
    userDetails.role = Roles.User
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

async function createRenter(userDetails: SignUpDetails) {
  try {
    userDetails.role = Roles.Renter
    userDetails.cars = []

    return await UserModel.create(userDetails)
  } catch (e: any) {
    throw new Error(e)
  }
}

export { createUser, updateUser, createRenter }
