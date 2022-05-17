import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";


const PayButton = ({ CartItems,subtotal,GST,Shippingprice,Total}) => {
  const userId = useSelector((state) => state.Products.User.user);
  const Shippinginfo = JSON.parse(localStorage.getItem('shippinginfo'))
  
  
  return (
    <ProcessToPaymentButton >
      Process To Payment
    </ProcessToPaymentButton>
  );

  }
var ProcessToPaymentButton = styled.div`
  width: 100%;
  height: 3.5vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  background: green;
  color: white;
  border-radius: 1.1vmax;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 600px) {
    margin: 4vmax 0vmax;
    height: 4.5vmax;
  }
`;

export default PayButton;
