import { Request, Response } from 'express'

import log from '../util/logger'
import { Reservation } from '../models/dto/userInputs'
import { CreateReservationInput } from '../schema/reservation.schema'
import { createReservation } from '../services/reservation.service'

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

export { createReservationHandler }
