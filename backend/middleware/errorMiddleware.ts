import { Request, Response } from 'express'
type Next = () => void | Promise<void>

const errorHandler = (err: Error, req: Request, res: Response, next: Next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { errorHandler }
