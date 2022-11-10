import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import User from '../userRoute/UserModel'
import Note from './NoteModel'
import Ticket from '../ticketRoute/TicketModel'

const io = require('../../socket')

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
export const getNotes = asyncHandler(
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
      (ticket && parseInt(ticket.getDataValue('userID')) === req.user._id) ||
      user.getDataValue('isAdmin')
    ) {
      const notes = await Note.findAll({
        where: {
          ticketID: req.params.ticketId,
        },
      })
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
export const addNote = asyncHandler(
  async (req: CurrentUserRequest, res: Response) => {
    // Get user using the id in the JWT
    if (!req.user || !req.user._id) throw new Error('User not authorized')
    const user = await User.findByPk(req.user._id)

    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    const ticket = await Ticket.findByPk(req.params.ticketId)

    if (
      !ticket ||
      (parseInt(ticket.getDataValue('userID')) !== req.user._id &&
        !user.getDataValue('isAdmin'))
    ) {
      res.status(401)
      throw new Error('User not authorized')
    }

    const note = await Note.create({
      text: req.body.text,
      isStaff: user.getDataValue('isAdmin'),
      ticketID: req.params.ticketId,
    })
    const newNote = {
      text: note.getDataValue('text'),
      isStaff: note.getDataValue('isStaff'),
      ticketID: note.getDataValue('ticketID'),
      user: {
        id: user.getDataValue('id'),
        name: user.getDataValue('name'),
        email: user.getDataValue('email'),
        isAdmin: user.getDataValue('isAdmin'),
      },
    }
    io.getIO().emit('posts', { action: 'add-note', data: newNote })
    res.status(200).json(note)
  }
)

module.exports = {
  getNotes,
  addNote,
}
