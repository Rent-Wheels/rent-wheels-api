import express from 'express'

import requireUser from '../middleware/requireUser'
import validateInput from '../middleware/validateInput'

import { getUserSchema, createUserSchema, updateUserSchema } from '../schema/user.schema'

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
userRoute.get('/reservations/history', requireUser, getUserReservationHistoryHandler)

userRoute.post('/', validateInput(createUserSchema), createUserHandler)

userRoute.patch('/', [requireUser, validateInput(updateUserSchema)], updateUserHandler)
userRoute.patch('/upgrade', requireUser, upgradeToRenterHandler)

userRoute.delete('/', requireUser, deleteUserHandler)
userRoute.delete('/reservations/history', requireUser, clearUserReservationHistoryHandler)

export default userRoute
