// haven't finished yet

import Sequelize from 'sequelize' // types
import sequelize from '../../database' // connections

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  manufacturer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  colour: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

export default Product
