import { Router } from 'express'
import multer from 'multer'
import multerConfig from './app/config/multer'

import userController from './app/controller/UserController'
import sessionController from './app/controller/SessionController'
import ProductController from './app/controller/ProductController'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', userController.store)

routes.post('/sessions', sessionController.store)

routes.post('/products', upload.single('file'), ProductController.store)

export default routes
