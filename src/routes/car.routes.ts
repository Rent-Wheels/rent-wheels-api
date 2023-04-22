import express from 'express'

import {
  addCarHandler,
  availableCarsHandler,
  updateCarHandler,
} from '../controllers/car.controller'
import isRenter from '../middlewares/isRenter'
import requireUser from '../middlewares/requireUser'
import validateInput from '../middlewares/validateInput'
import { createCarSchema, updateCarSchema } from '../schema/car.schema'

const carsRoute = express.Router()

carsRoute.get('/available', requireUser, availableCarsHandler)
carsRoute.post('/', [requireUser, isRenter, validateInput(createCarSchema)], addCarHandler)
carsRoute.patch(
  '/:carId/',
  [requireUser, isRenter, validateInput(updateCarSchema)],
  updateCarHandler,
)

export default carsRoute
