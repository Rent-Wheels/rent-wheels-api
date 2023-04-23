import { Request, Response } from 'express'

import log from '../util/logger'
import { Car } from '../models/dto/userInputs'
import { findUser } from '../services/user.service'
import { CreateCarInput, DeleteCarInput, UpdateCarInput } from '../schema/car.schema'
import { addCar, availableCars, deleteCar, findCar, updateCar } from '../services/car.service'

async function availableCarsHandler(_req: Request, res: Response) {
  try {
    const cars = await availableCars()
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
    const carDetails = req.body as Car
    const user = res.locals.user

    if (carDetails.owner !== user._id) return res.sendStatus(400)

    const car = await addCar({ carDetails, userId: user._id })

    return res.status(201).json(car)
  } catch (e: any) {
    log.info(e)

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

    if (carDetails.owner !== userId) return res.sendStatus(403)

    const updatedCar = await updateCar({ _id: carId }, carDetails, { new: true })
    return res.status(200).json(updatedCar)
  } catch (e: any) {
    log.info(e)

    return res.status(400).json(e.message)
  }
}

async function deleteCarHandler(
  req: Request<DeleteCarInput['params'], Record<string, never>, Record<string, never>>,
  res: Response,
) {
  try {
    const carId = req.params.carId
    const car = await findCar({ _id: carId })

    if (!car) return res.sendStatus(404)

    const owner = await findUser({ _id: car.owner })

    if (!owner) return res.sendStatus(404)

    if (owner._id.toString() !== res.locals.user._id) return res.sendStatus(403)

    await deleteCar({ _id: carId })
    owner.deleteCar(carId)
    await owner.save()

    return res.sendStatus(200)
  } catch (e: any) {
    log.info(e)

    return res.status(400).json(e.message)
  }
}

export { availableCarsHandler, addCarHandler, updateCarHandler, deleteCarHandler }
