import { Express } from 'express'
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler,
} from '../controllers/session.controller'
import { createUserController } from '../controllers/user.controller'
import { getUserMiddleware } from '../middlewares/getUserMiddleware'
import { validateSchemaMiddleware } from '../middlewares/validateSchema'
import { createSessionSchema } from '../schemas/session.schema'
import { createUserSchema } from '../schemas/user.schema'

export const routes = (app: Express) => {
  app.post(
    '/api/users',
    validateSchemaMiddleware(createUserSchema),
    createUserController
  )
  app.post(
    '/api/sessions',
    validateSchemaMiddleware(createSessionSchema),
    createUserSessionHandler
  )
  app.get('/api/sessions', getUserMiddleware, getUserSessionsHandler)
  app.delete('/api/sessions', getUserMiddleware, deleteUserSessionHandler)
}
