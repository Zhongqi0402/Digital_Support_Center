import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineTeam } from "react-icons/ai";
import { SlUserFollowing } from "react-icons/sl";
import { useState, useEffect } from 'react'
import { register, reset} from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  

  const { name, email, password, password2 } = formData
  const dispatch: any = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e: any) => {
    e.preventDefault()
    
    if (password !== password2) {
        toast.error('Passwords do not match')
    } 
    else if (email === '') {
      toast.error('email can not be empty')
    }
    else if (password === '' || password.length <= 2) {
      toast.error('password can not be empty and must be longer than 2')
    }
    else {
        const userData = {
            name,
            email,
            password
        }
        
        dispatch(register(userData))
    }
  }

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  )
  
  useEffect(() => {
    if (isError) {
      toast.error("User email already exists")
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  return (
    <>
            <section className='heading'>
                <h1>
                    <SlUserFollowing /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            onChange={onChange}
                            placeholder='Enter your name'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Enter password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            onChange={onChange}
                            placeholder='Confirm password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>

        </>
  );
};
export default Register;