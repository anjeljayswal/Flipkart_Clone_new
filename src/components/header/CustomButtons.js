import React from 'react'
import { Box, Button, Badge, Typography, styled, Link } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from 'react';
import { CartContext } from '../../context/productcontex';


const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',
    '& > *': {
        marginRight: '40px !important',
        textDecoration: 'none',
        color: '#FFFFFF',
        fontSize: 12,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            color: '#2874f0',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10,
        }
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    color: '#FFFFFF',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
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

    return (
        <Wrapper>
            {
                isAuthenticated ? (
                    <LoginButton variant='contained' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                        LogOut
                    </LoginButton>
                ) : (
                    <LoginButton variant='contained' onClick={() => loginWithRedirect()} >Login</LoginButton>
                )
            }

            <Typography style={{ marginTop: 3, width: 135, cursor: 'pointer', fontSize: 15 }}>Become a Seller</Typography>
            <Typography style={{ marginTop: 3, cursor: 'pointer', fontSize: 15 }}>More</Typography>
            <NavLink to='/Cart'>
                <Container>
                    <Badge badgeContent={state.length} color="secondary">
                        <ShoppingCart />
                    </Badge>
                    <Typography style={{ marginLeft: 10 }}>Cart</Typography>
                </Container>
            </NavLink>

        </Wrapper>
    )
}

export default CustomButtons