import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

// -------------------------------------------------------------------------
// code below are for reference
// const {errorHandler} = require("./middleware/errorMiddleware")
// const PORT = process.env.PORT || 8000
// const connectDB = require('./config/db')
// const path = require('path')
// // connect to database
// connectDB()

// Routes
// app.use('/api/users', require('./routes/userRoutes'))
// app.use('/api/tickets', require('./routes/ticketRoutes'))
// app.use('/api/admin', require('./routes/adminRoutes'))

// Serve Frontend
// if (process.env.NODE_ENV === 'production') {
//   // Set build folder as static
//   app.use(express.static(path.join(__dirname, '../frontend/build')))

//   // FIX: below code fixes app crashing on refresh in deployment
//   app.get('*', (_, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
//   })
// } else {
//   app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Welcome to the Support Desk API' })
//   })
// }

// app.use(errorHandler)
// const server = app.listen(PORT, () => {
//   console.log(`started on ${PORT}`)
// })
// const io = require('./socket').init(server)
// io.on('connection', (socket) => {
//   console.log('Client connected')
// })
