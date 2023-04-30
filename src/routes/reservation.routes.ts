import express from 'express'

import requireUser from '../middlewares/requireUser'
import validateInput from '../middlewares/validateInput'
import {
  createReservationSchema,
  updateReservationSchema,
  updateReservationStatusSchema,
} from '../schema/reservation.schema'
import {
  createReservationHandler,
  updateReservationHandler,
  updateReservationStatusHandler,
} from '../controllers/reservation.controller'

const reservationRoute = express.Router()

reservationRoute.post(
  '/',
  [requireUser, validateInput(createReservationSchema)],
  createReservationHandler,
)

reservationRoute.patch(
  '/:reservationId/',
  [requireUser, validateInput(updateReservationSchema)],
  updateReservationHandler,
)

reservationRoute.patch(
  '/:reservationId/status',
  [requireUser, validateInput(updateReservationStatusSchema)],
  updateReservationStatusHandler,
)

export default reservationRoute
