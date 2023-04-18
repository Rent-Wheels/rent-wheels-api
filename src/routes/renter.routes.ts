import express from 'express'

import { createRenterHandler, getRenterCarsHandler } from '../controllers/renter.controller'

const renterRoute = express.Router()

renterRoute.post('/', createRenterHandler)
renterRoute.get('/:userId/cars', getRenterCarsHandler)

export default renterRoute
