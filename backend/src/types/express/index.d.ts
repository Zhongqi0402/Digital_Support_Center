// import express from 'express'

// type RequestUser = {
//   _id: number
//   email: string
//   name: string
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user?: RequestUser
//     }
//   }
// }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT: string
      JWT_SECRET: string
    }
  }
}

export {}
