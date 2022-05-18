import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";
import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CartCompo = () => {
  const [Product, SetProduct] = useState([]);
  const dispatch = useDispatch();
  const CartProducts = useSelector((state) => state.Products.Cart);
  const isAuthenticate = useSelector((state) => state.Products.User.success);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      actions.initializeCartItem(JSON.parse(localStorage.getItem("cart")))
    );
    SetProduct((state) => (state = JSON.parse(localStorage.getItem("cart"))));
  }, [dispatch, CartProducts, navigate, SetProduct, isAuthenticate]);

  function TotalPrice(Product) {
    let Total = 0;

    Product.forEach((data) => {
      Total += data.TotalPrice;
    });
    return Total;
  }
  //console.log(Product)
  const GrossPrice = Product && TotalPrice(Product);

  return (
    <MainCompoDiv>
      {Product ? (
        <CartProductsParent>
          <Heading>
            <Products>Products</Products>
            <Quantity>Quantity</Quantity>
            <SubTotal>SubTotal</SubTotal>
          </Heading>

          {Product
            ? Product.map((product, i) => {
                return <CartProduct Product={product} key={i} />;
              })
            : ""}
          <TotalContDiv>
            <TotalDiv>
              <GrossTotalSpan>Gross Total</GrossTotalSpan>
              <GrossTotalPrice>₹{GrossPrice}</GrossTotalPrice>
            </TotalDiv>
            <Link to={"/shippinginfo"} style={{ textDecoration: "none" }}>
              {" "}
              <CheckOut>Check out</CheckOut>{" "}
            </Link>
          </TotalContDiv>
        </CartProductsParent>
      ) : (
        <EmptyCartCont>
          <EmptyCartImage src="images/shopping-cart.webp"></EmptyCartImage>
          <EmptyBigText>No Items In Cart !</EmptyBigText>
          <EmptyText>
            You have no items in your shopping cart Let`s go Buy Something !
          </EmptyText>
          <Link to={"/"}>
            {" "}
            <ShopNow>Shop Now</ShopNow>
          </Link>
        </EmptyCartCont>
      )}
    </MainCompoDiv>
  );
};

var ShopNow = styled.div`
  width: 10vmax;
  height: 2.5vmax;
  display: flex;

  justify-content: center;
  align-items: center;
  margin-top: 1vmax;
  color: white;
  background: #ff3636;
  &:hover {
    background: #ff2727;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    width: 20vmax;
    height: 4vmax;
    margin-top: 2vmax;
  }
`;

var EmptyText = styled.span`
  width: 20vmax;
  text-align: center;
  font-weight: 500;
  font-size: 1.2vmax;
  color: gray;
  @media only screen and (max-width: 600px) {
    font-size: 2vmax;
    width: 30vmax;
  }
`;
var EmptyBigText = styled.span`
  font-size: 2.5vmax;
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    font-size: 3vmax;
  }
`;

var EmptyCartCont = styled.div`
  margin: 0px auto;
  width: 85vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // border: 1px solid black;
  @media only screen and (max-width: 600px) {
    margin-top: 4vmax;
  }
`;

var EmptyCartImage = styled.img`
  // border: 1px solid black;
  width: 60vw;
  height: 40vh;
  object-fit: contain;
  @media only screen and (max-width: 600px) {
    height: 30vh;
  }
`;

var CheckOut = styled.div`
  width: 30vw;
  height: 3vmax;
  // border:1px solid black;
  margin-left: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff3636;
  color: white;
  &:hover {
    background: #ff2222;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    font-size: 1.4vmax;

    height: 5vmax;
  }
`;

var GrossTotalSpan = styled.span`
  font-size: 1.5vmax;
  @media only screen and (max-width: 600px) {
    font-size: 1.6vmax;
  }
`;
var GrossTotalPrice = styled.span`
  font-size: 1.5vmax;
  @media only screen and (max-width: 600px) {
    font-size: 1.6vmax;
  }
`;

var TotalDiv = styled.div`
  width: 30vw;
  height: 4vmax;
  // border:1px solid black;
  margin-left: auto;
  border-top: 2px solid green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 100%;
    justify-content: space-around;
    height: 4.5vmax;
  }
`;

var TotalContDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
 
`;

var Products = styled.span`
  flex: 2;
  margin-left: 1vmax;
  font-size: 1.5vmax;
`;
var Quantity = styled.span`
  flex: 0.7;
  font-size: 1.5vmax;
`;
var SubTotal = styled.span`
  flex: 0.7;
  text-align: center;
  font-size: 1.5vmax;
`;

var Heading = styled.div`
  width: 100%;
  background: #ff5757;
  display: flex;
  color: white;
  padding: 1vmax 0vmax;
`;

var CartProductsParent = styled.div`
  width: 85vw;
  margin: 0px auto;
  @media only screen and (max-width: 600px) {
    width: 95vw;

  }
`;

var MainCompoDiv = styled.div`
  width: 100vw;

  //display:flex;
  margin-top: 1vmax;

`;

export default CartCompo;
