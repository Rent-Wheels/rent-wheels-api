import express from 'express'

import requireUser from '../middlewares/requireUser'
import { createUserHandler, loginHandler, updateUserHandler } from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.post('/', createUserHandler)
userRoute.post('/login', loginHandler)
userRoute.patch('/:userId/', requireUser, updateUserHandler)

export default userRoute
