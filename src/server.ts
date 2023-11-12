import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

import config from 'config'

import app from './app'
import log from './util/logger'
import initializeFirebaseApp from './util/initializeFirebaseApp'

const server = http.createServer(app)
const PORT = config.get<number>('port')

server.listen(PORT, () => {
  initializeFirebaseApp()
  log.info('Connected')
})
