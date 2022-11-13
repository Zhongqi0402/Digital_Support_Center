import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticketData, token)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user tickets
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTickets(token)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// // Get user ticket
export const getTicket = createAsyncThunk(
  'tickets/get',
  async (ticketId: any, thunkAPI: any) => {
    try {
      console.log(ticketId)
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTicket(ticketId, token)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// // Close ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// // Get all user tickets
export const getAllTickets = createAsyncThunk(
  '/admin/tickets',
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getAllTickets( token )
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// export const adminGetTicket = createAsyncThunk(
//   'admin/tickets/get',
//   async (ticketId: any, thunkAPI: any) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await ticketService.adminGetTicket(ticketId, token)
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state: any) => {
        state.isLoading = true
        console.log("pending")
      })
      .addCase(createTicket.fulfilled, (state: any) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true
        console.log("reject")
        state.message = action.payload
      })
      .addCase(getTickets.pending, (state: any) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state: any, action: any) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTicket.pending, (state: any) => {
        state.isLoading = true
      })
      .addCase(getTicket.fulfilled, (state: any, action: any) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(getTicket.rejected, (state: any, action: any) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(closeTicket.fulfilled, (state: any, action: any) => {
        state.isLoading = false
        state.tickets.map((ticket: any) =>
          ticket.id === action.payload._id
            ? (ticket.status = 'closed')
            : ticket
        )
      })
    //   .addCase(getAllTickets.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(getAllTickets.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.tickets = action.payload
    //   })
    //   .addCase(getAllTickets.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //   })
    //   .addCase(adminGetTicket.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(adminGetTicket.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.ticket = action.payload
    //   })
    //   .addCase(adminGetTicket.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //   })
  },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer