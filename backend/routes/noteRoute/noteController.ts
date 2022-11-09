import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import User from '../userRoute/UserModel'
import Note from './NoteModel'
import Ticket from '../ticketRoute/TicketModel'

const io = require('../socket')

// type definition:
// ------------------------------------------------------------------------
type Next = () => void | Promise<void>

interface RequestUser {
  _id: number
  email: string
  name: string
  // isAdmin?: boolean
}

interface CurrentUserRequest extends Request {
  user?: RequestUser
}
// ------------------------------------------------------------------------

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(
  async (req: CurrentUserRequest, res: Response) => {
    // Get user using the id in the JWT
    if (!req.user || !req.user._id) throw new Error('User not authorized')
    const user = await User.findByPk(req.user._id)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    const ticket = await Ticket.findByPk(req.params.ticketId)
    // console.log( user.isAdmin );
    if (
      ticket?.getDataValue('userID').toString() === req.user._id ||
      user.getDataValue('isAdmin')
    ) {
      const notes = await Note.findAll({
        where: {
          ticket: req.params.ticketId,
        },
        // attributes: ['id', '']
      })
      // .populate('user', 'name')
      res.status(200).json(notes)
    } else {
      res.status(401)
      throw new Error('User not authorized')
    }
  }
)

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findByPk(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findByPk(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id && !user.isAdmin) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: user.isAdmin,
    ticket: req.params.ticketId,
    user: req.user.id,
  })
  const newNote = note
  newNote.user = user
  io.getIO().emit('posts', { action: 'add-note', data: newNote })
  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}
