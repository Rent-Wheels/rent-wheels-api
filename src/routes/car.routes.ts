import express from 'express'
import { availableCarsHandler } from '../controllers/car.controller'

const carsRoute = express.Router()

carsRoute.get('/available-cars', availableCarsHandler)

export default carsRoute
