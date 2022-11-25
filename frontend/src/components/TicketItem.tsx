import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

function TicketItem({ ticket } : any) {
  const { user } = useSelector((state: any) => state.auth)
  const [ticketClass, setTicketClass] = useState('ticket')

  useEffect(() => {
    if (user.isAdmin) {
      setTicketClass('staff-ticket')
    }
  }, [ user ])
  
  // console.log( "ticketItem: ", ticket )
  return (
    <div className={ticketClass}>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product.manufacturer}</div>
      <div>{ticket.product.type}</div>
      <div>{ticket.product.colour}</div>
      
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      { user.isAdmin && <div>{ticket.user.name}</div> }
      { !user.isAdmin ?
          <Link to={`/ticket/${ticket.id}`} className='btn btn-reverse btn-sm'>
            View
          </Link>
        : <Link to={`/admin/ticket/${ticket.id}`} className='btn btn-reverse btn-sm'>
            View Ticket
          </Link>
      }
    </div>
  )
}

export default TicketItem