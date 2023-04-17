import express from 'express'

import { userExists } from '../middlewares/exists'
import {
  createUserHandler,
  loginHandler,
  updateUserHandler,
  createRenterHandler,
} from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.post('/login', loginHandler)
userRoute.post('/create-account', createUserHandler)
userRoute.post('/create-renter', createRenterHandler)
userRoute.patch('/:userId/update-account', userExists, updateUserHandler)

export default userRoute
