import express from 'express'

import {
  addCarHandler,
  availableCarsHandler,
  updateCarHandler,
} from '../controllers/car.controller'
import requireUser from '../middlewares/requireUser'
import validateInput from '../middlewares/validateInput'
import { createCarSchema, updateCarSchema } from '../schema/car.schema'

const carsRoute = express.Router()

carsRoute.get('/available', requireUser, availableCarsHandler)
carsRoute.post('/', [requireUser, validateInput(createCarSchema)], addCarHandler)
carsRoute.patch('/:carId/', [requireUser, validateInput(updateCarSchema)], updateCarHandler)

export default carsRoute
