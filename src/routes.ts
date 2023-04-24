import { Express, Request, Response } from 'express'

import carsRoute from './routes/car.routes'
import userRoute from './routes/user.routes'
import renterRoute from './routes/renter.routes'
import reservationRoute from './routes/reservation.routes'

export default function routes(app: Express) {
  app.use('/cars', carsRoute)
  app.use('/users', userRoute)
  app.use('/renters', renterRoute)
  app.use('/reservations', reservationRoute)
  app.get('/healthcare', (_req: Request, res: Response) => res.sendStatus(200))
}
