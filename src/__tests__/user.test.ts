import supertest from 'supertest'
import dotenv from 'dotenv'
dotenv.config()

import app from '../app'
import { Roles } from '../models/enums'
import { User } from '../models/dto/userInputs'
import { createUser } from '../services/user.service'
import { mongoConnect, mongoDisconnect } from '../util/mongo'

const userPayload = {
  name: 'Alexander Asiamah Boakye',
  age: 20,
  phoneNumber: '+233 20 983 5922',
  email: 'aalexanderkwaku@yahoo.co.uk',
  password: 'password',
  dob: new Date('10-01-2000'),
  role: Roles.User,
} as User

describe('user', () => {
  jest.setTimeout(15000)

  beforeAll(async () => {
    await mongoConnect()
  })

  afterAll(async () => {
    await mongoDisconnect()
  })

  describe('get user', () => {
    describe('given the user does not exist', () => {
      it('should return 404', async () => {
        const userId = 'userId'
        await supertest(app).get(`/users/${userId}`).expect(404)
      })
    })

    describe('given the user does exist', () => {
      it('should return a 200 status with the userDetails', async () => {
        const user = await createUser(userPayload)
        const userId = user._id

        const { body, statusCode } = await supertest(app).post('/users/').send(userPayload)

        expect(statusCode).toBe(201)
        expect(body._id).toBe(userId)
      })
    })
  })
})
