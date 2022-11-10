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
exports.updateTicket = exports.deleteTicket = exports.createTicket = exports.getTicket = exports.getTickets = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModel_1 = __importDefault(require("../userRoute/UserModel"));
const ProductModel_1 = __importDefault(require("./ProductModel"));
const TicketModel_1 = __importDefault(require("./TicketModel"));
// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const tickets = yield TicketModel_1.default.findAll({
        where: {
            status: 'open',
            userID: userID,
        },
        include: [UserModel_1.default, ProductModel_1.default],
        attributes: ['createdAt', 'Product.type', 'status', 'User.name'],
    });
    res.status(200).json(tickets);
}));
exports.getTickets = getTickets;
// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const ticket = yield TicketModel_1.default.findByPk(req.params.id, {
        include: [UserModel_1.default, ProductModel_1.default],
        attributes: [
            'id',
            'createdAt',
            'User.name',
            'userID',
            'status',
            'Product.type',
            'description',
        ],
    });
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }
    if (parseInt(ticket.getDataValue('userID')) !== userID) {
        console.log(ticket.getDataValue('userID'));
        console.log(userID);
        res.status(401);
        throw new Error('Not Authorized');
    }
    res.status(200).json(ticket);
}));
exports.getTicket = getTicket;
// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, description } = req.body;
    const productID = product.id;
    if (!product || !description) {
        res.status(400);
        throw new Error('Please add a product and description');
    }
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
    const ticket = yield TicketModel_1.default.create({
        productID,
        description,
        userID,
        status: 'open',
    });
    const justCreatedTicket = yield TicketModel_1.default.findByPk(ticket.getDataValue('id'), {
        include: [UserModel_1.default, ProductModel_1.default],
        attributes: [
            'id',
            'createdAt',
            'User.name',
            'status',
            'Product.type',
            'description',
        ],
    });
    res.status(201).json(justCreatedTicket);
}));
exports.createTicket = createTicket;
// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const ticket = yield TicketModel_1.default.findByPk(req.params.id);
    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }
    if (ticket.getDataValue('userID') !== userID) {
        res.status(401);
        throw new Error('Not Authorized');
    }
    yield ticket.destroy();
    res.status(200).json({ success: true });
}));
exports.deleteTicket = deleteTicket;
// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user using the id in the JWT
    const userID = req.user ? req.user._id : 0;
    const user = yield UserModel_1.default.findByPk(userID);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const updatedDescription = req.body.description;
    const updatedStatus = req.body.status;
    if (updatedStatus !== 'open' &&
        updatedStatus !== 'closed' &&
        updatedStatus !== 'archived') {
        res.status(401);
        throw new Error('Updated Status is not one of open, closed or archived');
    }
    TicketModel_1.default.findByPk(req.params.id)
        .then((ticket) => {
        if (!ticket) {
            res.status(404);
            throw new Error('Ticket not found');
        }
        if (ticket.getDataValue('userID') !== userID) {
            res.status(401);
            throw new Error('Not Authorized');
        }
        return ticket.update({
            description: updatedDescription,
            status: updatedStatus,
        });
    })
        .then((result) => {
        console.log('UPDATED TICKETS');
        res.status(200).json(result);
    })
        .catch((err) => {
        console.log(err);
    });
}));
exports.updateTicket = updateTicket;
