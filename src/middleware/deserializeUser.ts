import { auth } from 'firebase-admin'
import { Request, Response, NextFunction } from 'express'

import { findUser } from '../services/user.service'

export default async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.get('Authorization')?.replace(/^Bearer\s/, '')

  if (!accessToken) return next()

  const authData = await auth().verifyIdToken(accessToken)

  const user = await findUser({ userId: authData.uid })

  if (!user) return next()

  res.locals.user = user

  return next()
}
