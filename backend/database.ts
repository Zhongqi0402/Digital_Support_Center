import { Sequelize } from 'sequelize'

// pool, but managed by sequelize library
const sequelize: Sequelize = new Sequelize(
  '348-project',
  'root',
  'Yzq010402,.,.',
  {
    dialect: 'mysql',
    host: 'localhost',
  }
)

export default sequelize
