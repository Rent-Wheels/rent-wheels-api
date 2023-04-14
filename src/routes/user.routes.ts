import express from 'express'

import { createUserHandler, loginHandler } from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.post('/login', loginHandler)
userRoute.post('/create-account', createUserHandler)

export default userRoute
