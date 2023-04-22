import { Request, Response } from 'express'

import { Roles } from '../models/enums'
import { Auth, User } from '../models/dto/userInputs'
import { createSession } from '../services/session.service'
import { createAuth, login } from '../services/auth.service'
import { createUser, updateUser } from '../services/user.service'
import { CreateUserInput, LoginInput, UpdateUserInput } from '../schema/user.schema'

async function createUserHandler(
  req: Request<Record<string, never>, Record<string, never>, CreateUserInput['body']>,
  res: Response,
) {
  try {
    const signUpDetails = req.body as User
    signUpDetails.role = Roles.User

    const auth = await createAuth({
      email: signUpDetails.email,
      password: signUpDetails.password,
    } as Auth)

    if (!auth) throw new Error('Could not create user')

    const user = await createUser(signUpDetails)

    if (!user) throw new Error('Could not create user')

    const session = await createSession(user._id, user)

    if (!session) throw new Error('Could not create user')

    return res.status(201).json({
      user,
      session,
    })
  } catch (e: any) {
    console.log(e)

    return res.sendStatus(409)
  }
}

async function loginHandler(
  req: Request<Record<string, never>, Record<string, never>, LoginInput['body']>,
  res: Response,
) {
  try {
    const user = await login(req.body)

    if (!user) throw new Error('User not found')

    const session = await createSession(user._id, user)

    if (!session) throw new Error('User not found')

    return res.status(200).json({ user, session })
  } catch (e: any) {
    console.log(e)
    return res.status(404).json(e.message)
  }
}

async function updateUserHandler(
  req: Request<UpdateUserInput['params'], Record<string, never>, UpdateUserInput['body']>,
  res: Response,
) {
  try {
    const id = req.params.userId

    const userDetails = req.body as User

    userDetails.id = id

    const updatedUser = await updateUser(userDetails)

    return res.status(200).json(updatedUser)
  } catch (e: any) {
    return res.status(400).json(e.message)
  }
}

export { createUserHandler, loginHandler, updateUserHandler }
