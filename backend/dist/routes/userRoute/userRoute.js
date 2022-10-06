"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersRouter = express_1.default.Router();
const { registerUser, loginUser, getMe } = require('./userController');
// const { protect } = require('../middleware/authMiddleware')
// dummy request
UsersRouter.get('/', (req, res) => {
    res.send('hello world');
});
UsersRouter.post('/', registerUser);
// UsersRouter.post('/login', loginUser)
// UsersRouter.get('/me', protect, getMe)
module.exports = UsersRouter;
