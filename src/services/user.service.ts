import { Roles } from '../models/enums'
import UserModel from '../models/user.mongo'
import { SignUpDetails } from '../models/dto/userInputs'

async function createUser(userDetails: SignUpDetails) {
  try {
    userDetails.role = Roles.User
    return await UserModel.create(userDetails)
  } catch (e: any) {
    throw new Error(e)
  }
}

export { createUser }
