import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import './payment.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/productcontex';

const Buy = () => {
    const { isAuthenticated } = useAuth0();
    const [show, setShow] = useState(false)

    const GlobalState = useContext(CartContext);
    const { dispatch } = GlobalState;

    // define state to keep track of form values and whether they're filled
    const [formValues, setFormValues] = useState({
        pincode: '',
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [formFilled, setFormFilled] = useState(false);

    // define functions to update state and check whether form is filled
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleFormValuesChange = () => {
        const formFields = Object.values(formValues);
        const allFieldsFilled = formFields.every((field) => field !== '');
        setFormFilled(allFieldsFilled);
    }

    // define function to show alert and clear form data when order button is clicked
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formFilled) {
            Msg();
            setShow(true)
            dispatch({ type: 'CLEAR' });
            handleOrderPlacement();
        } else {
            toast.error("Please fill data first", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
        }
    }

    // define function to clear form data
    const handleOrderPlacement = () => {
        setFormValues({
            pincode: '',
            name: '',
            email: '',
            phone: '',
            address: ''
        });
        setFormFilled(false);
    }
    const Msg = () => {
        return (
            <>
                <div className="model-wrapper"></div>
                <div className="model">
                    <img className='zoom-in-out-box' src="/404-tick.png" alt="tick" width={100} />
                    <div>
                        <h1>Awesome!</h1>
                        <h5>Your order has been Confirmed.</h5>
                    </div>
                    <NavLink to='/'>
                        <button className='btn' onClick={() => setShow(false)}>OK</button>
                    </NavLink>
                </div>
            </>
        )
    }

    return (
        <div className="container">
            {
                isAuthenticated ? (
                    <Box className='form'>
                        <TextField variant='standard' name='name' type="text" label='Enter Name . . '
                            value={formValues.name} onChange={handleInputChange} onBlur={handleFormValuesChange}
                        />
                        <TextField variant='standard' name='email' type="email" label='Enter Email . .'
                            value={formValues.email} onChange={handleInputChange} onBlur={handleFormValuesChange}
                        />
                        <TextField variant='standard' name='phone' type="number" label='Enter Phone Number . . '
                            value={formValues.phone} onChange={handleInputChange} onBlur={handleFormValuesChange}
                        />
                        <TextField variant='standard' name='pincode' type="number" label='Enter Pincode . .'
                            value={formValues.pincode} onChange={handleInputChange} onBlur={handleFormValuesChange}
                        />
                        <TextField placeholder="Enter Address . ." multiline rows={4} name='address'
                            value={formValues.address} onChange={handleInputChange} onBlur={handleFormValuesChange}
                        />
                        <Button variant="contained" onClick={handleSubmit}>Order Now</Button>
                        {show && <Msg />}
                    </Box>
                ) : (
                    (function tost() {
                        toast.error("Please Login First", {
                            position: "top-right",
                            autoClose: 2000,
                            theme: "light",
                        })
                    })()

                )
            }
            <ToastContainer />
        </div>
    )
}

export default Buy