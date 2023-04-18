import { Roles } from '../models/enums'
import UserModel from '../models/user.mongo'
import { SignUpDetails } from '../models/dto/userInputs'

async function createRenter(userDetails: SignUpDetails) {
  try {
    userDetails.role = Roles.Renter
    userDetails.cars = []

    return await UserModel.create(userDetails)
  } catch (e: any) {
    throw new Error(e)
  }
}

async function getRenterCars(userId: string) {
  const user = await UserModel.findOne({ _id: userId }).populate('cars')
  if (!user) throw new Error('')
  return user.cars
}

export { createRenter, getRenterCars }
