import { Request, Response } from 'express'

import log from '../util/logger'

import { Roles } from '../models/enums'
import { User } from '../models/dto/userInputs'
import { getRenterCars } from '../services/renter.service'
import { createUser, findRenter, getRenters } from '../services/user.service'
import { CreateUserInput, GetUserInput } from '../schema/user.schema'

async function getRentersHandler(_req: Request, res: Response) {
  try {
    const renters = await getRenters()

    return res.status(200).json(renters)
  } catch (e: any) {
    log.error(e)
    return res.status(400).json(e)
  }
}

async function createRenterHandler(
  req: Request<Record<string, never>, Record<string, never>, CreateUserInput['body']>,
  res: Response,
) {
  try {
    const signUpDetails = {
      ...req.body,
      role: Roles.Renter,
    } as User

    const renter = await createUser(signUpDetails)

    if (!renter) throw new Error('Could not create renter')

    return res.status(201).json(renter)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(409)
  }
}

async function getRenterCarsHandler(req: Request<GetUserInput['params']>, res: Response) {
  try {
    const cars = await getRenterCars(req.params.userId)

    return res.status(200).json(cars?.cars)
  } catch (e: any) {
    log.error(e)

    return res.status(404).json('Car not found')
  }
}

async function getRenterHandler(req: Request<GetUserInput['params']>, res: Response) {
  try {
    const renter =
      (await findRenter({ userId: req.params.userId })) ??
      (await findRenter({ id: req.params.userId }))
    if (!renter) return res.sendStatus(404)
    return res.status(200).json(renter)
  } catch (e: any) {
    return log.error(e)
  }
}

export { createRenterHandler, getRenterCarsHandler, getRenterHandler, getRentersHandler }
