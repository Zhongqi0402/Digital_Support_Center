"use strict";
// haven't finished yet
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize")); // types
const database_1 = __importDefault(require("../../database")); // connections
const Note = database_1.default.define('note', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ticketID: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    text: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    isStaff: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: false,
    },
});
exports.default = Note;
