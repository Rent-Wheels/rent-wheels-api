import express, { Express } from 'express'

import routes from './routes'
import deserializeUser from './middleware/deserializeUser'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(deserializeUser)
app.use('/public', express.static('public'))

routes(app)

export default app
