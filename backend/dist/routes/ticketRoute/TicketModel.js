"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize")); // types
const database_1 = __importDefault(require("../../database")); // connections
const Ticket = database_1.default.define('ticket', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userID: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    productID: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
});
exports.default = Ticket;
