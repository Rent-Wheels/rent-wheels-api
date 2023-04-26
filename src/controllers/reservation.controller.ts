import { Request, Response } from 'express'

import log from '../util/logger'
import { Reservation } from '../models/dto/userInputs'
import { createReservation, updateReservationStatus } from '../services/reservation.service'
import { CreateReservationInput, UpdateReservationStatusInput } from '../schema/reservation.schema'

async function createReservationHandler(
  req: Request<Record<never, never>, Record<never, never>, CreateReservationInput['body']>,
  res: Response,
) {
  try {
    const reservationDetails = req.body as Reservation
    const reservation = await createReservation(reservationDetails)

    return res.status(201).json(reservation)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(400)
  }
}

async function updateReservationStatusHandler(
  req: Request<
    UpdateReservationStatusInput['params'],
    Record<never, never>,
    UpdateReservationStatusInput['body']
  >,
  res: Response,
) {
  try {
    const status = req.body.status
    const reservationId = req.params.reservationId

    const updatedReservation = await updateReservationStatus({
      status,
      filter: { _id: reservationId },
    })

    return res.status(200).json(updatedReservation)
  } catch (e: any) {
    log.error(e)

    return res.sendStatus(400)
  }
}
export { createReservationHandler, updateReservationStatusHandler }
