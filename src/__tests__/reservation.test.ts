import mongoose from 'mongoose'
import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'

import app from '../app'
import { signJWT } from '../util/jwt'
// import { Reservation } from '../models/dto/userInputs'
import * as ReservationService from '../services/reservation.service'
import {
  userJwt,
  reservationInput,
  reservationPayload,
  reservationStatusInput,
  reservationInputOmitted,
} from '../models/tests'

describe('reservation', () => {
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

  describe('createReservation', () => {
    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        await supertest(app).post('/reservations/').expect(403)
      })
    })

    describe('given the user is logged in', () => {
      const jwt = signJWT(userJwt)
      describe('given some data is omitted', () => {
        it('should return a 400', async () => {
          await supertest(app)
            .post('/reservations/')
            .set('Authorization', `Bearer ${jwt}`)
            .send(reservationInputOmitted)
            .expect(400)
        })
      })

      describe('given no data is omitted', () => {
        it('should return a 201 status and reservation payload', async () => {
          const createReservationServiceMock = jest
            .spyOn(ReservationService, 'createReservation')
            //   @ts-ignore
            .mockReturnValueOnce(reservationPayload)

          const { body } = await supertest(app)
            .post('/reservations/')
            .set('Authorization', `Bearer ${jwt}`)
            .send(reservationInput)
            .expect(201)

          expect(body).toEqual(reservationPayload)
          expect(createReservationServiceMock).toHaveBeenCalledWith(reservationInput)
        })
      })
    })
  })

  describe('update status', () => {
    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        await supertest(app).patch(`/reservations/${userId}/status`).expect(403)
      })
    })

    describe('given the user is logged in', () => {
      const jwt = signJWT(userJwt)
      describe('given the reservation does not exist', () => {
        it('should return a 404', async () => {
          const updateReservationStatusMock = jest
            .spyOn(ReservationService, 'updateReservationStatus')
            // @ts-ignore
            .mockRejectedValueOnce('Not found')

          await supertest(app)
            .patch(`/reservations/${userId}/status`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(reservationStatusInput)
            .expect(404)

          expect(updateReservationStatusMock).toHaveBeenCalledWith({
            ...reservationStatusInput,
            filter: { _id: userId },
          })
        })
      })

      describe('given the reservation does exist', () => {
        it('should return a 200 status and reservation payload', async () => {
          const updateReservationStatusMock = jest
            .spyOn(ReservationService, 'updateReservationStatus')
            // @ts-ignore
            .mockReturnValueOnce({ ...reservationPayload, ...reservationStatusInput })

          const { body } = await supertest(app)
            .patch(`/reservations/${reservationPayload._id}/status`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(reservationStatusInput)
            .expect(200)

          expect(body).toEqual({ ...reservationPayload, ...reservationStatusInput })
          expect(updateReservationStatusMock).toHaveBeenCalledWith({
            ...reservationStatusInput,
            filter: { _id: reservationPayload._id },
          })
        })
      })
    })
  })
})
