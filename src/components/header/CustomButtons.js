import React from 'react'
import { Box, Button, Badge, Typography, styled, Link } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from 'react';
import { CartContext } from '../../context/productcontex';
import { WishlistContext } from '../../context/whishlistcontex';

const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',

    width: '250px', // Sidebar width for larger screens
    // backgroundColor: '#333', // Sidebar background color
    color: '#FFFFFF', // Sidebar text color
    padding: '10px',
    '& > *': {
        textDecoration: 'none',
        fontSize: 16,
        alignItems: 'center',
        display: 'block',
        padding: '10px 20px', // Adjust padding for each sidebar item
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%', // Full width for small screens
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            fontSize: 14, // Adjust font size for small screens
            padding: '10px 0 ', // Adjust padding for small screens
        },
    },
    // '& > *': {
    //     marginRight: '40px !important',
    //     textDecoration: 'none',
    //     color: '#FFFFFF',
    //     fontSize: 12,
    //     alignItems: 'center',
    //     [theme.breakpoints.down('sm')]: {
    //         color: '#2874f0',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         marginTop: 10,
    //     }
    // },
    // [theme.breakpoints.down('sm')]: {
    //     display: 'block'
    // }
}));

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    color: '#FFFFFF',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        color: '#2874f0',
        padding: 12
    }
}));

const LoginButton = styled(Button)`
color: #2874f0;
background: #ffffff;
text-transform: none;
padding: 5px 30px;
border-radius: 2px;
box-shadow: none;
font-weight: 600;
height: 32px;
marginLeft:20px
`

const CustomButtons = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const GlobalState = useContext(CartContext);

    const state = GlobalState.state;

    const GlobalState1 = useContext(WishlistContext);
    const wishState = GlobalState1.state;
    // console.log(GlobalState1)

    return (
        <Wrapper>
            {
                isAuthenticated ? (
                    <button variant='contained' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                        LogOut
                    </button>
                ) : (
                    <button variant='contained' onClick={() => loginWithRedirect()}
                        style={{
                            width: '80px', height: '36px', borderRadius: '10px', border: 'none',
                            color: '#2874f0', background: '#ffffff', fontWeight: 'bold'
                        }}

                    >Login</button>
                )
            }

            {/* <Typography style={{ marginTop: 3, width: 135, cursor: 'pointer', fontSize: 15 }}>Become a Seller</Typography> */}
            {/* <Typography style={{ marginTop: 3, cursor: 'pointer', fontSize: 15 }}>More</Typography> */}
            <NavLink to='/Cart'>
                <Container>
                    <Badge badgeContent={state.length} color="secondary">

                        <ShoppingCartIcon />
                    </Badge>
                    <Typography style={{ marginLeft: 10 }}>Cart</Typography>
                </Container>
            </NavLink>
            <NavLink to='/Wishlist'>
                <Container>
                    <Badge badgeContent={wishState.length} color="secondary">
                        <FavoriteIcon />
                    </Badge>
                    <Typography style={{ marginLeft: 10 }}>Wishlist</Typography>
                </Container>
            </NavLink>

        </Wrapper>
    )
}

export default CustomButtons