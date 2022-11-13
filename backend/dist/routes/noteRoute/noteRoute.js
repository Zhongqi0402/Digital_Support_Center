"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
const noteController_1 = require("./noteController");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
router.route('/').get(authMiddleware_1.default, noteController_1.getNotes).post(authMiddleware_1.default, noteController_1.addNote);
module.exports = router;
