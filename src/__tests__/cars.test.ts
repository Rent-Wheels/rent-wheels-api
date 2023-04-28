import mongoose from 'mongoose'
import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'

import app from '../app'
import { signJWT } from '../util/jwt'
import { Car, User } from '../models/dto/userInputs'
import * as CarService from '../services/car.service'
import * as UserService from '../services/user.service'
import {
  carInput,
  carPayload,
  userPayload,
  renterInput,
  renterPayload,
  carInputOmitted,
} from '../models/tests'

describe('cars', () => {
  const userId = new mongoose.Types.ObjectId().toString()
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

  describe('create car', () => {
    describe('given user is not logged in', () => {
      it('should return 403', async () => {
        await supertest(app).post(`/cars/`).expect(403)
      })
    })

    describe('given user is logged in', () => {
      describe('given user is not a renter', () => {
        const jwt = signJWT(userPayload)

        it('should return 403', async () => {
          await supertest(app).post(`/cars/`).set('Authorization', `Bearer ${jwt}`).expect(403)
        })
      })

      describe('given user is a renter', () => {
        const jwt = signJWT(renterPayload)

        describe('given car data is omitted', () => {
          it('should return 400', async () => {
            await supertest(app)
              .post(`/cars/`)
              .set('Authorization', `Bearer ${jwt}`)
              .send(carInputOmitted)
              .expect(400)
          })
        })

        describe('given car data is not omitted', () => {
          describe('given that there is no error', () => {
            it('should return 201 status with car object', async () => {
              const addCarServiceMock = jest
                .spyOn(CarService, 'addCar')
                //   @ts-ignore
                .mockReturnValueOnce(carPayload)

              const { body } = await supertest(app)
                .post(`/cars/`)
                .set('Authorization', `Bearer ${jwt}`)
                .send(carInput)
                .expect(201)

              expect(body).toEqual(carPayload)

              expect(addCarServiceMock).toHaveBeenCalledWith({
                carDetails: carInput,
                userId: carInput.owner,
              })
            })
          })

          describe('given that there is an error', () => {
            describe('given the user is not owner', () => {
              it('should return 400', async () => {
                const addCarServiceMock = jest
                  .spyOn(CarService, 'addCar')
                  //   @ts-ignore
                  .mockReturnValueOnce(carPayload)

                await supertest(app)
                  .post(`/cars/`)
                  .set('Authorization', `Bearer ${jwt}`)
                  .send({ ...carInput, owner: userId })
                  .expect(400)

                expect(addCarServiceMock).not.toHaveBeenCalled()
              })
            })

            describe('given the user is the owner', () => {
              it('should return 400', async () => {
                const addCarServiceMock = jest
                  .spyOn(CarService, 'addCar')
                  //   @ts-ignore
                  .mockRejectedValueOnce('Car not created')

                await supertest(app)
                  .post(`/cars/`)
                  .set('Authorization', `Bearer ${jwt}`)
                  .send(carInput)
                  .expect(400)

                expect(addCarServiceMock).toHaveBeenCalledWith({
                  carDetails: carInput,
                  userId: renterPayload._id.toString(),
                })
              })
            })
          })
        })
      })
    })
  })
})
