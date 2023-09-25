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

const EmptyWishlist = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
    }
    const imgurl = 'https://www.pavejewelers.com/assets/images/empty-wishlist.png';
    return (
        <Component>
            <Container>
                <Image src={imgurl} />
                <Typography>Your whishList is empty.</Typography>
                <Typography component="span">Start adding items to explore our products and make a favotite!</Typography>
            </Container>
            <Btn variant='contained' onClick={goHome}>Add Your Favorite</Btn>
        </Component>
    )
}

export default EmptyWishlist;