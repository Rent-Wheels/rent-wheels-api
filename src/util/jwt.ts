import config from 'config'
import jwt from 'jsonwebtoken'

const accessTokenPublicKey = Buffer.from(
  config.get<string>('accessTokenPublicKey'),
  'base64',
).toString('ascii')
const accessTokenPrivateKey = Buffer.from(
  config.get<string>('accessTokenPrivateKey'),
  'base64',
).toString('ascii')

function signJWT(object: object, options?: jwt.SignOptions) {
  return jwt.sign(object, accessTokenPrivateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

function validateJWT(accessToken: string) {
  try {
    const decoded = jwt.verify(accessToken, accessTokenPublicKey)
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    }
  }
}

export { signJWT, validateJWT }
