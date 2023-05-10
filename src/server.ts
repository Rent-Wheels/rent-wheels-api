import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

import config from 'config'
import admin, { ServiceAccount } from 'firebase-admin'

import app from './app'
import log from './util/logger'
import { mongoConnect } from './util/mongo'
import serviceAccount from '../rentwheels-service-account.json'

const server = http.createServer(app)
const PORT = config.get<number>('port')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
})

server.listen(PORT, async () => {
  log.info('Connected')
  await mongoConnect()
})
