import mongoose from 'mongoose'
import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import dotenv from 'dotenv'
dotenv.config()

import app from '../app'
import { signJWT } from '../util/jwt'
import { createUser } from '../services/user.service'
import * as UserService from '../services/user.service'
import * as AuthService from '../services/auth.service'
import {
  authDetails,
  authPayload,
  userInput,
  userInputWithMissingFields,
  userPayload,
  userPayloadWithSession,
} from '../models/tests'
import { User } from '../models/dto/userInputs'

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
          const user = await createUser({ ...userPayload, dob: new Date(userPayload.dob) } as User)
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
        const createAuthService = jest
          .spyOn(AuthService, 'createAuth')
          // @ts-ignore
          .mockReturnValueOnce(authPayload)

        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockReturnValueOnce(userPayload)

        const { body, statusCode } = await supertest(app).post('/users/').send(userInput)

        expect(statusCode).toBe(201)
        expect(body).toEqual(userPayloadWithSession)

        expect(createAuthService).toBeCalledWith(authDetails)
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
      })
    })

    describe('given some data is omitted', () => {
      it('should return 400', async () => {
        const createAuthService = jest
          .spyOn(AuthService, 'createAuth')
          // @ts-ignore
          .mockReturnValueOnce(authPayload)

        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          //  @ts-ignore
          .mockReturnValueOnce(userPayload)

        await supertest(app).post('/users/').send(userInputWithMissingFields).expect(400)

        expect(createAuthService).not.toHaveBeenCalled()
        expect(createUserServiceMock).not.toHaveBeenCalled()
      })
    })

    describe('given some data is duplicated', () => {
      it('should return 409', async () => {
        const createAuthService = jest
          .spyOn(AuthService, 'createAuth')
          // @ts-ignore
          .mockRejectedValueOnce('Duplicate found')

        const createUserServiceMock = jest
          .spyOn(UserService, 'createUser')
          //  @ts-ignore
          .mockReturnValueOnce(userPayload)

        await supertest(app).post('/users/').send(userInput).expect(409)

        expect(createAuthService).toHaveBeenCalledWith(authDetails)
        expect(createUserServiceMock).not.toHaveBeenCalled()
      })
    })
  })
})
