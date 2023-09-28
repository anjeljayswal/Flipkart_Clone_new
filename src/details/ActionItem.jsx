import React, { useState } from 'react';
import { Box, Button, styled } from '@mui/material'
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { CartContext } from '../context/productcontex';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { WishlistContext } from '../context/whishlistcontex';


const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '60px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px',
    width: '90%'
});



const StyledButton = styled(Button)(({ theme }) => ({
    width: '46%',
    borderRadius: 2,
    height: 50,
    marginTop: 10,
    color: "#FFF",
    [theme.breakpoints.down('lg')]: {
        width: '46%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%',
    }
}));




const ActionItem = ({ product }) => {
    const { isAuthenticated } = useAuth0();

    const cart = useContext(CartContext)
    const dispatch = cart.dispatch;

    const wish = useContext(WishlistContext);
    const dispatch1 = wish.dispatch;


    
    const [isFavorite, setIsFavorite] = useState(false);
    const toggleFavorite = () => {
        if (isFavorite) {
            // Remove from Wishlist
            // Implement logic to remove the product from the wishlist
            toast.info("Removed from Wishlist", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
        } else {
            // Add to Wishlist
            // Implement logic to add the product to the wishlist
            toast.success("Added to Wishlist", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
            });
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <LeftContainer>

            <Box style={{ position: "relative", padding: '15px  20px', border: '1px solid #f0f0f0' }}>
                <Image src={product.thumbnail} alt='product' style={{ width: "100%" }} />
                <button

                    onClick={() => {
                        dispatch1({ type: 'ADD', payload: product });
                        toast.success("Item added in wishlist . .", {
                            position: "top-right",
                            autoClose: 2000,
                            theme: "light",
                        });
                        setIsFavorite(true);
                    }}
                    style={{
                        position: 'absolute',
                        top: '9px',
                        right: '10px',
                        backgroundColor: isFavorite ? 'red' : 'white',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '5px',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor:'pointer'
                    }}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>

            </Box>

            <StyledButton onClick={() => {
                dispatch({ type: 'ADD', payload: product });
                toast.success("Item added in cart . .", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light",
                });
            }}
                style={{ marginRight: 10, background: '#ff9f00' }}
                variant="contained"><Cart />
                Add to Cart</StyledButton>

            {
                isAuthenticated ? (
                    <NavLink to="/Cart/PaymentFor" style={{ textDecoration: "none" }}>
                        <StyledButton style={{ background: '#fb641b' }} variant="contained">
                            <Flash />Buy Now
                        </StyledButton>
                    </NavLink>
                ) : (
                    <StyledButton onClick={() => toast.warning("Please Login First . .", {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "light",
                    })} style={{ background: '#fb641b' }} variant="contained"><Flash />Buy Now</StyledButton>
                )
            }


            <ToastContainer />
        </LeftContainer >
    )
}

export default ActionItem
