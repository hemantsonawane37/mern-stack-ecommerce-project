import React from "react";
import styled from "styled-components";
import Product from "./Product";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";

const ProductsCompo = () => {
  const dispatch = useDispatch();

  let Products = useSelector((state) => state.Products.products.Products);
  let Loading = useSelector((state) => state.Products.loading);

  const GetPageNum = (e, page) => {
    dispatch(actions.initializePageNum(page));
  };


  return (
    <MainProductCompoDiv>
      <HeadingDiv>
        <Heading>Products</Heading>
      </HeadingDiv>
      <ProductsParentDiv>
        {Products && !Loading ? Products.length !== 0 && !Loading ? Products.map((Data, i) => {
                return <Product key={i} Data={Data} />;
              })
            : "No Product Found"
          : "Loading..."}
      </ProductsParentDiv>
      <PaginationDiv>
        <Stack spacing={2}>
          <Pagination
            count={5}
            defaultValue={1}
            onChange={GetPageNum}
            shape="rounded"
          />
        </Stack>
      </PaginationDiv>
    </MainProductCompoDiv>
  );
};

var PaginationDiv = styled.div`
  width: 100%;
  height: 5vmax;
  //border:1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3vmax;
  margin-top: auto;
`;

var ProductsParentDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2vmax 0vmax;
  // border: 1px solid blue;
`;

var MainProductCompoDiv = styled.div`
  flex: 4.5;

  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  @media only screen and (max-width: 600px) {
    flex: 4;
  }
`;

var HeadingDiv = styled.div`
  margin: 2vmax auto;
  width: 6vmax;
  height: 2vmax;
  border-bottom: 0.5px solid black;
  text-align: center;
  @media only screen and (max-width: 600px) {
    width: 8vmax;
    height: 2vmax;
  }
`;

var Heading = styled.h3`
  font-weight: 500;
  font-size: 1.5vmax;
  @media only screen and (max-width: 600px) {
    font-size: 1.5vmax;
  }
`;

export default ProductsCompo;
