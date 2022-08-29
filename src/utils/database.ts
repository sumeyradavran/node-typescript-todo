import mongoose from 'mongoose'
import logger from './logger'
import config from 'config'
async function connect() {
  const dbUri = config.get<string>('CONNECT_DATABASE_URI')
  try {
    await mongoose.connect(dbUri)
    logger.info('DB connected')
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

export default connect
