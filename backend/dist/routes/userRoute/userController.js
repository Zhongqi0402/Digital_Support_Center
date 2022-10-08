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
exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("./UserModel"));
// ------------------------------------------------------------------------
// Generate token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, /*process.env.JWT_SECRET*/ '20', { expiresIn: '30d' });
};
// @description register a new user
// @route /api/users
// @access public
const registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Validating email and password
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please Include all fields');
    }
    // Find id user already registered
    const userExists = yield UserModel_1.default.findOne({
        where: {
            email: email,
        },
    });
    if (userExists) {
        res.status(400);
        throw new Error('User already Registered');
    }
    // Hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    console.log(hashedPassword);
    // Create user
    const user = yield UserModel_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    // console.log(user.getDataValue('name'))
    if (user) {
        res.status(201).json({
            _id: user.getDataValue('id'),
            name: user.getDataValue('name'),
            email: user.getDataValue('email'),
            token: generateToken(user.getDataValue('id')),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
exports.registerUser = registerUser;
// @description login a new user
// @route /api/users/login
// @access public
const loginUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield UserModel_1.default.findOne({
        where: {
            email: email,
        },
    });
    // Check user and passwords match
    if (user &&
        (yield bcryptjs_1.default.compare(password, user.getDataValue('password')))) {
        res.status(200).json({
            _id: user.getDataValue('id'),
            name: user.getDataValue('name'),
            email: user.getDataValue('email'),
            token: generateToken(user.getDataValue('id')),
            isAdmin: user.getDataValue('isAdmin'),
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
}));
exports.loginUser = loginUser;
// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getCurrentUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: req.user ? req.user._id : null,
        email: req.user ? req.user.email : null,
        name: req.user ? req.user.name : null,
    };
    res.status(200).json(user);
}));
exports.getCurrentUser = getCurrentUser;
