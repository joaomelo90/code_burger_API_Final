import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import userController from './app/controller/UserController'
import sessionController from './app/controller/SessionController'
import ProductController from './app/controller/ProductController'
import CategoryController from './app/controller/CategoryController'
import OrderController from './app/controller/OrderController'

import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', userController.store)

routes.post('/sessions', sessionController.store)

routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)

export default routes
