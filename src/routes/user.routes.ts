import express from 'express'

import requireUser from '../middleware/requireUser'
import validateInput from '../middleware/validateInput'

import {
  getUserSchema,
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
  upgradeUserSchema,
  getUserReservationHistorySchema,
  clearUserReservationHistorySchema,
} from '../schema/user.schema'

import {
  getUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  upgradeToRenterHandler,
  getUserReservationHistoryHandler,
  clearUserReservationHistoryHandler,
} from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.get('/:userId', [requireUser, validateInput(getUserSchema)], getUserHandler)
userRoute.get(
  '/:userId/reservations/history',
  [requireUser, validateInput(getUserReservationHistorySchema)],
  getUserReservationHistoryHandler,
)

userRoute.post('/', validateInput(createUserSchema), createUserHandler)

userRoute.patch('/:userId/', [requireUser, validateInput(updateUserSchema)], updateUserHandler)
userRoute.patch(
  '/:userId/upgrade',
  [requireUser, validateInput(upgradeUserSchema)],
  upgradeToRenterHandler,
)

userRoute.delete('/:userId/', [requireUser, validateInput(deleteUserSchema)], deleteUserHandler)
userRoute.delete(
  '/:userId/reservations/history',
  [requireUser, validateInput(clearUserReservationHistorySchema)],
  clearUserReservationHistoryHandler,
)

export default userRoute
