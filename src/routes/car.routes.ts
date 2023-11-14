import express from 'express'

import isRenter from '../middleware/isRenter'
import requireUser from '../middleware/requireUser'
import validateInput from '../middleware/validateInput'

import {
  createCarSchema,
  deleteCarSchema,
  updateCarSchema,
  changeCarAvailabilitySchema,
} from '../schema/car.schema'

import {
  addCarHandler,
  deleteCarHandler,
  updateCarHandler,
  availableCarsHandler,
  getCarHistoryHandler,
  changeAvailabilityHandler,
} from '../controllers/car.controller'

const carsRoute = express.Router()

carsRoute.get('/available', requireUser, availableCarsHandler)
carsRoute.get('/:carId/history', [requireUser, isRenter], getCarHistoryHandler)

carsRoute.post('/', [requireUser, isRenter, validateInput(createCarSchema)], addCarHandler)

carsRoute.patch(
  '/:carId/',
  [requireUser, isRenter, validateInput(updateCarSchema)],
  updateCarHandler,
)

carsRoute.patch(
  '/:carId/availability',
  [requireUser, isRenter, validateInput(changeCarAvailabilitySchema)],
  changeAvailabilityHandler,
)

carsRoute.delete(
  '/:carId/',
  [requireUser, isRenter, validateInput(deleteCarSchema)],
  deleteCarHandler,
)

export default carsRoute
