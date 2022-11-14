import React, { FC } from 'react';
import { AiOutlineTeam } from "react-icons/ai";
import { BiUserCheck } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import { CgPlayForwards } from "react-icons/cg";


const Header: FC<any> = () => {
    const { user } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()
    const dispatch: any = useDispatch()
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <>
            <header className='header'>
                <div className='logo'>
                    <Link to='/'>Help Center</Link>
                </div>
                <ul>
                    {user ? (
                            <li>
                                <button className='btn' onClick={onLogout}>
                                    <CgPlayForwards /> Logout
                                </button>
                            </li>
                            ) : (
                            <>
                                <li>
                                    <Link to='/login'>
                                    <AiOutlineTeam /> Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/register'>
                                    <BiUserCheck /> Register
                                    </Link>
                                </li>
                                
                            </>
                    )}
            
                </ul>
            </header>
        
        </>
    );
};

export default Header;