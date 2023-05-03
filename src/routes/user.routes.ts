import express from 'express'

import requireUser from '../middlewares/requireUser'
import validateInput from '../middlewares/validateInput'

import {
  loginSchema,
  getUserSchema,
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
  upgradeUserSchema,
  getUserReservationHistorySchema,
  clearUserReservationHistorySchema,
} from '../schema/user.schema'

import {
  loginHandler,
  logoutHandler,
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

userRoute.post('/logout', requireUser, logoutHandler)
userRoute.post('/login', validateInput(loginSchema), loginHandler)
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
