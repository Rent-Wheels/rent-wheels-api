import mongoose from 'mongoose'
import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import dotenv from 'dotenv'
dotenv.config()

import app from '../app'
import { signJWT } from '../util/jwt'
import { createUser } from '../services/user.service'
import * as UserService from '../services/user.service'
import { userInput, userPayload, userPayloadWithSession } from '../models/tests'

describe('user', () => {
  let userId = new mongoose.Types.ObjectId().toString()
  jest.setTimeout(15000)

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('get user', () => {
    describe('given the user is not logged in', () => {
      it('should return 403', async () => {
        await supertest(app).get(`/users/${userId}`).expect(403)
      })
    })

    describe('given the user is logged in', () => {
      const jwt = signJWT(userPayload)

      describe('given the user does not exist', () => {
        it('should return 404', async () => {
          await supertest(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${jwt}`)
            .expect(404)
        })
      })

      describe('given the user does exist', () => {
        it('should return a 200 status with the userDetails', async () => {
          const user = await createUser(userPayload)
          userId = user._id
          await supertest(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${jwt}`)
            .expect(200)
        })
      })
    })
  })

  describe('createUser', () => {
    describe('given all data is given', () => {
      it('should return a 201 status and sessionId, refreshToken and accessToken', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockReturnValue(userPayload)

        const { body, statusCode } = await supertest(app).post('/users/').send(userInput)

        expect(statusCode).toBe(201)

        expect(body).toMatchObject(userPayloadWithSession)

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
      })
    })
  })
})
