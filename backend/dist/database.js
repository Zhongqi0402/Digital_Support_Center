"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const connection = await mysql.createConnection({ "34.136.221.76", port, user, password });
// pool, but managed by sequelize library
const sequelize = new sequelize_1.Sequelize(`${process.env.DB_NAME}`, 'Andrew', '', {
    host: `${process.env.HOST}`,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.default = sequelize;
