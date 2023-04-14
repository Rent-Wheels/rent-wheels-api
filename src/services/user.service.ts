import { SignUpDetails } from '../models/dto/userInputs'
import UserModel from '../models/user.mongo'

async function createUser(userDetails: SignUpDetails) {
  try {
    return await UserModel.create(userDetails)
  } catch (e: any) {
    throw new Error(e)
  }
}

export { createUser }
