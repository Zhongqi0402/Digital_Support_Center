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
exports.addNote = exports.getNotes = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModel_1 = __importDefault(require("../userRoute/UserModel"));
const NoteModel_1 = __importDefault(require("./NoteModel"));
const TicketModel_1 = __importDefault(require("../ticketRoute/TicketModel"));
const io = require('../../socket');
// ------------------------------------------------------------------------
// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
exports.getNotes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user using the id in the JWT
    if (!req.user || !req.user._id)
        throw new Error('User not authorized');
    const user = yield UserModel_1.default.findByPk(req.user._id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const ticket = yield TicketModel_1.default.findByPk(req.params.ticketId);
    // console.log( user.isAdmin );
    if ((ticket && parseInt(ticket.getDataValue('userID')) === req.user._id) ||
        user.getDataValue('isAdmin')) {
        const notes = yield NoteModel_1.default.findAll({
            where: {
                ticketID: req.params.ticketId,
            },
            order: [['createdAt', 'ASC']],
        });
        res.status(200).json(notes);
    }
    else {
        res.status(401);
        throw new Error('User not authorized');
    }
}));
// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
exports.addNote = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user using the id in the JWT
    if (!req.user || !req.user._id)
        throw new Error('User not authorized');
    const user = yield UserModel_1.default.findByPk(req.user._id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    const ticket = yield TicketModel_1.default.findByPk(req.params.ticketId);
    if (!ticket ||
        (parseInt(ticket.getDataValue('userID')) !== req.user._id &&
            !user.getDataValue('isAdmin'))) {
        res.status(401);
        throw new Error('User not authorized');
    }
    const note = yield NoteModel_1.default.create({
        text: req.body.text,
        isStaff: user.getDataValue('isAdmin'),
        ticketID: req.params.ticketId,
    });
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
    };
    io.getIO().emit('posts', { action: 'add-note', data: newNote });
    res.status(200).json(note);
}));
module.exports = {
    getNotes: exports.getNotes,
    addNote: exports.addNote,
};
