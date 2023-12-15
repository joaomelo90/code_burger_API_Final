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
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/categories', upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)

export default routes
