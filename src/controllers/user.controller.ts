import { Request, Response } from 'express'

import log from '../util/logger'
import { Roles } from '../models/enums'
import { Auth, User } from '../models/dto/userInputs'
import { createSession } from '../services/session.service'
import { createAuth, login, logout } from '../services/auth.service'
import { createUser, deleteUser, findUser, updateUser } from '../services/user.service'

import {
  LoginInput,
  GetUserInput,
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../schema/user.schema'

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
    log.info(e)

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
    log.info(e)
    return res.status(404).json(e.message)
  }
}

async function logoutHandler(_req: Request, res: Response) {
  await logout(res.locals.user.session)

  return res.sendStatus(200)
}

async function updateUserHandler(
  req: Request<UpdateUserInput['params'], Record<string, never>, UpdateUserInput['body']>,
  res: Response,
) {
  try {
    const id = req.params.userId

    if (id !== res.locals.user._id) return res.sendStatus(403)

    const userDetails = req.body as User
    userDetails._id = id

    const updatedUser = await updateUser({ _id: id }, userDetails, { new: true })

    return res.status(200).json(updatedUser)
  } catch (e: any) {
    return res.status(400).json(e.message)
  }
}

async function deleteUserHandler(
  req: Request<DeleteUserInput['params'], Record<string, never>, Record<string, never>>,
  res: Response,
) {
  try {
    const userId = req.params.userId

    if (userId !== res.locals.user._id) return res.sendStatus(403)

    await deleteUser({ _id: userId }, res.locals.user.session)

    return res.sendStatus(200)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(400)
  }
}

async function getUserHandler(
  req: Request<GetUserInput['params'], Record<string, never>, Record<string, never>>,
  res: Response,
) {
  try {
    const user = await findUser({ _id: req.params.userId })

    if (!user) return res.sendStatus(404)

    return res.status(200).json(user)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(400)
  }
}

export {
  loginHandler,
  logoutHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  createUserHandler,
}
