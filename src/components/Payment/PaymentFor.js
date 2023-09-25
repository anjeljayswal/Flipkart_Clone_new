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

        //updated field validation status
        if (value.trim() === "") {
            setFieldErrors({
                ...fieldErrors,
                [name]: true,
            })

        } else {
            setFieldErrors({
                ...fieldErrors,
                [name]: false,
            })
        }
    }


    const handleFormValuesChange = () => {
        const formFields = Object.values(formValues);
        const allFieldsFilled = formFields.every((field) => field !== '');
        setFieldErrors(allFieldsFilled);
    }
    // define function to show alert and clear form data when order button is clicked
    const handleSubmit = (e) => {
        e.preventDefault();
        const emptyFields = Object.entries(formValues)
            .filter(([key, value]) => value.trim() === "")
            .map(([key]) => key);
        if (emptyFields.length > 0) {
            // Display error messages for empty fields
            emptyFields.forEach((fieldName) => {
                toast.error(`${fieldName} must not be empty`, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light",
                });
            });
            return; // Exit the function if any field is empty
        }

        Msg();
        setShow(true)
        dispatch({ type: 'CLEAR' });
        handleOrderPlacement();

    }
    // define function to clear form data
    const handleOrderPlacement = () => {
        setFormValues({
            Name: '',
            Address: '',
            Card_Number: '',

            CVV: '',
            phoneNo: '',
            ExpirationDate: ''
        });
        setFieldErrors({
            Name: false,
            Address: false,
            Card_Number: false,
            CVV: false,
            phoneNo: false,
            ExpirationDate: false,
        });
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

    const isValidExpiryDate = (ExpirationDate) => {
        // Split the input into month and year parts
        const [month, year] = ExpirationDate.split('/');

        // Get the current date
        const currentDate = new Date();

        // Extract the current year and month
        const currentYear = currentDate.getFullYear() % 100; // Extract the last two digits
        const currentMonth = currentDate.getMonth() + 1; // January is 1, February is 2, etc.

        // Convert the month and year parts to numbers
        const inputMonth = parseInt(month, 10);
        const inputYear = parseInt(year, 10);

        // Check if the year is in the future, or if it's the current year and the month is in the future
        if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
            return false;
        }

        // If all checks pass, the expiration date is valid
        return true;
    };
    let isValid;
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
                                    <TextField
                                        label="Expiration Date"
                                        name="ExpirationDate"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type="text"
                                        placeholder="MM/YY"
                                        inputProps={{
                                            maxLength: 5
                                        }}
                                        onInput={(e) => {
                                            e.target.value = e.target.value
                                                .replace(/\D/g, "")   // Remove non-numeric characters
                                                .replace(/(\d{2})(\d{0,2})/, "$1/$2") // Format as MM/YY
                                                .substr(0, 5);         // Limit to 5 characters (MM/YY)
                                        
                                                 isValid = isValidExpiryDate(e.target.value);
                                            if (!isValid) {
                                                e.target.setCustomValidity("Invalid expiration date (MM/YY)");
                                            } else {
                                                e.target.setCustomValidity("");
                                            }
                                        }}
                                        
                                        value={formValues.ExpirationDate}
                                        onChange={handleInputChange}
                                        onBlur={handleFormValuesChange}
                                        error={!isValidExpiryDate(formValues.ExpirationDate)}
                                        helperText={
                                            !isValidExpiryDate(formValues.ExpirationDate)
                                                ? 'Invalid expiration date (MM/YY)'
                                                : ''
                                        }
                                        required
                                    />

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
