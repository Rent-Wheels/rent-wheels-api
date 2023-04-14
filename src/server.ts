import http from 'http'
import * as dotenv from 'dotenv'

import app from './app'
import { mongoConnect } from './util/mongo'

dotenv.config({ path: __dirname + '/.env' })

const server = http.createServer(app)

server.listen(+(process.env.PORT ?? 3000), async () => {
  console.log('Connected')
  await mongoConnect()
})
