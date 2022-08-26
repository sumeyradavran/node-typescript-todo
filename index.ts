import express from 'express'
import connect from './src/utils/database'
import logger from './src/utils/logger'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import { routes } from './src/routes'

const app = express()
const port = config.get<number>('port')

app.use(express.json())
app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`)
  await connect()
  routes(app)
})
