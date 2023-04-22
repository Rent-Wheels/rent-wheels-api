import config from 'config'
import mongoose from 'mongoose'

mongoose.connection.on('open', () => console.log('Connected to mongo db'))
mongoose.connection.on('error', e => console.log(e))

async function mongoConnect() {
  return await mongoose.connect(config.get<string>('mongoUrl'))
}

export { mongoConnect }
