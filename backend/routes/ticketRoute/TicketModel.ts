import Sequelize from 'sequelize' // types
import sequelize from '../../database' // connections

const Ticket = sequelize.define('ticket', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

export default Ticket
