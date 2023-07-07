import { Request, Response } from 'express'

import log from '../util/logger'

import { Roles } from '../models/enums'
import { User } from '../models/dto/userInputs'

import {
  findUser,
  createUser,
  deleteUser,
  updateUser,
  upgradeToRenter,
  getUserReservationHistory,
  clearUserReservationHistory,
} from '../services/user.service'

import {
  GetUserInput,
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
  UpgradeUserInput,
  GetUserReservationHistoryInput,
  ClearUserReservationHistoryInput,
} from '../schema/user.schema'

async function createUserHandler(
  req: Request<Record<string, never>, Record<string, never>, CreateUserInput['body']>,
  res: Response,
) {
  try {
    const signUpDetails = req.body as User

    signUpDetails.role = Roles.User

    const user = await createUser(signUpDetails)

    if (!user) throw new Error('Could not create user')

    return res.status(201).json(user)
  } catch (e: any) {
    log.error(e)

    if (e.message.includes('phoneNumber'))
      return res.status(409).json('Phone number already exists')
    if (e.message.includes('email')) return res.status(409).json('Email already exists')

    return res.sendStatus(400)
  }
}

async function updateUserHandler(
  req: Request<UpdateUserInput['params'], Record<string, never>, UpdateUserInput['body']>,
  res: Response,
) {
  try {
    const id = req.params.userId

    if (id !== res.locals.user.userId) return res.sendStatus(403)

    const userDetails = req.body as User

    const updatedUser = await updateUser({ userId: id }, userDetails, { new: true })

    return res.status(200).json(updatedUser)
  } catch (e: any) {
    log.error(e)

    if (e.message.includes('phoneNumber'))
      return res.status(409).json('Phone number already exists')

    if (e.message.includes('email')) return res.status(409).json('Email already exists')

    return res.sendStatus(400)
  }
}

async function deleteUserHandler(
  req: Request<DeleteUserInput['params'], Record<string, never>, Record<string, never>>,
  res: Response,
) {
  try {
    const userId = req.params.userId

    if (userId !== res.locals.user.userId) return res.sendStatus(403)

    await deleteUser({ userId: userId })

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
    const user = await findUser({ userId: req.params.userId })

    if (!user) return res.status(404).json('User not found')

    return res.status(200).json(user)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(400)
  }
}

async function getUserReservationHistoryHandler(
  req: Request<
    GetUserReservationHistoryInput['params'],
    Record<string, never>,
    Record<string, never>
  >,
  res: Response,
) {
  try {
    const userId = req.params.userId
    const history = await getUserReservationHistory({ userId: userId })

    return res.status(200).json(history)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(404)
  }
}

async function clearUserReservationHistoryHandler(
  req: Request<
    ClearUserReservationHistoryInput['params'],
    Record<string, never>,
    Record<string, never>
  >,
  res: Response,
) {
  try {
    const userId = req.params.userId

    if (userId !== res.locals.user.userId) return res.sendStatus(403)

    await clearUserReservationHistory({ userId: userId })

    return res.sendStatus(200)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(404)
  }
}

async function upgradeToRenterHandler(
  req: Request<UpgradeUserInput['params'], Record<string, never>, Record<string, never>>,
  res: Response,
) {
  try {
    const userId = req.params.userId
    const upgradedUser = await upgradeToRenter({ userId })

    return res.status(200).json(upgradedUser)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(400)
  }
}

export {
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  createUserHandler,
  upgradeToRenterHandler,
  getUserReservationHistoryHandler,
  clearUserReservationHistoryHandler,
}
