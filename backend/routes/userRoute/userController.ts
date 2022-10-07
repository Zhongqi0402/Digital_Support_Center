import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './UserModel'

// // Generate token
const generateToken = (id: string) => {
  return jwt.sign({ id }, /*process.env.JWT_SECRET*/ '20', { expiresIn: '30d' })
}

// ------------------------------------------------------------------------
type Next = () => void | Promise<void>

interface RegisterUserBody {
  name: string | null
  email: string | null
  password: string | null
}

interface CustomRequest<T> extends Request {
  body: T
}
// ------------------------------------------------------------------------

// @description register a new user
// @route /api/users
// @access public
const registerUser = asyncHandler(
  async (req: CustomRequest<RegisterUserBody>, res: Response, next: Next) => {
    const { name, email, password } = req.body

    // Validating email and password
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please Include all fields')
    }

    // Find id user already registered
    const userExists = await User.findOne({
      where: {
        email: email,
      },
    })

    if (userExists) {
      res.status(400)
      throw new Error('User already Registered')
    }

    // Hash password
    const salt: string = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    // console.log(user.getDataValue('name'))
    if (user) {
      res.status(201).json({
        _id: user.getDataValue('id'),
        name: user.getDataValue('name'),
        email: user.getDataValue('email'),
        token: generateToken(user.getDataValue('id')),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
)

// // @description login a new user
// // @route /api/users/login
// // @access public
// const loginUser = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body

//   const user = await User.findOne({ email })

//   // Check user and passwords match
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//       isAdmin: user.isAdmin,
//     })
//   } else {
//     res.status(401)
//     throw new Error('Invalid credentials')
//   }
// })

// // @desc    Get current user
// // @route   /api/users/me
// // @access  Private
// const getMe = asyncHandler(async (req, res) => {
//   const user = {
//     id: req.user._id,
//     email: req.user.email,
//     name: req.user.name,
//   }
//   res.status(200).json(user)
// })

module.exports = {
  registerUser,
  // loginUser,
  // getMe,
}
