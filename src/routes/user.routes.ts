import express from 'express'

import { createUserHandler } from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.post('/create-user', createUserHandler)

export default userRoute
