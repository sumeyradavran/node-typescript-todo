import { Express } from 'express'
import { createUserController } from '../controllers/user.controller'
import { validateSchemaMiddleware } from '../middlewares/validateSchema'
import { createUserSchema } from '../schemas/user.schema'

export const routes = (app: Express) => {
  app.post(
    '/api/users',
    validateSchemaMiddleware(createUserSchema),
    createUserController
  )
}
