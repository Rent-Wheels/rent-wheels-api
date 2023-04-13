import { Request, Response } from 'express'

import { createAuth } from '../services/auth.service'
import { Auth, SignUpDetails } from '../models/dto/userInputs'
import { createUser } from '../services/user.service'

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

export { createUserHandler }
