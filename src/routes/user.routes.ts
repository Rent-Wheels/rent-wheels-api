import express, { Request, Response } from 'express'

const userRoute = express.Router()

userRoute.post('/create-user', (req: Request, res: Response) => {
  const body = req.body

  res.status(201).json(body)
})

export default userRoute
