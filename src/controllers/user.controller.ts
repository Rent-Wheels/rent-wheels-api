import { Request, Response } from 'express'

import { createUser } from '../services/user.service'
import { createAuth, login } from '../services/auth.service'
import { Auth, SignUpDetails } from '../models/dto/userInputs'

async function createUserHandler(req: Request, res: Response) {
  try {
    const signUpDetails = req.body as SignUpDetails

    const authDetails: Auth = {
      email: signUpDetails.email,
      password: signUpDetails.password,
    } as Auth

    const auth = await createAuth(authDetails)

    if (!auth) throw new Error('Could not create user')

    const user = await createUser(signUpDetails)

    if (!user) throw new Error('Could not create user')

    return res.status(201).json(user)
  } catch (e: any) {
    console.log(e)

    return res.sendStatus(409)
  }
}

async function loginHandler(req: Request, res: Response) {
  try {
    const user = await login(req.body)
    if (!user) throw new Error('User not found')

    return res.status(200).json(user)
  } catch (e: any) {
    console.log(e)
    return res.status(404).json(e.message)
  }
}

export { createUserHandler, loginHandler }
