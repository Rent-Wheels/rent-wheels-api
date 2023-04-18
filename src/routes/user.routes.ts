import express from 'express'

import { userExists } from '../middlewares/exists'
import { createUserHandler, loginHandler, updateUserHandler } from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.post('/login', loginHandler)
userRoute.post('/', createUserHandler)
userRoute.patch('/:userId/', userExists, updateUserHandler)

export default userRoute
