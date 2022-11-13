const assert = require('assert')
const axios = require('axios')
var expect = require('chai').expect
var request = require('supertest')
// const jwt = require('jsonwebtoken')

// const generateToken = (id) => {
//   return jwt.sign({ id }, /*process.env.JWT_SECRET*/ '20', { expiresIn: '30d' })
// }

describe('Dummy Test', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})

// describe('Admin Controller', function () {
//   describe('get All Tickets', function () {
//     it('should get all tickets', async function () {
//       const config = {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3OTU4ODY2LCJleHAiOjE2NzA1NTA4NjZ9.JaT0T1bUvTvAGq0hLKICxlmAs7Kd45Ph7xTk_5g_Hkw`,
//         },
//       }
//       const response = await axios.get(
//         // '/api/tickets/all',
//         // 'localhost:50000/api/tickets/all',
//         config
//       )
//       console.log(response)
//     })
//   })
// })

describe('Status and content', function () {
  describe('Main page', function () {
    it('status', async function (done) {
      // const res = await request
      //   .get('http://localhost:50000/api/tickets/all')
      //   .set(
      //     'Authorization',
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3OTU4ODY2LCJleHAiOjE2NzA1NTA4NjZ9.JaT0T1bUvTvAGq0hLKICxlmAs7Kd45Ph7xTk_5g_Hkw'
      //   )
      // console.log(res)
      // done()

      // try 2
      chai
        .request('localhost:50000')
        .get('/api/tickets/all')
        .end((res, err) => {
          if (err) console.log(err)
          console.log(res)
          return done()
        })
      done()
    })
  })
})
// })
