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
// ------------------------------------------------------------------------
// @description register a new user
// @route /api/users
// @access public
const registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Validating email and password
    console.log(name, email, password);
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please Include all fields');
    }
    // Find id user already registered
    // const userExists = await User.findOne({ email })
    // if (userExists) {
    //   res.status(400)
    //   throw new Error('User already exists')
    // }
    // Hash password
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)
    // Create user
    // const user = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // })
    // if (user) {
    //   res.status(201).json({
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     token: generateToken(user._id),
    //   })
    // } else {
    //   res.status(400)
    //   throw new error('Invalid user data')
    // }
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
