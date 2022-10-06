import express, { Router } from 'express'
const UsersRouter: Router = express.Router()
const { registerUser, loginUser, getMe } = require('./userController')
// const { protect } = require('../middleware/authMiddleware')

// dummy request
UsersRouter.get('/', (req, res) => {
  res.send('hello world')
})
UsersRouter.post('/', registerUser)

// UsersRouter.post('/login', loginUser)

// UsersRouter.get('/me', protect, getMe)

module.exports = UsersRouter
