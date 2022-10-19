import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineTeam } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
const Header: FC<any> = () => {
  return (
    <>
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Help Center</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'> 
                        <button className='btn'>
                                <AiOutlineTeam /> Log in                 
                        </button>
                    </Link>

                </li>
                <li>
                    <Link to='/register'> 
                        <button className='btn'>
                                <BiUserCheck /> Sign up                 
                        </button>
                    </Link>
                </li>
            </ul>
        </header>
    
    </>
  );
};

export default Header;