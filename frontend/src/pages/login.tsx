import { FC } from 'react';
import { Link } from 'react-router-dom'
import { AiOutlineSend } from "react-icons/ai";
import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login: FC<any> = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    const { email, password } = formData
    const onSubmit = (e: any) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
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
          toast.error("Invalid Username and password pair!")
        }
    
        // Redirect when logged in
        if (isSuccess || user) {
          if ( user.isAdmin ) {
            navigate('/admin/tickets')
          } else {
            navigate('/')
          }
        }
    
        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    return (
        <>
        <section className='heading'>
            <h1>
            <AiOutlineSend /> Login
            </h1>
            <p>Please log in to get support</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
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
                    <button className='btn btn-block'>Let Me In!!</button>
                </div>
            </form>
        </section>
        </>
  )
};

export default Login;