import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { navData } from '../../constants/data'

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '55px 130px 0 130px',
    overflowX: 'overlay',
    [theme.breakpoints.down('lg')]: {
        margin: 0
    }
}))

const Container = styled(Box)`
padding: 13px 8px;
text-align: center;
`;

const Test = styled(Typography)`
font-size: 14px;
font-weight: 600;
`;

const NavBar = () => {
    return (
        <Component>
            {
                navData.map((data) => (
                    <Container>
                        <img src={data.url} alt='nav' style={{ width: 64 }} />
                        <Test>{data.text}</Test>
                    </Container>
                ))
            }
        </Component>
    )
}

export default NavBar