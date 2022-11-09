// haven't finished yet

import Sequelize from 'sequelize' // types
import sequelize from '../../database' // connections

const Note = sequelize.define('note', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ticketID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isStaff: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
})

export default Note
