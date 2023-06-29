import { Request, Response } from 'express'

import log from '../util/logger'
import createChild from '../util/createChild'
import { User } from '../models/dto/userInputs'
import { MediaCategory, Roles } from '../models/enums'
import { getRenterCars } from '../services/renter.service'
import { createUser, findRenter } from '../services/user.service'
import { CreateUserInput, GetUserInput } from '../schema/user.schema'

async function createRenterHandler(
  req: Request<Record<string, never>, Record<string, never>, CreateUserInput['body']>,
  res: Response,
) {
  try {
    const signUpDetails = req.body as User
    const image = req.file as Express.Multer.File

    signUpDetails.cars = []
    signUpDetails.role = Roles.Renter
    signUpDetails.profilePicture = image.path

    const renter = await createUser(signUpDetails)

    if (!renter) throw new Error('Could not create renter')

    const compressedPath = `public/uploads/users/${renter.userId}/avatar/`
    createChild({ id: renter.userId, file: image, compressedPath, category: MediaCategory.User })

    return res.status(201).json(renter)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(409)
  }
}

async function getRenterCarsHandler(req: Request<GetUserInput['params']>, res: Response) {
  try {
    const cars = await getRenterCars(req.params.userId)

    return res.status(200).json(cars)
  } catch (e: any) {
    log.error(e)

    return res.status(404).json('Car not found')
  }
}

async function getRenterHandler(req: Request<GetUserInput['params']>, res: Response) {
  try {
    const renter = await findRenter({ userId: req.params.userId })
    return res.status(200).json(renter)
  } catch (e: any) {
    log.error(e)

    return res.status(404).json('Renter not found')
  }
}

export { createRenterHandler, getRenterCarsHandler, getRenterHandler }
