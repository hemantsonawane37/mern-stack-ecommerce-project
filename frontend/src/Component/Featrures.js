import React, { useState } from "react";
import { FeaturesProducts } from "../APICallFun/ApiFun";
import styled from "styled-components";
import Product from "./Product";

const HeadingDiv = styled.div`
  width: 100vw;
  text-align: center;
  padding-top: 3vmax;
`;
const H4 = styled.h4`
  text-decoration: underline;
  color: #2b2b2b;
`;
const MainDiv = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2vmax 0vmax;
`;

const Featrures = () => {
  const [Products, Setstate] = useState([]);
  FeaturesProducts(Setstate);

  return (
    <>
      <HeadingDiv>
        <H4 id="Products">Feature Products</H4>
      </HeadingDiv>
      <MainDiv>
        {Products &&
          Products.map((ProductValue, i) => {
            return <Product key={i} Data={ProductValue}></Product>;
          })}
      </MainDiv>
    </>
  );
};
export default Featrures;
