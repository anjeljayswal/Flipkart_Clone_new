import { Box, Container, TextField, Button, Typography, Card, CardContent, Grid } from "@mui/material";
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'
import { useContext } from 'react';
import { CartContext } from '../../context/productcontex';
import { NavLink } from 'react-router-dom';
import './payment.css';


const Buy = () => {
    const { isAuthenticated } = useAuth0();
    const [show, setShow] = useState(false)

    const GlobalState = useContext(CartContext);
    const { dispatch } = GlobalState;
    // define state to keep track of form values and whether they're filled
    const [formValues, setFormValues] = useState({
        Name: '',
        Address: '',
        Card_Number: '',
        CVV: '',
        phoneNo: '',
        ExpirationDate: ''
    });
    // const [formFilled, setFormFilled] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        Name: false,
        Address: false,
        cCard_Number: false,
        CVV: false,
        phoneNo: false,
        ExpirationDate: false,

    });

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
        setFieldErrors(allFieldsFilled);
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
            // pincode: '',
            name: '',
            // email: '',
            // phone: '',
            address: '',
            cardno: '',
            expYear: '',
            cardno: '',
            cvv: '',
            expMonth: '',
            phoneNo: ''
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
        <div>
            {
                isAuthenticated ? (
                    <Container maxWidth="sm">

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h4" align="center">
                                Checkout
                            </Typography>
                        </Box>

                        <Card variant="outlined" sx={{ mt: 2 }}>
                            <CardContent>
                                <Box component="form">
                                    <TextField
                                        label="Name"
                                        name="Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={formValues.Name}
                                        onChange={handleInputChange}
                                        onBlur={handleFormValuesChange}
                                        required
                                    />

                                    <TextField
                                        required
                                        label="Address"
                                        variant="outlined"
                                        name="Address"
                                        fullWidth
                                        autoComplete="off"
                                        margin="normal"
                                        value={formValues.Address}
                                        onChange={handleInputChange}
                                        onBlur={handleFormValuesChange}
                                    />
                                    <TextField
                                        label="Phone Number"
                                        variant="outlined"
                                        name="phoneNo"
                                        type="text"
                                        fullWidth
                                        margin="normal"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                        autoComplete="off"
                                        value={formValues.phoneNo}
                                        onChange={handleInputChange}
                                        onBlur={handleFormValuesChange}
                                        inputProps={{ maxLength: 10 }} // Set the maximum length to 10 characters
                                        error={formValues.phoneNo.length !== 10 && formValues.phoneNo !== ''} // Check for validation error
                                        helperText={
                                            formValues.phoneNo.length !== 10 && formValues.phoneNo !== ''
                                                ? 'Phone number must be 10 digits'
                                                : ''
                                        }
                                        required
                                    />

                                    <TextField
                                        label="Credit Card Number"
                                        variant="outlined"
                                        fullWidth
                                        name="Card_Number"
                                        margin="normal"
                                        type="text"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                        inputProps={{ maxLength: 16 }}
                                        value={formValues.Card_Number}
                                        onChange={handleInputChange}
                                        onBlur={handleFormValuesChange}
                                        error={formValues.Card_Number.length !== 16 && formValues.Card_Number !== ''} // Check for validation error
                                        helperText={
                                            formValues.Card_Number.length !== 16 && formValues.Card_Number !== ''
                                                ? 'Credit card number must be 16 digits'
                                                : ''
                                        }
                                        required
                                    />
                                    <TextField
                                        label="CVV(Card Verification Value)"
                                        variant="outlined"
                                        fullWidth
                                        name="CVV"
                                        margin="normal"
                                        type="text"
                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }}
                                        inputProps={{ maxLength: 3 }}
                                        value={formValues.CVV}
                                        onChange={handleInputChange}
                                        onBlur={handleFormValuesChange}
                                        error={formValues.CVV.length !== 3 && formValues.CVV !== ''} // Check for validation error
                                        helperText={
                                            formValues.CVV.length !== 3 && formValues.CVV !== ''
                                                ? 'CVV must be 3 digits'
                                                : ''
                                        }
                                        required
                                    />

                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Expiry Month"
                                                variant="outlined"
                                                fullWidth
                                                name="expMonth"
                                                margin="normal"
                                                type="number"
                                                inputProps={{ min: 1, max: 12 }}
                                                value={formValues.expMonth}
                                                onChange={handleInputChange}
                                                onBlur={handleFormValuesChange}
                                                error={
                                                    formValues.expMonth < 1 ||
                                                    formValues.expMonth > 12 ||
                                                    formValues.expMonth === ''
                                                }
                                                helperText={
                                                    formValues.expMonth < 1 ||
                                                    formValues.expMonth > 12 ||
                                                    formValues.expMonth === ''
                                                        ? 'Please enter a valid month (1-12)'
                                                        : ''
                                                }
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Expiry Year"
                                                variant="outlined"
                                                fullWidth
                                                name="expYear"
                                                margin="normal"
                                                type="number"
                                                inputProps={{ min: 2023 }}
                                                value={formValues.expYear}
                                                onChange={handleInputChange}
                                                onBlur={handleFormValuesChange}
                                                error={
                                                    formValues.expYear < 2023 ||
                                                    formValues.expYear === ''
                                                }
                                                helperText={
                                                    formValues.expYear < 2023 ||
                                                    formValues.expYear === ''
                                                        ? 'Please enter a valid year (2023 onwards)'
                                                        : ''
                                                }
                                            />
                                        </Grid>
                                    </Grid>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        disabled={!isValid}
                                        onClick={handleSubmit }
                                    >
                                        Place Order
                                    </Button>
                                    {show && <div className="msg-container"><Msg /></div>}
                                </Box>
                            </CardContent>
                        </Card>
                    </Container>
                ) : (
                    (function tost() {
                        toast.error("Please login First", {
                            position: "top-right",
                            autoClose: 2000,
                            theme: "light",
                        })
                    })()
                )
            }
            <ToastContainer />
        </div>
    );
}
export default Buy
