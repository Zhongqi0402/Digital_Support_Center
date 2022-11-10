const getNotes = () => {
  const API = 'localhost:50000/api/tickets/:id/notes'
  const requestType = 'GET'
  const routeType = 'PRIVATE'
  const functionality = 'Get All notes by a ticket ID'
  const exampleURL = 'localhost:50000/api/tickets/4/notes'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY4MDQ2NDY5LCJleHAiOjE2NzA2Mzg0Njl9.V0N9cwm7w0OhDPdGMkLfvubEIVCfHutRYkDzRoeSMcE',
  }

  const exampleResponse = [
    {
      id: 2,
      ticketID: 4,
      text: 'No, it is not my responsibility',
      isStaff: false,
      createdAt: '2022-11-09T19:51:18.000Z',
      updatedAt: '2022-11-09T19:51:18.000Z',
    },
    {
      id: 4,
      ticketID: 4,
      text: 'Did the product drops in the water?',
      isStaff: true,
      createdAt: '2022-11-09T19:51:18.000Z',
      updatedAt: '2022-11-09T19:51:18.000Z',
    },
    {
      id: 5,
      ticketID: 4,
      text: 'testing text',
      isStaff: true,
      createdAt: '2022-11-10T02:16:19.000Z',
      updatedAt: '2022-11-10T02:16:19.000Z',
    },
  ]
  const ResponseStatusCode = {
    Error: 401,
    Success: 200,
  }
}

const addNote = () => {
  const API = 'localhost:50000/api/tickets/:id/notes'
  const requestType = 'POST'
  const routeType = 'PRIVATE'
  const functionality = 'CREATE a new note for a ticket ID'
  const exampleURL = 'localhost:50000/api/tickets/4/notes'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY4MDQ2NDY5LCJleHAiOjE2NzA2Mzg0Njl9.V0N9cwm7w0OhDPdGMkLfvubEIVCfHutRYkDzRoeSMcE',
    body: {
      text: 'testing text',
    },
  }

  const exampleResponse = {
    id: 6,
    text: 'testing text',
    isStaff: true,
    ticketID: '4',
    updatedAt: '2022-11-10T02:54:18.638Z',
    createdAt: '2022-11-10T02:54:18.638Z',
  }
  const ResponseStatusCode = {
    Error: 401,
    Success: 200,
  }
}
