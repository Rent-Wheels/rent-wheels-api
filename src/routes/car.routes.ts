import express from 'express'
import {
  addCarHandler,
  availableCarsHandler,
  updateCarHandler,
} from '../controllers/car.controller'

const carsRoute = express.Router()

carsRoute.post('/', addCarHandler)
carsRoute.patch('/:carId/', updateCarHandler)
carsRoute.get('/available-cars', availableCarsHandler)

export default carsRoute
