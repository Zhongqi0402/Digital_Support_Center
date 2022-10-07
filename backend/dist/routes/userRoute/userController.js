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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("./UserModel"));
// // Generate token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, /*process.env.JWT_SECRET*/ '20', { expiresIn: '30d' });
};
// ------------------------------------------------------------------------
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
// // @description login a new user
// // @route /api/users/login
// // @access public
// const loginUser = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body
//   const user = await User.findOne({ email })
//   // Check user and passwords match
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//       isAdmin: user.isAdmin,
//     })
//   } else {
//     res.status(401)
//     throw new Error('Invalid credentials')
//   }
// })
// // @desc    Get current user
// // @route   /api/users/me
// // @access  Private
// const getMe = asyncHandler(async (req, res) => {
//   const user = {
//     id: req.user._id,
//     email: req.user.email,
//     name: req.user.name,
//   }
//   res.status(200).json(user)
// })
module.exports = {
    registerUser,
    // loginUser,
    // getMe,
};
