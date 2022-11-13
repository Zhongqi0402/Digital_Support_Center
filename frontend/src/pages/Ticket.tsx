import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import GoBackButton from '../components/GoBackButton'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import {
  getNotes,
  createNote,
  reset as notesReset,
  updateNotes
} from '../features/notes/noteSlice'
import NoteItem from '../components/NoteItem'
// import openSocket from 'socket.io-client';


Modal.setAppElement('#root')

function Ticket() {
  // states
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state: any) => state.tickets
  )
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state: any) => state.notes
  )
  const { user } = useSelector( ( state: any ) => state.auth )
  const params = useParams()
  const dispatch : any = useDispatch()
  const { ticketId } = useParams()
  const navigate = useNavigate()
  

//   useEffect(() => {
//     const newSocket = openSocket('/');
//     const handler = data => {
//       if (data.action === 'add-note' 
//         && (ticketId === data.data.ticket.toString()) 
//         && ( data.data.user._id.toString() !== user._id.toString() ) ) {
//         dispatch(updateNotes( data.data ))
//       } 
//     };
//     newSocket.on( 'posts', handler )
//     return () => newSocket.off( 'posts', handler )
//   }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])
  if ( Object.keys(ticket).length === 0 ){
    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
  }

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

   // Create note submit
   const onNoteSubmit = (e: any) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
    closeModal()
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)


  
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <GoBackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket.id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Manufacturer: {ticket.product.manufacturer}</h3>
        <h3>Type: {ticket.product.type}</h3>
        <h3>Colour: {ticket.product.colour}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{content: {
            width: '600px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            position: 'relative',
          },}}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note : any) => (
        <NoteItem key={note.id} note={note} />
      ))}



      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Delete Ticket
        </button>
      )}

    </div>
  )
}

export default Ticket