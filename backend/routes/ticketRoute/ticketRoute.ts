import express from 'express'
const router = express.Router()
import {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} from './ticketController'

import protect from '../../middleware/authMiddleware'

// Re-route into note router
// const noteRouter = require('./noteRoutes')
// router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTicket)

router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)

module.exports = router
