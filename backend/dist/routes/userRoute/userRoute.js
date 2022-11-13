"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
// const { protect } = require('../middleware/authMiddleware')
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const UsersRouter = express_1.default.Router();
// dummy request
UsersRouter.get('/', (req, res) => {
    res.send('hello world');
});
UsersRouter.post('/', userController_1.registerUser);
UsersRouter.post('/login', userController_1.loginUser);
UsersRouter.get('/me', authMiddleware_1.default, userController_1.getCurrentUser);
module.exports = UsersRouter;
