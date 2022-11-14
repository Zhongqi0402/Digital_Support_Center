import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'


const NewTicket: FC<any> = () => {
    const { user } = useSelector((state: any) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state: any) => state.tickets
    )

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [manufacturer, setManufacturer] = useState('Apple')
    const [type, setType] = useState('Laptop')
    const [colour, setColour] = useState('Silver')
    const [description, setDescription] = useState('')

    const dispatch: any = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        console.log("is success", isSuccess)
        if (isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])

    const onSubmit = (e: any) => {
        e.preventDefault()
        const product = {manufacturer, 
            type: type.toLowerCase(), colour:colour.toLowerCase()}
        // console.log("submit")
        // const postData = { product, description }
        // console.log( postData )
        dispatch(createTicket({ product, description }))
    }

    return (
        <>
            <section className='heading'>
                <h1>Create New Ticket</h1>
                <p>Fill in below to get support</p>
            </section>

            <section className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>User Name</label>
                    <input type='text' className='form-control' value={name} disabled />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>User Email</label>
                    <input type='text' className='form-control' value={email} disabled />
                </div>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='product'>Manufacturer</label>
                        <select
                            name='product'
                            id='product'
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                        >
                            <option value='Apple'>Apple</option>
                            <option value='Samsung'>Samsung</option>
                            <option value='Huawei'>Huawei</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='type'>Type</label>
                        <select
                            name='type'
                            id='type'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value='Laptop'>Laptop</option>
                            <option value='Phone'>Phone</option>
                            <option value='Tablet'>Tablet</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='colour'>Colour</label>
                        <select
                            name='colour'
                            id='colour'
                            value={colour}
                            onChange={(e) => setColour(e.target.value)}
                        >
                            <option value='Silver'>Silver</option>
                            <option value='Black'>Black</option>
                            <option value='Golden'>Golden</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>



                    <div className='form-group'>
                        <label htmlFor='description'>Description of the issue</label>
                        <textarea
                        name='description'
                        id='description'
                        className='form-control'
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
};

export default NewTicket;