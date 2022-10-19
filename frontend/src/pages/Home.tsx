import React, { FC } from 'react';
import { VscThreeBars, VscWand } from "react-icons/vsc";
import { Link } from 'react-router-dom'

const Home: FC<any> = () => {
  return (
    <>
        <section className='heading'>
            <h1>Please choose from options below</h1>
            <p>How can we help you?</p>

        </section>
        <Link to='/' className='btn btn-reverse btn-block'>
            <VscWand /> Create New Ticket

        </Link>

        <Link to='/' className='btn btn-reverse btn-block'>
            <VscThreeBars /> View Tickets

        </Link>
    
    </>
  );
};

export default Home;