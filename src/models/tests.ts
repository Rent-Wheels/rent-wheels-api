import mongoose from 'mongoose'

import { Roles } from './enums'
import { Auth } from './dto/userInputs'
// import { User } from './dto/userInputs'

const userId = new mongoose.Types.ObjectId()

const authDetails = {
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
} as Auth

const authPayload = {
  _id: userId,
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
} as Auth

const userPayload = {
  _id: userId,
  name: 'Alyssa Rolfson',
  age: 20,
  phoneNumber: '(901) 919-5975 x61383',
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
  dob: new Date('10-01-2000').toISOString(),
  role: Roles.User,
}

const userPayloadWithSession = {
  session: {
    accessToken: expect.any(String),
    refreshToken: expect.any(String),
    session: expect.any(String),
  },
  user: {
    _id: expect.any(String),
    name: 'Alyssa Rolfson',
    age: 20,
    phoneNumber: '(901) 919-5975 x61383',
    email: 'Mandy_Marquardt78@hotmail.com',
    password: 'password',
    role: Roles.User,
    dob: userPayload.dob,
  },
}

const userInput = {
  name: 'Alyssa Rolfson',
  age: 20,
  phoneNumber: '(901) 919-5975 x61383',
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
  dob: new Date('10-01-2000').toISOString(),
  role: Roles.User,
}

const userInputWithMissingFields = {
  name: 'Alyssa Rolfson',
  age: 20,
  phoneNumber: '(901) 919-5975 x61383',
  password: 'password',
  dob: new Date('10-01-2000').toISOString(),
  role: Roles.User,
}

export {
  authPayload,
  authDetails,
  userPayload,
  userInput,
  userPayloadWithSession,
  userInputWithMissingFields,
}
