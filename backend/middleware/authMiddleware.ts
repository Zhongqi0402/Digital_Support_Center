import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../routes/userRoute/UserModel'

// type definition:
// ------------------------------------------------------------------------
type Next = () => void | Promise<void>

interface RequestUser {
  _id: number
  email: string
  name: string
}

interface CurrentUserRequest extends Request {
  user?: RequestUser
}
// ------------------------------------------------------------------------

const protect = asyncHandler(
  async (req: CurrentUserRequest, res: Response, next: Next) => {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Get user from token
        let decodedID = 0
        if (typeof decoded !== 'string') decodedID = decoded.id
        const user = await User.findByPk(decodedID)
        if (user === null) throw new Error('')
        req.user = {
          _id: user.getDataValue('id'),
          email: user.getDataValue('email'),
          name: user.getDataValue('name'),
        }

        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }
)

export default protect
