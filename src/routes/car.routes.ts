import express from 'express'
import { addCarHandler, availableCarsHandler } from '../controllers/car.controller'

const carsRoute = express.Router()

carsRoute.post('/', addCarHandler)
carsRoute.get('/available-cars', availableCarsHandler)

export default carsRoute
