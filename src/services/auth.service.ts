import AuthModel from '../models/auth.mongo'
import { Auth } from '../models/dto/userInputs'
import UserModel from '../models/user.mongo'

async function createAuth(authDetails: Auth) {
  const auth = AuthModel.create(authDetails)
  return auth
}

async function login({ email, password }: { email: string; password: string }) {
  const auth = await AuthModel.findOne({ email })

  if (!auth) throw new Error('Invalid email or password')

  const isValid = await auth.comparePassword(password)

  if (!isValid) throw new Error('Invalid email or password')
 
  return await UserModel.findOne({ email })
}

export { createAuth, login }
