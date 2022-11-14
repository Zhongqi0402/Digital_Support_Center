import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, getAllTickets, reset } from '../features/tickets/ticketSlice'
import BackButton from '../components/GoBackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {
    const { tickets, isLoading, isSuccess } = useSelector(
      (state: any) => state.tickets
    )
    console.log(tickets)
    const [ticket_heading, setTicket_heading] = useState('ticket-headings')
    const { user } = useSelector( ( state: any ) => state.auth )
  
    const dispatch: any = useDispatch()
  
    useEffect(() => {
      return () => {
        if (isSuccess) {
          dispatch(reset())
        }
      }
    }, [dispatch, isSuccess])
  
    useEffect(() => {
      if (user) {
        if ( user.isAdmin ) {
          setTicket_heading('staff-ticket-headings')
          //dispatch(getAllTickets())
        } else {
          dispatch(getTickets())
        }
      }
    }, [dispatch, user])


    
    return (
      <>
        
        <BackButton url='/' />
        <h1>{user && user.isAdmin ? 'Staff View All' : <></>} Tickets</h1>
        <div className='tickets'>
          <div className={ticket_heading}>
            <div>Date</div>
            <div>Manufacturer</div>
            <div>Type</div>
            <div>Colour</div>
            <div>Status</div>
            {user.isAdmin && <div>Name</div>}
            <div></div>
          </div>
          {tickets.map((ticket: any) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
        </div>
        
        
      </>
    )
  }
  
export default Tickets