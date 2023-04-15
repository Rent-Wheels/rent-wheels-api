import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/user.mongo'

async function userExists(req: Request, res: Response, next: NextFunction) {
  const user = await UserModel.findOne({ id: req.params.userID })
  if (!user) return res.status(404).json('User not found')
  return next()
}

export { userExists }
