import mongoose from 'mongoose'

import { Roles } from './enums'
import { User } from './dto/userInputs'

const userId = new mongoose.Types.ObjectId()

const userPayload = {
  _id: userId,
  name: 'Alyssa Rolfson',
  age: 20,
  phoneNumber: '(901) 919-5975 x61383',
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
  dob: new Date('10-01-2000'),
  role: Roles.User,
} as User

const userPayloadWithSession = {
  session: {
    accessToken: expect.any(String),
    refreshToken: expect.any(String),
    session: expect.any(String),
  },
  user: { ...userPayload, dob: userPayload.dob },
}

const userInput = {
  name: 'Alyssa Rolfson',
  age: 20,
  phoneNumber: '(901) 919-5975 x61383',
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
  dob: new Date('10-01-2000'),
  role: Roles.User,
} as User

export { userPayload, userInput, userPayloadWithSession }
