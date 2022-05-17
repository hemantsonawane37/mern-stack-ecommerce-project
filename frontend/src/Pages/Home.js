import React from 'react'
import NavBar from "../Component/NavBar";
import Footer from '../Component/Footer';
import Featrures from '../Component/Featrures';
import Banner from '../Component/Banner';

function Home() {
    return (
        <div>
            <NavBar/>
            <Banner/>
            <Featrures/>
            <Footer/>
        </div>
    )
}

export default Home
