import express, { Express } from 'express'

import routes from './routes'

const app: Express = express()

app.use(express.json())

routes(app)

export default app
