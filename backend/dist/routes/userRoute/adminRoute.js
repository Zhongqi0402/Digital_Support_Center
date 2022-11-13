"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("./adminController");
const router = express_1.default.Router();
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
//    /api/admin/tickets
router.get('/tickets', authMiddleware_1.default, adminController_1.getAllTickets);
//    /api/admin/ticket/:id
router.get('/ticket/:id', authMiddleware_1.default, adminController_1.getTicket);
module.exports = router;
