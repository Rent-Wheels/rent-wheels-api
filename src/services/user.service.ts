import { SignUpDetails } from '../models/dto/userInputs'
import UserModel from '../models/user.mongo'

async function createUser(userDetails: SignUpDetails) {
  return await UserModel.create(userDetails)
}

export { createUser }
