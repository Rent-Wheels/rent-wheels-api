import express from 'express'

import requireUser from '../middleware/requireUser'
import validateInput from '../middleware/validateInput'
import { createUserSchema, getUserSchema } from '../schema/user.schema'
import {
  createRenterHandler,
  getRenterCarsHandler,
  getRenterHandler,
} from '../controllers/renter.controller'

const renterRoute = express.Router()

renterRoute.post('/', validateInput(createUserSchema), createRenterHandler)
renterRoute.get('/:userId/', requireUser, validateInput(getUserSchema), getRenterHandler)
renterRoute.get('/:userId/cars', requireUser, validateInput(getUserSchema), getRenterCarsHandler)

export default renterRoute
