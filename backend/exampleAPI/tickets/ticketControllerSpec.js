const getTickets = () => {
  const API = 'localhost:50000/api/tickets'
  const requestType = 'GET'
  const routeType = 'PRIVATE'
  const functionality = 'Get all tickets for a specific User'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3OTU4ODY2LCJleHAiOjE2NzA1NTA4NjZ9.JaT0T1bUvTvAGq0hLKICxlmAs7Kd45Ph7xTk_5g_Hkw',
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
  ]
  const ResponseStatusCode = {
    Error: 401,
    Success: 200,
  }
}

const createTicket = () => {
  const API = 'localhost:50000/api/tickets'
  const requestType = 'POST'
  const routeType = 'PRIVATE'
  const functionality = 'Create a new Ticket for a non-admin User'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY4MDQ4MTU2LCJleHAiOjE2NzA2NDAxNTZ9.fWn-g7hcbyN4ZK3vHaOQe1w2TkB3Qxo-vo7HNpTtk_Y',
    body: {
      description: 'this is a testing description',
      product: {
        id: 2,
        manufacturer: 'apple',
        type: 'phone',
        colour: 'silver',
      },
      userID: '2',
      status: 'open',
    },
  }

  const exampleResponse = {
    id: 346,
    createdAt: '2022-11-10T02:43:18.000Z',
    status: 'open',
    description: 'this is a testing description',
    user: {
      id: 2,
      name: 'Jane Doe',
      email: 'jamedoe@gmail.com',
      password: '$2a$10$fWMlvZgCSPmtAjCC1bVi0eZXknzi.K2WLlNbOlCqNE0Z3BlzxKtbi',
      isAdmin: false,
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
  }
  const ResponseStatusCode = {
    Error: '401 or 400',
    Success: 200,
  }
}

const getTicket = () => {
  const API = 'localhost:50000/api/tickets/:id'
  const requestType = 'GET'
  const routeType = 'PRIVATE'
  const functionality = 'get a ticket by its ID'
  const exampleURL = 'localhost:50000/api/tickets/346'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY4MDQ4MTU2LCJleHAiOjE2NzA2NDAxNTZ9.fWn-g7hcbyN4ZK3vHaOQe1w2TkB3Qxo-vo7HNpTtk_Y',
  }

  const exampleResponse = {
    id: 346,
    createdAt: '2022-11-10T02:43:18.000Z',
    userID: 2,
    status: 'open',
    description: 'this is a testing description',
    user: {
      id: 2,
      name: 'Jane Doe',
      email: 'jamedoe@gmail.com',
      password: '$2a$10$fWMlvZgCSPmtAjCC1bVi0eZXknzi.K2WLlNbOlCqNE0Z3BlzxKtbi',
      isAdmin: false,
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
  }
  const ResponseStatusCode = {
    Error: '401 or 404',
    Success: 200,
  }
}

const updateTicket = () => {
  const API = 'localhost:50000/api/tickets/:id'
  const requestType = 'PUT'
  const routeType = 'PRIVATE'
  const functionality = 'update a ticket by its ID'
  const exampleURL = 'localhost:50000/api/tickets/346'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY4MDQ4MTU2LCJleHAiOjE2NzA2NDAxNTZ9.fWn-g7hcbyN4ZK3vHaOQe1w2TkB3Qxo-vo7HNpTtk_Y',
    Body: {
      description: 'this is a testing description',
      status: 'closed',
    },
  }

  const exampleResponse = {
    id: 346,
    userID: 2,
    productID: 2,
    description: 'this is a testing description',
    status: 'closed',
    createdAt: '2022-11-10T02:43:18.000Z',
    updatedAt: '2022-11-10T02:48:58.249Z',
  }
  const ResponseStatusCode = {
    Error: '401 or 404',
    Success: 200,
  }
}

const deleteTicket = () => {
  const API = 'localhost:50000/api/tickets/:id'
  const requestType = 'DELETE'
  const routeType = 'PRIVATE'
  const functionality = 'delete a ticket by its ID'
  const exampleURL = 'localhost:50000/api/tickets/346'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY4MDQ4MTU2LCJleHAiOjE2NzA2NDAxNTZ9.fWn-g7hcbyN4ZK3vHaOQe1w2TkB3Qxo-vo7HNpTtk_Y',
  }

  const exampleResponse = {
    success: true,
  }
  const ResponseStatusCode = {
    Error: '401 or 404',
    Success: 200,
  }
}
