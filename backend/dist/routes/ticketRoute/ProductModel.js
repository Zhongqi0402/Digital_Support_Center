"use strict";
// haven't finished yet
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize")); // types
const database_1 = __importDefault(require("../../database")); // connections
const Product = database_1.default.define('product', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    manufacturer: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    colour: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
});
exports.default = Product;
