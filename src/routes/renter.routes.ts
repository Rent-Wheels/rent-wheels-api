import multer from 'multer'
import express from 'express'

import requireUser from '../middleware/requireUser'
import validateInput from '../middleware/validateInput'
import { createUserSchema, getUserSchema } from '../schema/user.schema'
import { userFileFilter, userFileStorage } from '../util/multer.config'
import {
  createRenterHandler,
  getRenterCarsHandler,
  getRenterHandler,
} from '../controllers/renter.controller'

const renterRoute = express.Router()

renterRoute.get('/:userId/', requireUser, validateInput(getUserSchema), getRenterHandler)
renterRoute.get('/:userId/cars', requireUser, validateInput(getUserSchema), getRenterCarsHandler)
renterRoute.post(
  '/',
  multer({ storage: userFileStorage, fileFilter: userFileFilter }).single('avatar'),
  validateInput(createUserSchema),
  createRenterHandler,
)

export default renterRoute
