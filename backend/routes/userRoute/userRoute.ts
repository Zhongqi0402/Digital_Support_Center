import express, { Router } from 'express'
import { registerUser, loginUser, getCurrentUser } from './userController'
// const { protect } = require('../middleware/authMiddleware')

const UsersRouter: Router = express.Router()
// dummy request
UsersRouter.get('/', (req, res) => {
  res.send('hello world')
})
UsersRouter.post('/', registerUser)

UsersRouter.post('/login', loginUser)

// UsersRouter.get('/me', protect, getCurrentUser)
UsersRouter.get('/me', getCurrentUser)

module.exports = UsersRouter
