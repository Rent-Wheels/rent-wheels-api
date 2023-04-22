import config from 'config'
import { get } from 'lodash'

import { findUser } from './user.service'
import { signJWT, validateJWT } from '../util/jwt'
import SessionModel from '../models/session.mongo'

async function createSession(userId: string) {
  return await SessionModel.create({ userId })
}

async function deleteSession(sessionId: string) {
  return await SessionModel.deleteOne({ _id: sessionId })
}

async function refreshSession(refreshToken: string) {
  const { decoded } = validateJWT(refreshToken)

  if (!decoded || !get(decoded, 'session')) return false

  const session = await SessionModel.findById(get(decoded, 'session'))

  if (!session || !session.valid) return false

  const user = await findUser({ _id: session.user })

  if (!user) return false

  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>('accessTokenTTL'),
    },
  )

  return accessToken
}

export { createSession, deleteSession, refreshSession }
