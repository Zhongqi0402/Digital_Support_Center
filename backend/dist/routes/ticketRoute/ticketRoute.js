"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ticketController_1 = require("./ticketController");
// const { protect } = require('../middleware/authMiddleware')
// Re-route into note router
// const noteRouter = require('./noteRoutes')
// router.use('/:ticketId/notes', noteRouter)
// router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/').get(ticketController_1.getTickets).post(ticketController_1.createTicket);
router.route('/:id').get(ticketController_1.getTicket).delete(ticketController_1.deleteTicket).put(ticketController_1.updateTicket);
//   .route('/:id')
// .get(protect, getTicket)
//   .delete(protect, deleteTicket)
//   .put(protect, updateTicket)
module.exports = router;
