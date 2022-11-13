import express from 'express'
const router = express.Router({ mergeParams: true })
import { getNotes, addNote } from './noteController'

import protect from '../../middleware/authMiddleware'

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router
