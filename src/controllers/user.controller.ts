import { Request, Response } from 'express'

import { createAuth, login } from '../services/auth.service'
import { createUser, updateUser, createRenter } from '../services/user.service'
import { Auth, SignUpDetails, UserDetails } from '../models/dto/userInputs'

async function createUserHandler(req: Request, res: Response) {
  try {
    const signUpDetails = req.body as SignUpDetails

    const auth = await createAuth({
      email: signUpDetails.email,
      password: signUpDetails.password,
    } as Auth)

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

async function updateUserHandler(req: Request, res: Response) {
  try {
    const id = req.params.userId

    const userDetails = req.body as UserDetails

    userDetails.id = id

    const updatedUser = await updateUser(userDetails)

    return res.status(200).json(updatedUser)
  } catch (e: any) {
    return res.status(400).json(e.message)
  }
}

async function createRenterHandler(req: Request, res: Response) {
  try {
    const signUpDetails = req.body as SignUpDetails

    const auth = await createAuth({
      email: signUpDetails.email,
      password: signUpDetails.password,
    } as Auth)

    if (!auth) throw new Error('Could not create user')

    const renter = await createRenter(signUpDetails)

    if (!renter) throw new Error('Could not create user')

    return res.status(201).json(renter)
  } catch (e: any) {
    console.log(e)

    return res.sendStatus(409)
  }
}

export { createUserHandler, loginHandler, updateUserHandler, createRenterHandler }
