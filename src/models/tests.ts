import mongoose from 'mongoose'

import { Roles } from './enums'
import { Auth } from './dto/userInputs'
// import { User } from './dto/userInputs'

const userId = new mongoose.Types.ObjectId()

const authDetails = {
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
} as Auth

const renterAuthDetails = {
  email: 'Maximo.Barrows@gmail.com',
  password: 'password',
} as Auth

const invalidEmail = {
  email: 'test@test.com',
  password: 'password',
} as Auth

const invalidPassword = {
  email: 'Mandy_Marquardt78@hotmail.com',
  password: '123456789',
} as Auth

const authPayload = {
  _id: userId,
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
} as Auth

const renterAuthPayload = {
  _id: userId,
  email: 'Maximo.Barrows@gmail.com',
  password: 'password',
} as Auth

const userInput = {
  name: 'Alyssa Rolfson',
  age: 20,
  phoneNumber: '(901) 919-5975 x61383',
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
  dob: new Date('10-01-2000').toISOString(),
  role: Roles.User,
}

const renterInput = {
  name: 'Alexander Rowe',
  age: 20,
  phoneNumber: '1-431-965-3155 x5963',
  email: 'Maximo.Barrows@gmail.com',
  password: 'password',
  dob: new Date('10-01-2000').toISOString(),
  role: Roles.Renter,
  cars: [],
}

const userInputWithMissingFields = {
  name: 'Alyssa Rolfson',
  age: 20,
  phoneNumber: '(901) 919-5975 x61383',
  password: 'password',
  dob: new Date('10-01-2000').toISOString(),
  role: Roles.User,
}

const renterInputWithMissingFields = {
  name: 'Alexander Rowe',
  age: 20,
  phoneNumber: '1-431-965-3155 x5963',
  password: 'password',
  dob: new Date('10-01-2000').toISOString(),
  role: Roles.Renter,
}

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

const renterPayload = {
  _id: userId,
  name: 'Alexander Rowe',
  age: 20,
  phoneNumber: '1-431-965-3155 x5963',
  email: 'Maximo.Barrows@gmail.com',
  password: 'password',
  dob: new Date('10-01-2000').toISOString(),
  role: Roles.Renter,
  cars: expect.any(Array),
}

const updateUserPayload = {
  _id: userPayload._id,
  name: 'Alyssa Rolfson',
  age: 20,
  phoneNumber: '(901) 919-5975 x61383',
  email: 'Mandy_Marquardt78@hotmail.com',
  password: 'password',
  dob: new Date('10-01-2000').toISOString(),
  role: Roles.User,
}

const sessionPayload = {
  accessToken: expect.any(Object),
  refreshToken: expect.any(Object),
  session: expect.any(Object),
}

const userPayloadWithSession = {
  session: sessionPayload,
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

const renterPayloadWithSession = {
  session: sessionPayload,
  renter: {
    _id: expect.any(String),
    name: 'Alexander Rowe',
    age: 20,
    phoneNumber: '1-431-965-3155 x5963',
    email: 'Maximo.Barrows@gmail.com',
    password: 'password',
    dob: renterPayload.dob,
    role: Roles.Renter,
    cars: expect.any(Object),
  },
}

export {
  userInput,
  renterInput,
  authPayload,
  authDetails,
  userPayload,
  invalidEmail,
  renterPayload,
  sessionPayload,
  invalidPassword,
  renterAuthDetails,
  renterAuthPayload,
  updateUserPayload,
  userPayloadWithSession,
  renterPayloadWithSession,
  userInputWithMissingFields,
  renterInputWithMissingFields,
}
