import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import User from './UserModel'
import Ticket from '../ticketRoute/TicketModel'
import Product from '../ticketRoute/ProductModel'

interface RequestUser {
  _id: number
  email: string
  name: string
}

interface RequestUser {
  _id: number
  email: string
  name: string
}

interface CurrentUserRequest extends Request {
  user?: RequestUser
}

// @desc    Get all user tickets where status is open
// @route   GET /api/tickets/all
// @access  Private
export const getAllTickets = asyncHandler(
  async (req: CurrentUserRequest, res: Response) => {
    // Get user using the id in the JWT
    const userID = req.user ? req.user._id : 0
    const user = await User.findOne({
      where: {
        id: userID,
      },
    })
    if (!user || !user.getDataValue('isAdmin')) {
      res.status(401)
      throw new Error('User not found')
    }
    try {
      const tickets = await Ticket.findAll({
        where: {
          status: 'open',
        },
        include: [User, Product],
        attributes: ['createdAt', 'Product.type', 'status', 'User.name'],
      })
      res.status(200).json(tickets)
    } catch (error) {
      console.log(error)
    }
  }
)

// @desc    Get user ticket from admin
// @route   GET /api/admin/ticket/:id
// @access  Private
export const getTicket = asyncHandler(
  async (req: CurrentUserRequest, res: Response) => {
    // Get user using the id in the JWT
    const userID = req.user ? req.user._id : 0
    const user = await User.findOne({
      where: {
        id: userID,
      },
    })

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
    try {
      const ticket = await Ticket.findByPk(req.params.id, {
        include: [User, Product],
        attributes: [
          'id',
          'createdAt',
          'User.name',
          'status',
          'Product.type',
          'description',
        ],
      })

      if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
      }

      res.status(200).json(ticket)
    } catch (error) {
      console.log(error)
    }
  }
)
