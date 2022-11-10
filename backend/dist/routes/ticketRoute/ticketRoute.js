"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ticketController_1 = require("./ticketController");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
// Re-route into note router
const noteRouter = require('../noteRoute/noteRoute');
router.use('/:ticketId/notes', noteRouter);
router.route('/').get(authMiddleware_1.default, ticketController_1.getTickets).post(authMiddleware_1.default, ticketController_1.createTicket);
router
    .route('/:id')
    .get(authMiddleware_1.default, ticketController_1.getTicket)
    .delete(authMiddleware_1.default, ticketController_1.deleteTicket)
    .put(authMiddleware_1.default, ticketController_1.updateTicket);
module.exports = router;
