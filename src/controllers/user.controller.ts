import { Request, Response } from 'express'

import log from '../util/logger'
import createChild from '../util/createChild'
import { User } from '../models/dto/userInputs'
import { MediaCategory, Roles } from '../models/enums'
import { deleteFile, deleteFolder } from '../util/deleteFromStorage'

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
import path from 'path'

async function createUserHandler(
  req: Request<Record<string, never>, Record<string, never>, CreateUserInput['body']>,
  res: Response,
) {
  try {
    const image = req.file as Express.Multer.File
    const signUpDetails = req.body as User

    signUpDetails.role = Roles.User
    signUpDetails.profilePicture = image.path

    const user = await createUser(signUpDetails)

    if (!user) throw new Error('Could not create user')

    const compressedPath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'uploads',
      'users',
      `${user.userId}`,
      'avatar',
    )
    createChild({ id: user.userId, file: image, compressedPath, category: MediaCategory.User })

    return res.status(201).json(user)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(409)
  }
}

async function updateUserHandler(
  req: Request<UpdateUserInput['params'], Record<string, never>, UpdateUserInput['body']>,
  res: Response,
) {
  try {
    const id = req.params.userId

    if (id !== res.locals.user.userId) return res.sendStatus(403)

    const updatedAvatar = req.file
    const userDetails = req.body as User
    userDetails.userId = id

    if (updatedAvatar) {
      deleteFile(userDetails.profilePicture)
      userDetails.profilePicture = updatedAvatar.path
    }

    const updatedUser = await updateUser({ userId: id }, userDetails, { new: true })

    if (updatedAvatar) {
      const compressedPath = path.join(
        __dirname,
        '..',
        '..',
        'public',
        'uploads',
        'users',
        `${userDetails.userId}`,
        'avatar',
      )
      createChild({
        id: userDetails.userId,
        file: updatedAvatar,
        compressedPath,
        category: MediaCategory.User,
      })
    }

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

    if (userId !== res.locals.user.userId) return res.sendStatus(403)

    deleteFolder(`/tmp/users/${res.locals.user.userId}/`)
    deleteFolder(`/public/uploads/users/${res.locals.user.userId}/`)

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

    if (!user) return res.sendStatus(404)

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
    const upgradedUser = await upgradeToRenter({ userId: userId })

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
