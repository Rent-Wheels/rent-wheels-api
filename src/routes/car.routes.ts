import express from 'express'

import isRenter from '../middlewares/isRenter'
import requireUser from '../middlewares/requireUser'
import validateInput from '../middlewares/validateInput'
import { createCarSchema, deleteCarSchema, updateCarSchema } from '../schema/car.schema'

import {
  addCarHandler,
  deleteCarHandler,
  updateCarHandler,
  availableCarsHandler,
  getCarHistoryHandler,
} from '../controllers/car.controller'

const carsRoute = express.Router()

carsRoute.get('/available', requireUser, availableCarsHandler)
carsRoute.get(
  '/:carId/history',
  [requireUser, isRenter, validateInput(deleteCarSchema)],
  getCarHistoryHandler,
)
carsRoute.post('/', [requireUser, isRenter, validateInput(createCarSchema)], addCarHandler)
carsRoute.patch(
  '/:carId/',
  [requireUser, isRenter, validateInput(updateCarSchema)],
  updateCarHandler,
)
carsRoute.delete(
  '/:carId/',
  [requireUser, isRenter, validateInput(deleteCarSchema)],
  deleteCarHandler,
)

export default carsRoute
