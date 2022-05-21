import React from "react";
import NavBar from "../Component/NavBar";
import CartCompo from "../Component/CartCompo";
import MetaData from '../Component/Metadata/MetaData';

const Cart = () => {
 
  return (
    <>
    <MetaData title={"Cart"}/>
      <NavBar />
      <CartCompo />
    </>
  );
};

export default Cart;
