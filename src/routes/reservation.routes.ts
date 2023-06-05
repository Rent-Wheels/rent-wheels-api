import express from 'express'

import requireUser from '../middleware/requireUser'
import validateInput from '../middleware/validateInput'
import {
  createReservationSchema,
  deleteReservationSchema,
  updateReservationSchema,
  updateReservationStatusSchema,
} from '../schema/reservation.schema'
import {
  createReservationHandler,
  deleteReservationHandler,
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

reservationRoute.delete(
  '/:reservationId/',
  [requireUser, validateInput(deleteReservationSchema)],
  deleteReservationHandler,
)

export default reservationRoute
