import { Request, Response } from 'express'
import { addCar, availableCars, updateCar } from '../services/car.service'
import { Car } from '../models/dto/userInputs'
import { CreateCarInput, UpdateCarInput } from '../schema/car.schema'

async function availableCarsHandler(_req: Request, res: Response) {
  try {
    const cars = await availableCars()
    return res.status(200).json(cars)
  } catch (e: any) {
    return res.status(400).json(e.message)
  }
}

async function addCarHandler(
  req: Request<Record<string, never>, Record<string, never>, CreateCarInput['carDetails']>,
  res: Response,
) {
  try {
    const carDetails = req.body as Car
    carDetails.owner = req.params.userId

    const car = await addCar(carDetails)

    return res.status(201).json(car)
  } catch (e: any) {
    return res.sendStatus(400)
  }
}

async function updateCarHandler(
  req: Request<UpdateCarInput['params'], Record<string, never>, UpdateCarInput['carDetails']>,
  res: Response,
) {
  try {
    const carId = req.params.carId
    const carDetails = req.body as Car
    const updatedCar = await updateCar({ carId, carDetails })
    return res.status(200).json(updatedCar)
  } catch (e: any) {
    console.log(e)

    return res.status(400).json(e.message)
  }
}

export { availableCarsHandler, addCarHandler, updateCarHandler }
