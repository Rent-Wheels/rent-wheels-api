import { Express, Request, Response } from 'express'

import carsRoute from './routes/car.routes'
import userRoute from './routes/user.routes'

export default function routes(app: Express) {
  app.use('/cars', carsRoute)
  app.use('/users', userRoute)
  app.get('/healthcare', (_req: Request, res: Response) => res.sendStatus(200))
}
