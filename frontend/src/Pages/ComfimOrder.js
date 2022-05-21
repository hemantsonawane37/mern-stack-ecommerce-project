import React from "react";
import HorizontalLabelPosition from "../Component/HorizontalLabelPosition";
import NavBar from "../Component/NavBar";
import styled from "styled-components";
import ShippingInfoAndCartItems from "../Component/ShippingInfoAndCartItems";
import OrderSummary from "../Component/OrderSummary";
import MetaData from "../Component/Metadata/MetaData";


const ComfimOrder = () => {
  return (
    <>
    <MetaData title={"Process to payment"}/>
      <NavBar />
      <HorizontalLabelPosition OrderSteps={1} />
      <MainComfimOrderDiv>
        <ShippingInfoAndCartItems />
        <OrderSummary />
      </MainComfimOrderDiv>
    </>
  );
};

var MainComfimOrderDiv = styled.div`
  width: 100vw;
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export default ComfimOrder;
