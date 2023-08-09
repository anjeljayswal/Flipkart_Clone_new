import { products } from './../constants/data';
import { Box, Grid, styled } from '@mui/material'
import ActionItem from './ActionItem'
import ProductDetail from './ProductDetail'
import { useLocation } from 'react-router-dom';

const Component = styled(Box)`
    margin-top: 55px;
    background: #F2F2F2;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: '#FFFFFF',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    margin: 0
  }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    padding-left: 40px;
    & > p {
        margin-top: 10px;
    }
`;

const DetailView = () => {

  const operation = useLocation();
  const { id } = operation.state

  return (
    <Component>

      <Container container>
        <Grid item lg={4} md={4} sm={8} xs={12}>
          <ActionItem product={products[id]} />
        </Grid>
        <RightContainer item lg={8} md={8} sm={8} xs={12}>
          <ProductDetail product={products[id]} />
        </RightContainer>
      </Container>

    </Component>
  )
}

export default DetailView