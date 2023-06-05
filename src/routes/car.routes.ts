import multer from 'multer'
import express from 'express'

import isRenter from '../middleware/isRenter'
import requireUser from '../middleware/requireUser'
import validateInput from '../middleware/validateInput'
import { carFileFilter, carFileStorage } from '../util/multer.config'

import {
  createCarSchema,
  deleteCarSchema,
  updateCarSchema,
  getCarHistorySchema,
  updateCarMediaSchema,
  changeCarAvailabilitySchema,
} from '../schema/car.schema'

import {
  addCarHandler,
  deleteCarHandler,
  updateCarHandler,
  availableCarsHandler,
  getCarHistoryHandler,
  updateCarMediaHandler,
  changeAvailabilityHandler,
} from '../controllers/car.controller'

const carsRoute = express.Router()

carsRoute.get('/available', requireUser, availableCarsHandler)
carsRoute.get(
  '/:carId/history',
  [requireUser, isRenter, validateInput(getCarHistorySchema)],
  getCarHistoryHandler,
)

carsRoute.post(
  '/',
  [
    requireUser,
    isRenter,
    multer({ storage: carFileStorage, fileFilter: carFileFilter }).array('media'),
    validateInput(createCarSchema),
  ],
  addCarHandler,
)

carsRoute.put(
  '/:carId/',
  [
    requireUser,
    isRenter,
    multer({ storage: carFileStorage, fileFilter: carFileFilter }).array('media'),
    validateInput(updateCarSchema),
  ],
  updateCarHandler,
)

carsRoute.patch(
  '/:carId/availability',
  [requireUser, isRenter, validateInput(changeCarAvailabilitySchema)],
  changeAvailabilityHandler,
)

carsRoute.delete(
  '/:carId/media',
  [requireUser, isRenter, validateInput(updateCarMediaSchema)],
  updateCarMediaHandler,
)

carsRoute.delete(
  '/:carId/',
  [requireUser, isRenter, validateInput(deleteCarSchema)],
  deleteCarHandler,
)

export default carsRoute
