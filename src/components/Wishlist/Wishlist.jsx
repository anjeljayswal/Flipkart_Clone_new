import { Button, styled, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { CartContext } from '../../context/productcontex';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EmptyWishlist from './EmptyWishlist';
import { WishlistContext } from '../../context/whishlistcontex';



const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Wishlist = () => {
    const GlobalState = useContext(WishlistContext);
    const state = GlobalState.state;
    const dispatch = GlobalState.dispatch;
    
    const navigate = useNavigate();

    
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    

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
                                <h4>₹{item.price}</h4>
                            </div>
                            
                            <h1 className='dele' onClick={() => dispatch({ type: 'REMOVE', payload: item })}>
                                <Button variant='contained'>Remove</Button>
                            </h1>
                        </div>
                    ))
                ) : (
                    
                    <EmptyWishlist/>
                )}
            </div>
            <ToastContainer />
        </div>

    );
};

export default Wishlist;
