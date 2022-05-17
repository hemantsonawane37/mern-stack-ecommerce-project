import React from "react";
import styled from "styled-components";
import NavBar from "../Component/NavBar";
import { SearchedProducts } from "../Component/SearchedProducts";

const SearchedProductsPage = () => {
  return (
    <MainSearchProductspageDiv>
      <NavBar />
      <SearchedProducts />
    </MainSearchProductspageDiv>
  );
};

var MainSearchProductspageDiv = styled.div`
  width:100vw;
`;

export default SearchedProductsPage;
