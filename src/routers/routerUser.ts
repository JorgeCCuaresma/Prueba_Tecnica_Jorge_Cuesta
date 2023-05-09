import { Router, RequestHandler } from 'express'
import { getUser, loginUser, registerUser, updateUser } from '../controllers/user'
import { jwtMiddleware } from '../middlewares'
const routerUser: Router = Router()

routerUser.post('/register', registerUser as RequestHandler)
routerUser.post('/login', loginUser as RequestHandler)
routerUser.get('/profile/:id', jwtMiddleware, getUser as RequestHandler)
routerUser.patch('/profile/:id', jwtMiddleware, updateUser as RequestHandler)

export default routerUser
