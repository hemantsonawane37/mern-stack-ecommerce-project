import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RemoveProductFromCart } from "../functions/cart";
import { useDispatch } from "react-redux";
import { actions } from "../store";
import { increaseQuantity } from "../functions/cart";

const CartProduct = ({ Product }) => {
  const [quantity, SetQuantity] = useState(Product.Quantity);
  const [quantityType, SetQuantityType] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (quantityType === "increase") {
      increaseQuantity(Product._id, quantity, "increase");
    } else if (quantityType === "decrease") {
      increaseQuantity(Product._id, quantity, "decrease");
    }
  }, [quantityType, quantity, Product]);

  return (
    <ParentProductDiv>
      <LeftSideDiv>
        <ImageNamePriceDiv>
          <Image
            src={Product.images[0]?.url}
            width={"200vmax"}
            height={"90%"}
          ></Image>
          <ProductDetailDiv>
            <ProductName>{Product.name}</ProductName>
            <ProductPrice>Price ₹{Product.price}</ProductPrice>
            <Remove
              onClick={() =>
                RemoveProductFromCart(Product._id, dispatch, actions)
              }
            >
              Remove
            </Remove>
          </ProductDetailDiv>
        </ImageNamePriceDiv>
      </LeftSideDiv>
      <RightSideDiv>
        <QuantityConDiv>
          <QuantityDiv>
            <DecreaseDiv
              onClick={() => {
                SetQuantity((state) => (state <= 1 ? 1 : state - 1));
                SetQuantityType((state) => "decrease");
              }}
            >
              -
            </DecreaseDiv>
            <Quantity>{quantity}</Quantity>
            <IncreaseDiv
              onClick={() => {
                SetQuantity((state) => (state <= 4 ? state + 1 : state));
                SetQuantityType((state) => "increase");
              }}
            >
              +
            </IncreaseDiv>
          </QuantityDiv>
        </QuantityConDiv>
        <PriceDiv>
          <Price> ₹{Product.TotalPrice}</Price>
        </PriceDiv>
      </RightSideDiv>
    </ParentProductDiv>
  );
};

var PriceDiv = styled.div`
  flex: 1;
  //border: 1px blue solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;
var Price = styled.span`
  font-size: 1.5vmax;
  @media only screen and (max-width: 600px) {

    font-size: 1.7vmax;
  }
`;

var QuantityConDiv = styled.div`
  flex: 1;
`;
var QuantityDiv = styled.div`
  display: flex;
  width: 8vmax;
  height: 3vmax;
  // border: 1px blue solid;
  @media only screen and (max-width: 600px) {

    font-size: 1.6vmax;
    width: 8vmax;
    height: 4vmax;
  }
`;
var IncreaseDiv = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: #ff5757;
  &:hover {
    background: #ff2222;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {

    font-size: 1.6vmax;
    width: 8vmax;
    height: 4vmax;
  }
`;
var DecreaseDiv = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  background: #ff5757;
  &:hover {
    background: #ff2222;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {

    font-size: 1.6vmax;
    width: 8vmax;
    height: 4vmax;
  }
`;
var Quantity = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;

  align-items: center;
`;

var ProductDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  //border:1px red solid;
  height: 90%;
  width:100%;
  justify-content: space-around;
`;

var ImageNamePriceDiv = styled.div`
  display: flex;
  height: 10vmax;
 
  align-items: center;
  @media only screen and (max-width: 600px) {
    height: 12vmax;
  }
`;
var Image = styled.img`
  object-fit: contain;
  // border: 1px red solid;
  @media only screen and (max-width: 600px) {
    width: 12vmax;
    height: 10vmax;
  }
`;
var ProductName = styled.span`
  font-size: 1.5vmax;
  @media only screen and (max-width: 600px) {
    font-size: 1.5vmax;
  }
`;
var ProductPrice = styled.span`
  font-size: 1.5vmax;
  @media only screen and (max-width: 600px) {

    font-size: 1.6vmax;
  }
`;
var Remove = styled.button`
  border: none;
  background: white;
  color: red;
  font-weight: 500;
  font-size: 1.1vmax;
  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {

    font-size: 1.6vmax;
  }
`;

var LeftSideDiv = styled.div`
  flex: 2;
`;

var RightSideDiv = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: space-between;
`;

var ParentProductDiv = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 600px) {
    height: 15vh;
  }
`;

export default CartProduct;
