import helmet from 'helmet'
import morgan from 'morgan'
import express, { Express } from 'express'

import routes from './routes'
import deserializeUser from './middleware/deserializeUser'

const app: Express = express()

app.use(helmet())
app.use([express.json(), express.urlencoded({ extended: true })])
app.use(morgan('combined'))
app.use(deserializeUser)

routes(app)

export default app
