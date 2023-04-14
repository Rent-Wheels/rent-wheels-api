import express from 'express'

import { createUserHandler, loginHandler } from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.post('/login', loginHandler)
userRoute.post('/create-user', createUserHandler)

export default userRoute
