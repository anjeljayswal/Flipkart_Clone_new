import { Typography, Box, styled, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    background: #fff;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center
`;
const Btn = styled(Button)`
    margin-top:20px;
    text-transform: capitalize;
`

const Container = styled(Box)`
    text-align: center;
    padding-top: 70px;
`;

const Image = styled('img')({
    width: '30%'
});

const EmptyCart = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
    }
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';

    return (
        <Component>
            <Container>
                <Image src={imgurl} />
                <Typography>Your shopping cart is empty.</Typography>
                <Typography component="span">Start adding items to explore our products and make a purchase!</Typography>
            </Container>
            <Btn variant='contained' onClick={goHome}>Shop Now</Btn>
        </Component>
    )
}

export default EmptyCart;