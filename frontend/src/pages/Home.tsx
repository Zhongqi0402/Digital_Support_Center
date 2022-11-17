import { FC } from 'react';
import { VscThreeBars, VscWand } from "react-icons/vsc";
import { FiUserCheck } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Home: FC<any> = () => {
  const { user } = useSelector( ( state: any ) => state.auth )
  
  return (
    <>


      {!user || !user.isAdmin ? 
      <section className='heading'>
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section> :
      <h1>Move your ass and help your customers</h1>}

      {( user && !user.isAdmin ) && <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <VscThreeBars /> Create New Ticket
      </Link>
      
      }

      {( !user || !user.isAdmin ) && <Link to='/tickets' className='btn btn-block'>
        <VscWand /> View My Tickets
      </Link>}

      
      {
        (user && user.isAdmin) &&
        <Link to='/admin/tickets' className='btn btn-block'>
          <FiUserCheck /> Admin User Click here
        </Link>
      }
    
    </>
  );
};

export default Home;