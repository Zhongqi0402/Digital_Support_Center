"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicket = exports.getAllTickets = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModel_1 = __importDefault(require("./UserModel"));
const TicketModel_1 = __importDefault(require("../ticketRoute/TicketModel"));
const ProductModel_1 = __importDefault(require("../ticketRoute/ProductModel"));
// @desc    Get all user tickets where status is open
// @route   GET /api/tickets/all
// @access  Private
exports.getAllTickets = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user using the id in the JWT
    const userID = req.user ? req.user._id : 0;
    const user = yield UserModel_1.default.findOne({
        where: {
            id: userID,
        },
    });
    if (!user || !user.getDataValue('isAdmin')) {
        res.status(401);
        throw new Error('User not found');
    }
    try {
        const tickets = yield TicketModel_1.default.findAll({
            where: {
                status: 'open',
            },
            include: [UserModel_1.default, ProductModel_1.default],
            attributes: ['id', 'createdAt', 'product.type', 'status', 'user.name'],
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(tickets);
    }
    catch (error) {
        console.log(error);
    }
}));
// @desc    Get user ticket from admin
// @route   GET /api/admin/ticket/:id
// @access  Private
exports.getTicket = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user using the id in the JWT
    const userID = req.user ? req.user._id : 0;
    const user = yield UserModel_1.default.findOne({
        where: {
            id: userID,
        },
    });
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    try {
        const ticket = yield TicketModel_1.default.findByPk(req.params.id, {
            include: [UserModel_1.default, ProductModel_1.default],
            attributes: [
                'id',
                'createdAt',
                'user.name',
                'status',
                'product.type',
                'description',
            ],
        });
        if (!ticket) {
            res.status(404);
            throw new Error('Ticket not found');
        }
        res.status(200).json(ticket);
    }
    catch (error) {
        console.log(error);
    }
}));
