import { Request, Response } from 'express'

import log from '../util/logger'

import { Roles } from '../models/enums'
import { User } from '../models/dto/userInputs'
import { deleteUserReservations } from '../services/reservation.service'
import { GetUserInput, CreateUserInput, UpdateUserInput } from '../schema/user.schema'

import {
  findUser,
  createUser,
  deleteUser,
  updateUser,
  upgradeToRenter,
  getUserReservationHistory,
} from '../services/user.service'

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
  req: Request<Record<string, never>, Record<string, never>, UpdateUserInput['body']>,
  res: Response,
) {
  try {
    const { userId } = res.locals.user

    const userDetails = req.body as User

    const updatedUser = await updateUser({ userId, data: userDetails })

    return res.status(200).json(updatedUser)
  } catch (e: any) {
    log.error(e)

    if (e.message.includes('phoneNumber'))
      return res.status(409).json('Phone number already exists')

    if (e.message.includes('email')) return res.status(409).json('Email already exists')

    return res.sendStatus(400)
  }
}

async function deleteUserHandler(_req: Request, res: Response) {
  try {
    const { id, role } = res.locals.user

    await deleteUser({ role, id })

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

async function getUserReservationHistoryHandler(_req: Request, res: Response) {
  try {
    const { userId } = res.locals.user

    const history = await getUserReservationHistory({ userId: userId })

    return res.status(200).json(history)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(404)
  }
}

async function clearUserReservationHistoryHandler(_req: Request, res: Response) {
  try {
    const { userId } = res.locals.user

    if (userId !== res.locals.user.userId) return res.sendStatus(403)

    await deleteUserReservations({ customerId: userId })

    return res.sendStatus(200)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(404)
  }
}

async function upgradeToRenterHandler(_req: Request, res: Response) {
  try {
    const { userId } = res.locals.user
    const upgradedUser = await upgradeToRenter(userId)

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
