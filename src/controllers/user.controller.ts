import { Request, Response } from 'express'
import { CreateUserInput } from '../schemas/user.schema'
import { createUser } from '../services/user.service'
import logger from '../utils/logger'

export async function createUserController(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  createUser(req.body)
    .then((user) => {
      return res.send(user)
    })
    .catch((e) => {
      logger.error(e)
      return res.status(409).send(e.message)
    })
}
