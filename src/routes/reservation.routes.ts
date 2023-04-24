import express from 'express'

import requireUser from '../middlewares/requireUser'
import validateInput from '../middlewares/validateInput'
import { createReservationSchema } from '../schema/reservation.schema'
import { createReservationHandler } from '../controllers/reservation.controller'

const reservationRoute = express.Router()

reservationRoute.post(
  '/',
  [requireUser, validateInput(createReservationSchema)],
  createReservationHandler,
)

export default reservationRoute
