import Header from './components/header/Header';
import Home from './components/home/Home';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailView from './details/DetailView';
import Cart from './components/cart/Cart';
// import Payment from './components/Payment/Payment'
import PaymentFor from './components/Payment/PaymentFor'

import AllItems from './components/allItems/AllItems';
import Wishlist from './components/Wishlist/Wishlist';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box style={{ marginTop: 54 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<DetailView />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Wishlist' element={<Wishlist />} />
          {/* <Route path='/Cart/Payment' element={<Payment />} /> */}
          <Route path='/Cart/PaymentFor' element={<PaymentFor />} />
          
          <Route path='/AllItems' element={<AllItems />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;


// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/anjeljayswal/Flipkart_Clone_new.git
// git push -u origin main