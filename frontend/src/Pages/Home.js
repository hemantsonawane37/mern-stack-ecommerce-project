import React from 'react'
import NavBar from "../Component/NavBar";
import Footer from '../Component/Footer';
import Featrures from '../Component/Featrures';
import Banner from '../Component/Banner';
import MetaData from '../Component/Metadata/MetaData';

function Home() {
    return (
        <div>
            <MetaData title={"Home"}/>
            <NavBar/>
            <Banner/>
            <Featrures/>
            <Footer/>
        </div>
    )
}

export default Home
