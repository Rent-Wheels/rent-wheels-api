import config from 'config'
import mongoose from 'mongoose'

import log from './logger'

mongoose.connection.on('open', () => log.info('Connected to mongo db'))
mongoose.connection.on('error', async e => {
  log.info(e)
  await mongoose.disconnect()
})

async function mongoConnect() {
  return await mongoose.connect(config.get<string>('mongoUrl'))
}

async function mongoDisconnect() {
  return await mongoose.disconnect()
}
export { mongoConnect, mongoDisconnect }
