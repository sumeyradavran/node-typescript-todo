import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import connect from 'utils/database'
import logger from 'utils/logger'
import { routes } from 'routes'
import { userTokenMiddleware } from 'middlewares/userTokenMiddleware'

const port = config.get<number>('port')
const app = express()

app.use(express.json())
app.use(userTokenMiddleware)

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`)
  await connect()
  routes(app)
})
