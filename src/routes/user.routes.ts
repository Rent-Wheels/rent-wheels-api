import express from 'express'

import requireUser from '../middlewares/requireUser'
import validateInput from '../middlewares/validateInput'

import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  loginSchema,
  updateUserSchema,
} from '../schema/user.schema'

import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  loginHandler,
  logoutHandler,
  updateUserHandler,
} from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.get('/:userId', [requireUser, validateInput(getUserSchema)], getUserHandler)

userRoute.post('/logout', requireUser, logoutHandler)
userRoute.post('/login', validateInput(loginSchema), loginHandler)
userRoute.post('/', validateInput(createUserSchema), createUserHandler)

userRoute.patch('/:userId/', [requireUser, validateInput(updateUserSchema)], updateUserHandler)
userRoute.delete('/:userId/', [requireUser, validateInput(deleteUserSchema)], deleteUserHandler)

export default userRoute
