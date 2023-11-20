import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'

import log from '../util/logger'
import { Car } from '../models/dto/userInputs'

import {
  CreateCarInput,
  DeleteCarInput,
  UpdateCarInput,
  ChangeCarAvailabilityInput,
} from '../schema/car.schema'

import {
  addCar,
  findCar,
  deleteCar,
  updateCar,
  availableCars,
  getCarHistory,
  changeAvailability,
} from '../services/car.service'

async function availableCarsHandler(req: Request, res: Response) {
  try {
    const location = req.query.location as string | undefined
    let filter: Prisma.carsWhereInput = { availability: true }

    if (location) {
      filter = { availability: true, location: { contains: location } }
    }

    console.log(filter)

    const cars = await availableCars(filter)
    return res.status(200).json(cars)
  } catch (e: any) {
    return res.status(400).json(e.message)
  }
}

async function addCarHandler(
  req: Request<Record<string, never>, Record<string, never>, CreateCarInput['body']>,
  res: Response,
) {
  try {
    const user = res.locals.user
    const carDetails = {
      ...req.body,
      availability: true,
    } as Car

    if (carDetails.ownerId !== user.id.toString()) return res.sendStatus(400)

    const car = await addCar({ carDetails, userId: user.id })

    return res.status(201).json(car)
  } catch (e: any) {
    log.error(e)

    return res.status(400).json(e.message)
  }
}

async function updateCarHandler(
  req: Request<UpdateCarInput['params'], Record<string, never>, UpdateCarInput['body']>,
  res: Response,
) {
  try {
    const carId = req.params.carId
    const userId = res.locals.user._id
    const carDetails = req.body as Car

    const car = await findCar({ id: carId })

    if (!car) return res.sendStatus(404)

    if (carDetails.ownerId !== userId.toString()) return res.sendStatus(403)

    const updatedCar = await updateCar({ carDetails, id: carId })

    return res.status(200).json(updatedCar)
  } catch (e: any) {
    log.error(e)

    return res.status(400).json(e.message)
  }
}

async function deleteCarHandler(
  req: Request<DeleteCarInput['params'], Record<string, never>, Record<string, never>>,
  res: Response,
) {
  try {
    const carId = req.params.carId
    const ownerId = res.locals.user._id
    const car = await findCar({ id: carId, ownerId })

    if (!car) return res.sendStatus(404)

    await deleteCar(carId)

    return res.sendStatus(200)
  } catch (e: any) {
    log.error(e)

    return res.status(400).json(e.message)
  }
}

async function getCarHistoryHandler(
  req: Request<DeleteCarInput['params'], Record<string, never>, Record<string, never>>,
  res: Response,
) {
  try {
    const carId = req.params.carId
    const ownerId = res.locals.user.id
    const car = await findCar({ id: carId })

    if (!car) return res.sendStatus(404)

    const history = await getCarHistory({ id: carId, ownerId })
    if (!history) return res.sendStatus(404)

    return res.status(200).json(history)
  } catch (e: any) {
    log.error(e)

    return res.status(400).json(e.message)
  }
}

async function changeAvailabilityHandler(
  req: Request<
    ChangeCarAvailabilityInput['params'],
    Record<string, never>,
    ChangeCarAvailabilityInput['body']
  >,
  res: Response,
) {
  try {
    const carId = req.params.carId
    const ownerId = res.locals.user._id
    const availability = req.body.availability

    const updatedCar = await changeAvailability({ filter: { id: carId, ownerId }, availability })

    return res.status(200).json(updatedCar)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(404)
  }
}

export {
  addCarHandler,
  updateCarHandler,
  deleteCarHandler,
  getCarHistoryHandler,
  availableCarsHandler,
  changeAvailabilityHandler,
}
