import { Box, styled } from '@mui/material'
import React from 'react'
import Banner from './Banner'
import MidSection from './MidSection'
import MidSlide from './MidSlide'
import NavBar from './NavBar'
import Slide from './Slide'
import Footer from '../footer/Footer'

const Component = styled(Box)`
padding: 10px;
background: #F2F2F2;
`;

const Home = () => {
    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide title="Discounts for You" timer={true} />
                <MidSection />
                <Slide title="Suggesting Items" timer={false} />
                <Slide title="Top Selection" timer={false} />
                {/* <Slide title="Recomended Items" timer={false} />
                <Slide title="Trending Offers" timer={false} />
                <Slide title="Season's top pics" timer={false} />
                <Slide title="Top Deals on Accessories " timer={false} /> */}
            </Component>
            <Footer />
        </>
    )
}

export default Home