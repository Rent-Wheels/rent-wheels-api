import express from 'express'

import requireUser from '../middlewares/requireUser'
import validateInput from '../middlewares/validateInput'
import { createUserSchema, loginSchema, updateUserSchema } from '../schema/user.schema'
import { createUserHandler, loginHandler, updateUserHandler } from '../controllers/user.controller'

const userRoute = express.Router()

userRoute.post('/', validateInput(createUserSchema), createUserHandler)
userRoute.post('/login', validateInput(loginSchema), loginHandler)
userRoute.patch('/:userId/', [requireUser, validateInput(updateUserSchema)], updateUserHandler)

export default userRoute
