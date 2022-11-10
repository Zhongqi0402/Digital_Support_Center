import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

import User from '../userRoute/UserModel'
import Product from './ProductModel'
import Ticket from './TicketModel'

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
// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(
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

    const tickets = await Ticket.findAll({
      where: {
        status: 'open',
        userID: userID,
      },
      include: [User, Product],
      attributes: ['createdAt', 'Product.type', 'status', 'User.name'],
      order: [['createdAt', 'DESC']],
    })

    res.status(200).json(tickets)
  }
)

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(
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

    const ticket = await Ticket.findByPk(req.params.id, {
      include: [User, Product],
      attributes: [
        'id',
        'createdAt',
        'User.name',
        'userID',
        'status',
        'Product.type',
        'description',
      ],
    })

    if (!ticket) {
      res.status(404)
      throw new Error('Ticket not found')
    }

    if (parseInt(ticket.getDataValue('userID')) !== userID) {
      console.log(ticket.getDataValue('userID'))
      console.log(userID)
      res.status(401)
      throw new Error('Not Authorized')
    }

    res.status(200).json(ticket)
  }
)

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(
  async (req: CurrentUserRequest, res: Response) => {
    const { product, description } = req.body

    const productID = product.id

    if (!product || !description) {
      res.status(400)
      throw new Error('Please add a product and description')
    }

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

    if (user.getDataValue('isAdmin') === true) {
      res.status(400)
      throw new Error('Admin User cannot create ticket')
    }

    const ticket = await Ticket.create({
      productID,
      description,
      userID,
      status: 'open',
    })

    const justCreatedTicket = await Ticket.findByPk(ticket.getDataValue('id'), {
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

    res.status(201).json(justCreatedTicket)
  }
)

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(
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

    const ticket = await Ticket.findByPk(req.params.id)

    if (!ticket) {
      res.status(404)
      throw new Error('Ticket not found')
    }

    if (ticket.getDataValue('userID') !== userID) {
      res.status(401)
      throw new Error('Not Authorized')
    }

    await ticket.destroy()

    res.status(200).json({ success: true })
  }
)

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(
  async (req: CurrentUserRequest, res: Response) => {
    // Get user using the id in the JWT
    const userID = req.user ? req.user._id : 0
    const user = await User.findByPk(userID)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    const updatedDescription = req.body.description
    const updatedStatus = req.body.status
    if (
      updatedStatus !== 'open' &&
      updatedStatus !== 'closed' &&
      updatedStatus !== 'archived'
    ) {
      res.status(401)
      throw new Error('Updated Status is not one of open, closed or archived')
    }

    Ticket.findByPk(req.params.id)
      .then((ticket) => {
        if (!ticket) {
          res.status(404)
          throw new Error('Ticket not found')
        }

        if (ticket.getDataValue('userID') !== userID) {
          res.status(401)
          throw new Error('Not Authorized')
        }
        return ticket.update({
          description: updatedDescription,
          status: updatedStatus,
        })
      })
      .then((result) => {
        console.log('UPDATED TICKETS')
        res.status(200).json(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
)

export { getTickets, getTicket, createTicket, deleteTicket, updateTicket }
