import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

import config from 'config'
import admin, { ServiceAccount } from 'firebase-admin'

import app from './app'
import log from './util/logger'
import { mongoConnect } from './util/mongo'

const server = http.createServer(app)
const PORT = config.get<number>('port')

admin.initializeApp({
  credential: admin.credential.cert({
    type: config.get<string>('type'),
    project_id: config.get<string>('project_id'),
    private_key_id: config.get<string>('private_key_id'),
    private_key: config.get<string>('private_key'),
    client_email: config.get<string>('client_email'),
    client_id: config.get<string>('client_id'),
    auth_uri: config.get<string>('auth_uri'),
    token_uri: config.get<string>('token_uri'),
    auth_provider_x509_cert_url: config.get<string>('auth_provider_x509_cert_url'),
    client_x509_cert_url: config.get<string>('client_x509_cert_url'),
  } as ServiceAccount),
})

server.listen(PORT, async () => {
  log.info('Connected')
  await mongoConnect()
})
