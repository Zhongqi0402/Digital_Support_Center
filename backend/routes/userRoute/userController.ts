import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './UserModel'

// type definition:
// ------------------------------------------------------------------------
type Next = () => void | Promise<void>

interface RegisterUserBody {
  name: string | null
  email: string | null
  password: string | null
}

interface LoginUserBody {
  email: string
  password: string
}

interface CustomRequest<T> extends Request {
  body: T
}

interface RequestUser {
  _id: number
  email: string
  name: string
}

interface CurrentUserRequest extends Request {
  user?: RequestUser
}
// ------------------------------------------------------------------------

// Generate token
const generateToken = (id: string) => {
  return jwt.sign({ id }, /*process.env.JWT_SECRET*/ '20', { expiresIn: '30d' })
}

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

// @description login a new user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(
  async (req: CustomRequest<LoginUserBody>, res: Response, next: Next) => {
    const { email, password } = req.body

    const user = await User.findOne({
      where: {
        email: email,
      },
    })

    // Check user and passwords match
    if (
      user &&
      (await bcrypt.compare(password, user.getDataValue('password')))
    ) {
      res.status(200).json({
        _id: user.getDataValue('id'),
        name: user.getDataValue('name'),
        email: user.getDataValue('email'),
        token: generateToken(user.getDataValue('id')),
        isAdmin: user.getDataValue('isAdmin'),
      })
    } else {
      res.status(401)
      throw new Error('Invalid credentials')
    }
  }
)

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getCurrentUser = asyncHandler(
  async (req: CurrentUserRequest, res: Response) => {
    const user = {
      id: req.user ? req.user._id : null,
      email: req.user ? req.user.email : null,
      name: req.user ? req.user.name : null,
    }
    res.status(200).json(user)
  }
)

export { registerUser, loginUser, getCurrentUser }
