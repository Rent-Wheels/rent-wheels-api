import config from 'config'
import jwt from 'jsonwebtoken'

const accessTokenPublicKey = config.get<string>('accessTokenPublicKey')
const accessTokenPrivateKey = config.get<string>('accessTokenPrivateKey')

function signJWT(object: object, options: jwt.SignOptions | undefined) {
  return jwt.sign(object, accessTokenPrivateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

function validateJWT(accessToken: string) {
  return jwt.verify(accessToken, accessTokenPublicKey)
}

export { signJWT, validateJWT }
