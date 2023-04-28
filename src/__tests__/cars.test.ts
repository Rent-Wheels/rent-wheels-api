import mongoose from 'mongoose'
import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'

import app from '../app'
import { signJWT } from '../util/jwt'
import { Car, User } from '../models/dto/userInputs'
import * as CarService from '../services/car.service'
import * as UserService from '../services/user.service'
import { carPayload, renterInput, userPayload } from '../models/tests'

describe('cars', () => {
  // let userId = new mongoose.Types.ObjectId().toString()
  jest.setTimeout(15000)

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('get available cars', () => {
    describe('given user is not logged in', () => {
      it('should return 403', async () => {
        await supertest(app).get(`/cars/available`).expect(403)
      })
    })
    describe('given user is logged in', () => {
      const jwt = signJWT(userPayload)

      describe('given there are no available cars', () => {
        it('should return 200 and an empty array', async () => {
          const { body } = await supertest(app)
            .get(`/cars/available`)
            .set('Authorization', `Bearer ${jwt}`)
            .expect(200)
          expect(body).toEqual([])
        })
      })

      describe('given there are available cars', () => {
        it('should return 200 and an array of cars', async () => {
          const renter = await UserService.createUser({
            ...renterInput,
            dob: new Date(renterInput.dob),
          } as unknown as User)
          await CarService.addCar({
            carDetails: { ...carPayload, owner: renter._id } as Car,
            userId: renter._id,
          })
          const { body } = await supertest(app)
            .get(`/cars/available`)
            .set('Authorization', `Bearer ${jwt}`)
            .expect(200)
          expect(body).toEqual([expect.any(Object)])
        })
      })
    })
  })
})
