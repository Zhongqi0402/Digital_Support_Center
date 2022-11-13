import axios from 'axios'

const API_URL = '/api/tickets/'

// Get ticket notes
const getNotes = async (ticketId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + ticketId + '/notes', config)

  return response.data
}

// Get ticket notes
const updateNotes = ( newNote: any ) => {
    return newNote;
}

// Create ticket note
const createNote = async (noteText: string, ticketId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    API_URL + ticketId + '/notes',
    {
      text: noteText,
    },
    config
  )

  return response.data
}

const noteService = {
  getNotes,
  createNote,
  updateNotes
}

export default noteService