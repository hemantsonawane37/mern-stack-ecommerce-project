import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actions } from "../store";

const ShippingInfoAndCartItems = () => {
  const [ShippingInfo, SetshippingInfo] = useState({
    name: "",
    Phone: "",
    address: "",
  });
  const [cartProducts, setCartProducts] = useState([]);

  //


  const dispatch = useDispatch();
  const CartProductss = useSelector((state) => state.Products.Cart[0]);
  useEffect(() => {
    let shippingInfo = JSON.parse(localStorage.getItem("shippinginfo"));
    let CartProducts = JSON.parse(localStorage.getItem("cart"));
    let username = JSON.parse(localStorage.getItem("user")).user.name;

    setCartProducts([CartProductss]);
    dispatch(actions.initializeCartItem(CartProducts));
    SetshippingInfo({
      ...ShippingInfo,
      name: username,
      Phone: shippingInfo.phone,
      address: shippingInfo.address,
    });
    //console.log(CartProducts)
  }, [CartProductss, dispatch, ShippingInfo, cartProducts]);

  //console.log(cartProducts.map((v)=> v))
  //console.log(CartProductss)
  return (
    <MainParentDiv>
      <ShippingInfoParentDiv>
        <ShippingInfoHeaderDiv>
          <ShippingInfoHeaderText>Shipping Info :</ShippingInfoHeaderText>
        </ShippingInfoHeaderDiv>
        <ShippingInfoDetailsParentDiv>
          <ShippingDetailDiv>
            <Key>Name :</Key>
            <Value> {ShippingInfo.name}</Value>
          </ShippingDetailDiv>
          <ShippingDetailDiv>
            <Key>Phone :</Key>
            <Value> {ShippingInfo.Phone}</Value>
          </ShippingDetailDiv>{" "}
          <ShippingDetailDiv>
            <Key>Address :</Key>
            <Value> {ShippingInfo.address} </Value>
          </ShippingDetailDiv>
        </ShippingInfoDetailsParentDiv>
      </ShippingInfoParentDiv>
      <CartInfoParentDiv>
        <CartInfoHeaderDiv>
          <CartInfoHeaderText>Cart Items :</CartInfoHeaderText>
        </CartInfoHeaderDiv>
        <CartProductsParentDiv>
          {cartProducts &&
            CartProductss?.map((data) => {
              return (
                <CartProductParentDiv key={data._id}>
                  <CartProductLeftContainer>
                    <CartProductImageDiv>
                      <Image
                        src="./images/Black-T-Shirt.png"
                        width={"100%"}
                        height={"100%"}
                      ></Image>
                    </CartProductImageDiv>
                    <CartProductNamediv>
                      <ProductName>{data.name}</ProductName>
                    </CartProductNamediv>
                  </CartProductLeftContainer>
                  <CartProductRightContainer>
                    <CartProductPriceDiv>
                      <ParentCartProductPrice>
                        <QuantityAndPrice>
                          {data.Quantity} x ₹{data.price} ={" "}
                        </QuantityAndPrice>
                        <CartProductPrice> ₹{data.TotalPrice}</CartProductPrice>
                      </ParentCartProductPrice>
                    </CartProductPriceDiv>
                  </CartProductRightContainer>
                </CartProductParentDiv>
              );
            })}
        </CartProductsParentDiv>
      </CartInfoParentDiv>
    </MainParentDiv>
  );
};

var Value = styled.span`
  font-weight: 500;
  color: gray;
  font-size: 1.1vmax;
  @media (max-width: 600px) {
    font-size: 1.4vmax;
  }
`;

var Key = styled.span`
  font-weight: 500;
  font-size: 1.2vmax;
  @media (max-width: 600px) {
    font-size: 1.4vmax;
  }
`;

var ShippingDetailDiv = styled.div`
  margin-left: 2vmax;
  padding: 1vmax 0vmax;
`;

var ShippingInfoDetailsParentDiv = styled.div`
  width: 100%;
`;

var ShippingInfoHeaderText = styled.h2``;

var ShippingInfoHeaderDiv = styled.div`
  //border:1px solid red;
  width: 100%;
  height: 4vmax;
  display: flex;
  align-items: center;
`;

var ShippingInfoParentDiv = styled.div`
  //border:1px solid red;
  width: 80%;
  margin: 2vmax auto;
`;

// cart

var ParentCartProductPrice = styled.div`
  margin: auto;
`;

var QuantityAndPrice = styled.span`
  font-weight: 500;
  font-size: 1.1vmax;
  color: gray;
  @media (max-width: 600px) {
    font-size: 1.5vmax;
  }
`;

var CartProductPrice = styled.span`
  font-weight: 500;
  font-size: 1.1vmax;
  @media (max-width: 600px) {
    font-size: 1.5vmax;
  }
`;

var CartProductPriceDiv = styled.div`
  width: 70%;
  height: 100%;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

var ProductName = styled.span`
  margin: auto;
  font-size: 1.1vmax;
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    font-size: 1.4vmax;

  }
`;

var Image = styled.img`
  object-fit: contain;
`;

var CartProductImageDiv = styled.div`
  width: 30%;
  height: 100%;
`;

var CartProductNamediv = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
`;

var CartProductLeftContainer = styled.div`
  width: 50%;
  display: flex;
`;

var CartProductRightContainer = styled.div`
  width: 50%;
`;

var CartProductParentDiv = styled.div`
  width: 100%;
  height: 10vmax;
  //border:1px solid blue;
  display: flex;
  margin: 1vmax 0vmax;
`;

var CartProductsParentDiv = styled.div`
  width: 100%;
`;

var CartInfoHeaderText = styled.h2``;

var CartInfoHeaderDiv = styled.div`
  //border:1px solid red;
  width: 100%;
  height: 4vmax;
  display: flex;
  align-items: center;
`;

var CartInfoParentDiv = styled.div`
  //border:1px solid red;
  width: 80%;
  margin: 2vmax auto;
`;

var MainParentDiv = styled.div`
  width: 70vw;
  padding-bottom: 3vmax;
  //border:1px solid red;
  @media (max-width: 600px) {
    width: 100vw;
  }
`;

export default ShippingInfoAndCartItems;
