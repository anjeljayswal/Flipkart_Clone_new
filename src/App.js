import Header from './components/header/Header';
import Home from './components/home/Home';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailView from './details/DetailView';
import Cart from './components/cart/Cart';
import Payment from './components/Payment/Payment'
import AllItems from './components/allItems/AllItems';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box style={{ marginTop: 54 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<DetailView />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Cart/Payment' element={<Payment />} />
          <Route path='/AllItems' element={<AllItems />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
