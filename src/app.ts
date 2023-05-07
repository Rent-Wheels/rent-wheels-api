import express, { Express } from 'express'

import routes from './routes'
import deserializeUser from './middlewares/deserializeUser'

const app: Express = express()

app.use(express.json())
app.use(deserializeUser)

routes(app)

export default app
