import multer from 'multer'
import express from 'express'

import requireUser from '../middleware/requireUser'
import validateInput from '../middleware/validateInput'
import { createUserSchema } from '../schema/user.schema'
import { createRenterHandler, getRenterCarsHandler } from '../controllers/renter.controller'
import { userFileFilter, userFileStorage } from '../util/multer.config'

const renterRoute = express.Router()

renterRoute.get('/:userId/cars', requireUser, getRenterCarsHandler)
renterRoute.post(
  '/',
  multer({ storage: userFileStorage, fileFilter: userFileFilter }).single('avatar'),
  validateInput(createUserSchema),
  createRenterHandler,
)

export default renterRoute
