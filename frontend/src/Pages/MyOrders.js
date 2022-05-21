import React from 'react';
import NavBar from '../Component/NavBar';
import MyOrderCompo from '../Component/MyOrderCompo';
import MetaData from '../Component/Metadata/MetaData';


const MyOrders = () => {
  return (
    <>
    <MetaData title={"My Orders"}/>
    <NavBar/>
    <MyOrderCompo/>
    </>
  )
}

export default MyOrders