import { Button, styled, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/productcontex';
import './Cart.css';
import EmptyCart from './EmptyCart';
import { useAuth0 } from '@auth0/auth0-react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// const StyledButton = styled(Button)`
//     display: flex;
//     margin-left: auto;
//     background: #fb641b;
//     color: #fff;
//     border-radius: 2px;
//     width: 250px;
//     height: 51px;
// `;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Cart = () => {
    const GlobalState = useContext(CartContext);
    const state = GlobalState.state;
    const dispatch = GlobalState.dispatch;

    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const [countMap, setCountMap] = useState({}); // Track count for each item using a map
    const [totalPrice, setTotalPrice] = useState(0);

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    useEffect(() => {
        let count = 0;
        state.forEach((item) => {
            count += item.price * (countMap[item.id] || 1); // Multiply the price by the count of each item
        });
        setTotalPrice(count);
    }, [state, countMap]);

    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            dispatch({ type: 'SET_CART', payload: JSON.parse(savedCartItems) }); // Load the cart items from local storage
        }
    }, [dispatch]);

    const handleIncrement = (item) => {
        setCountMap((prevCountMap) => ({
            ...prevCountMap,
            [item.id]: (prevCountMap[item.id] || 1) + 1, // Increment the count for the item
        }));
    };

    const handleDecrement = (item) => {
        setCountMap((prevCountMap) => {
            const count = prevCountMap[item.id] || 1;
            if (count > 1) {
                return {
                    ...prevCountMap,
                    [item.id]: count - 1, // Decrement the count for the item
                };
            }
            return prevCountMap;
        });
    };

    const showForm = () => {
        if (isAuthenticated) {
            navigate('./Payment');
        } else {
            toast.error("Please Login first", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
        }
    }

    return (
        <div className='main'>
            <div className='cont'>
                {state.length > 0 ? (
                    state.map((item, index) => (
                        <div className='onecomp' key={index}>
                            <img src={item.image} style={{ width: 100, height: 100 }} alt='flipkart' />
                            <div className='desccomp'>
                                <h4>{item.title}</h4>
                                <SmallText>Seller:RetailNet
                                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt='product' /></span>
                                </SmallText>
                                <p>Rating: {item.rating.rate}</p>
                                <h4>${item.price}</h4>
                            </div>
                            <div className='count'>
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <span>{countMap[item.id] || 1}</span>
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <h1 className='dele' onClick={() => dispatch({ type: 'REMOVE', payload: item })}>
                                <Button variant='contained'>Remove</Button>
                            </h1>
                        </div>
                    ))
                ) : (
                    <EmptyCart />
                )}
            </div>
            <div className='openForm'>
                {state.length > 0 && (
                    <div className='pay'>
                        <Button variant='contained' onClick={showForm}>Place Order</Button>
                        <h1>Total - ${totalPrice}</h1>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>

    );
};

export default Cart;
