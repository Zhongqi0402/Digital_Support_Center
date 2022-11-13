const getTickets = () => {
  const API = 'localhost:50000/api/admin/tickets'
  const requestType = 'GET'
  const routeType = 'PRIVATE'
  const functionality = 'get all open tickets for an admin user'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3OTY1MDM4LCJleHAiOjE2NzA1NTcwMzh9.btjqCVYX6svEbJdo-W-iud2MyzkksNYTqhPE9s4dJgs',
  }

  const exampleResponse = [
    {
      createdAt: '2022-11-09T19:51:18.000Z',
      status: 'open',
      user: {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password:
          '$2a$10$fWMlvZgCSPmtAjCC1bVi0evtwvGqh0iZu4h3ctgMhTVgodVvcRbZO',
        isAdmin: true,
        createdAt: '2022-11-09T19:51:18.000Z',
        updatedAt: '2022-11-09T19:51:18.000Z',
      },
      product: {
        id: 2,
        manufacturer: 'apple',
        type: 'phone',
        colour: 'silver',
        createdAt: '2022-11-09T19:51:18.000Z',
        updatedAt: '2022-11-09T19:51:18.000Z',
      },
    },
    {
      createdAt: '2022-11-09T19:51:18.000Z',
      status: 'open',
      user: {
        id: 3,
        name: 'Andrew Zang',
        email: 'x5zang@uwaterloo.ca',
        password:
          '$2a$10$fWMlvZgCSPmtAjCC1bVi0e7c/TsnbHWXR9i4a.qCAvygMxQiJe07e',
        isAdmin: true,
        createdAt: '2022-11-09T19:51:18.000Z',
        updatedAt: '2022-11-09T19:51:18.000Z',
      },
      product: {
        id: 1,
        manufacturer: 'apple',
        type: 'phone',
        colour: 'black',
        createdAt: '2022-11-09T19:51:18.000Z',
        updatedAt: '2022-11-09T19:51:18.000Z',
      },
    },
  ]
  const ResponseStatusCode = {
    Error: 401,
    Success: 200,
  }
}

const getTicket = () => {
  const API = 'localhost:50000/api/admin/ticket/:id'
  const requestType = 'GET'
  const routeType = 'PRIVATE'
  const functionality = 'get one open tickets for an admin user by ticket ID'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3OTY1MDM4LCJleHAiOjE2NzA1NTcwMzh9.btjqCVYX6svEbJdo-W-iud2MyzkksNYTqhPE9s4dJgs',
  }

  const exampleResponse = {
    id: 2,
    createdAt: '2022-11-09T19:51:18.000Z',
    status: 'closed',
    description: 'no signal',
    user: {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '$2a$10$fWMlvZgCSPmtAjCC1bVi0evtwvGqh0iZu4h3ctgMhTVgodVvcRbZO',
      isAdmin: true,
      createdAt: '2022-11-09T19:51:18.000Z',
      updatedAt: '2022-11-09T19:51:18.000Z',
    },
    product: {
      id: 3,
      manufacturer: 'apple',
      type: 'laptop',
      colour: 'golden',
      createdAt: '2022-11-09T19:51:18.000Z',
      updatedAt: '2022-11-09T19:51:18.000Z',
    },
  }
  const ResponseStatusCode = {
    Error: 401,
    Success: 200,
  }
}
