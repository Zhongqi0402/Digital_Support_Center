import { Sequelize } from 'sequelize'
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// const connection = await mysql.createConnection({ "34.136.221.76", port, user, password });
// pool, but managed by sequelize library
const sequelize: Sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  'Andrew',
  '',
  {
    host: `${process.env.HOST}`,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)

export default sequelize
