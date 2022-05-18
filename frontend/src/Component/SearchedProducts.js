import React from "react";
import styled from "styled-components";
import FilterCompo from "./FilterCompo";
import ProductsCompo from "./ProductsCompo";

export const SearchedProducts = () => {
  return (
    <MainSearchProductcompDiv>
      <FilterCompo />
      <ProductsCompo />
    </MainSearchProductcompDiv>
  );
};

var MainSearchProductcompDiv = styled.div`
  width: 100vw;
  display: flex;
  position:relative;
  @media only screen and (max-width: 600px) {
    flex-direction:column;
  }
 
`;
