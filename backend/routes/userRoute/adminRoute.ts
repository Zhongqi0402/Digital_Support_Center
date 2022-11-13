import express from 'express'
import { getAllTickets, getTicket } from './adminController'

const router = express.Router()

import protect from '../../middleware/authMiddleware'

//    /api/admin/tickets
router.get('/tickets', protect, getAllTickets)

//    /api/admin/ticket/:id
router.get('/ticket/:id', protect, getTicket)

module.exports = router
