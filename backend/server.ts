import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

import sequelize from './database'
import User from './routes/userRoute/UserModel'
import Product from './routes/ticketRoute/ProductModel'
import Ticket from './routes/ticketRoute/TicketModel'
import Note from './routes/noteRoute/NoteModel'

dotenv.config()

const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const port = 50000

// routes
// Dummy request
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})
app.use('/api/users', require('./routes/userRoute/userRoute'))
app.use('/api/tickets', require('./routes/ticketRoute/ticketRoute'))
app.use('/api/admin', require('./routes/userRoute/adminRoute'))

// ----------------------------------------------
// preprocess csv files

const runDB = async () => {
  try {
    await sequelize.sync()
    const isInit = (await User.findByPk(1)) ? true : false
    if (!isInit) {
      // users.csv
      const csvFilePath = path.resolve(__dirname, '..', 'users.csv')
      const headers = ['id', 'name', 'email', 'password', 'isAdmin']
      const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' })
      let userData = parse(fileContent, {
        delimiter: ',',
        columns: headers,
      })
      const salt: string = await bcrypt.genSalt(10)

      userData = await Promise.all(
        userData.map(async (row: any) => {
          const hashedPassword = await bcrypt.hash(row.password, salt)
          return {
            ...row,
            id: parseInt(row.id),
            isAdmin: Boolean(row.isAdmin == 1),
            password: hashedPassword,
          }
        })
      )
      // console.log(userData)
      await User.bulkCreate(userData)

      // products.csv
      const productFilePath = path.resolve(__dirname, '..', 'products.csv')
      const productHeaders = ['id', 'manufacturer', 'type', 'colour']
      const productContent = fs.readFileSync(productFilePath, {
        encoding: 'utf-8',
      })
      let productData = parse(productContent, {
        delimiter: ',',
        columns: productHeaders,
      })
      productData = productData.map((row: any) => {
        return { ...row, id: parseInt(row.id) }
      })
      // console.log(productData)
      await Product.bulkCreate(productData)

      // tickets.csv
      const ticketsFilePath = path.resolve(__dirname, '..', 'tickets.csv')
      const ticketsHeaders = [
        'id',
        'userID',
        'productID',
        'description',
        'status',
      ]
      const ticketsContent = fs.readFileSync(ticketsFilePath, {
        encoding: 'utf-8',
      })
      let ticketsData = parse(ticketsContent, {
        delimiter: ',',
        columns: ticketsHeaders,
      })
      ticketsData = ticketsData.map((row: any) => {
        return {
          ...row,
          id: parseInt(row.id),
          userID: parseInt(row.userID),
          productID: parseInt(row.productID),
        }
      })
      // console.log(ticketsData)
      await Ticket.bulkCreate(ticketsData)

      const notesFilePath = path.resolve(__dirname, '..', 'notes.csv')
      const notesHeaders = ['id', 'ticketID', 'text', 'isStaff']
      const notesContent = fs.readFileSync(notesFilePath, {
        encoding: 'utf-8',
      })
      let notesData = parse(notesContent, {
        delimiter: ',',
        columns: notesHeaders,
      })
      notesData = notesData.map((row: any) => {
        return {
          ...row,
          id: parseInt(row.id),
          ticketID: parseInt(row.ticketID),
          isStaff: Boolean(row.isStaff == 1),
        }
      })
      await Note.bulkCreate(notesData)
    }
    User.hasMany(Ticket, { foreignKey: 'userID' })
    Ticket.belongsTo(User, { foreignKey: 'userID' })

    Product.hasMany(Ticket, { foreignKey: 'productID' })
    Ticket.belongsTo(Product, { foreignKey: 'productID' })

    Ticket.hasMany(Note, { foreignKey: 'ticketID' })
    Note.belongsTo(Ticket, { foreignKey: 'ticketID' })
    const server = app.listen(port)
    const io = require('./socket').init(server)
    io.on('connection', () => {
      console.log('Client connected')
    })
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  } catch (error) {
    console.log(error)
  }
}
runDB()
