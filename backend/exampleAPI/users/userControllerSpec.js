const registerUser = () => {
  const API = 'localhost:50000/api/users'
  const requestType = 'POST'
  const routeType = 'PUBLIC'
  const functionality = 'Register A User'
  const exampleRequest = {
    body: {
      name: 'Andrew',
      email: '12333@soft.com',
      password: 'and',
    },
  }

  const exampleResponse = {
    _id: 6,
    name: 'Andrew',
    email: '12333@soft.com',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjY4MDQ3MDkwLCJleHAiOjE2NzA2MzkwOTB9.tAIV85QVheN2PRRC9IYBBsSixoMSDx8nMqcRQsAAES4',
  }

  const ResponseStatusCode = {
    Error: 400,
    Success: 201,
  }
}

const loginUser = () => {
  const API = 'localhost:50000/api/users/login'
  const requestType = 'POST'
  const routeType = 'PUBLIC'
  const functionality = 'Log in A User'
  const exampleRequest = {
    body: {
      email: 'x5zang@uwaterloo.ca',
      password: 'and',
    },
  }

  const exampleResponse = {
    _id: 3,
    name: 'Andrew Zang',
    email: 'x5zang@uwaterloo.ca',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY4MDQ3MjU2LCJleHAiOjE2NzA2MzkyNTZ9.K8IUdpZK-zlhVWSloW1QYBoYnPoo7jwpkfi4q-mU_WI',
    isAdmin: true,
  }
  const ResponseStatusCode = {
    Error: 401,
    Success: 200,
  }
}

const getCurrentUser = () => {
  const API = 'localhost:50000/api/users/me'
  const requestType = 'GET'
  const routeType = 'PRIVATE'
  const functionality = 'Get Current User Info using Bearer Token'
  const exampleRequest = {
    Bearer_Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY3OTU4ODY2LCJleHAiOjE2NzA1NTA4NjZ9.JaT0T1bUvTvAGq0hLKICxlmAs7Kd45Ph7xTk_5g_Hkw',
  }

  const exampleResponse = {
    _id: 1,
    email: 'johndoe@gmail.com',
    name: 'John Doe',
  }
  const ResponseStatusCode = {
    Error: 401,
    Success: 200,
  }
}
