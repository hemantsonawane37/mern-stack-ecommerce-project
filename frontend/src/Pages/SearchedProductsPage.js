import React from "react";
import styled from "styled-components";
import MetaData from "../Component/Metadata/MetaData";
import NavBar from "../Component/NavBar";
import { SearchedProducts } from "../Component/SearchedProducts";

const SearchedProductsPage = () => {
  return (
    <MainSearchProductspageDiv>
      <MetaData title={"Products"}/>
      <NavBar />
      <SearchedProducts />
    </MainSearchProductspageDiv>
  );
};

var MainSearchProductspageDiv = styled.div`
  width:100vw;
`;

export default SearchedProductsPage;
