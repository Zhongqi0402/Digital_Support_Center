"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// pool, but managed by sequelize library
const sequelize = new sequelize_1.Sequelize('348-project', 'root', 'Uforse2020!', {
    dialect: 'mysql',
    host: 'localhost',
});
exports.default = sequelize;
