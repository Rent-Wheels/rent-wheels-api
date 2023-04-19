import { Request, Response } from 'express'
import { addCar, availableCars } from '../services/cars.service'
import { CarDetails } from '../models/dto/userInputs'

async function availableCarsHandler(_req: Request, res: Response) {
  try {
    const cars = await availableCars()
    return res.status(200).json(cars)
  } catch (e: any) {
    return res.status(400).json(e.message)
  }
}

async function addCarHandler(req: Request, res: Response) {
  try {
    const carDetails = req.body as CarDetails
    carDetails.owner = req.params.userId

    const car = await addCar(carDetails)

    return res.status(201).json(car)
  } catch (e: any) {
    return res.sendStatus(400)
  }
}

export { availableCarsHandler, addCarHandler }
