import axios from 'axios'

const API_URL = '/api/tickets/'

// Create new ticket
const createTicket = async (ticketData: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, ticketData, config)
  return response.data 
}

// update new ticket
const updateTicket = async (ticketData: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const CUR_URL = API_URL + `/${ticketData.id}`
  const sentData = {description: ticketData.description, status: ticketData.status}
  const response = await axios.put(CUR_URL, sentData, config)
  return response.data 
}

// Get user tickets
const getTickets = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// // Get user ticket
const getTicket = async (ticketId: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("call this")

  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}

// // Close ticket
const closeTicket = async (ticketId: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(
    API_URL + ticketId,
    config
  )

  return response.data
}

// // Get ALL user tickets
const getAllTickets = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get( '/api/admin/tickets', config )
  return response.data
}

const adminGetTicket = async (ticketId: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get( '/api/admin/ticket/' + ticketId, config )
  return response.data
}

const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
    getAllTickets,
    updateTicket,
    adminGetTicket
}

export default ticketService