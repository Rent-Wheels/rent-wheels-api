import { Request, Response } from 'express'
import { availableCars } from '../services/cars.service'

async function availableCarsHandler(_req: Request, res: Response) {
  try {
    const cars = await availableCars()
    return res.status(200).json(cars)
  } catch (e: any) {
    return res.status(400).json(e.message)
  }
}

export { availableCarsHandler }
