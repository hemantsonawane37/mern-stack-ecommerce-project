import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../APICallFun/ApiFun";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
import { AddtoCart } from "../functions/cart";
import SubmitReview from "./SubmitReview";
import { useAlert } from "react-alert";

const SingleProductComp = () => {
  const [ProductDetail, SetProductDetial] = useState(
    useSelector((state) => state.Products.SingleProduct)
  );
  const [imageSlider, setImageSlider] = useState(0);
  const [submit, SetSubmit] = useState(false);
  const [Quantity, SetQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const singleproduct = useSelector(
    (state) => state.Products.SingleProduct.product
  );
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function FatchData() {
      GetSingleProduct(id, dispatch, actions);
      SetProductDetial(singleproduct);
    }
    FatchData();
  }, [id, dispatch, singleproduct]);

  const Slideder = ({ Direction }) => {
    if (Direction === "left") {
      setImageSlider((state) => (state === 0 ? 0 : state - 1));
    } else {
      setImageSlider((state) =>
        state < ProductDetail?.images?.length ? 0 : state + 1
      );
    }
  };

  const { _id, name, ratings, price, stock, numofreviwe, images } =
    ProductDetail || {};
  //console.log(ProductDetail)
  return (
    <MainSingleProduct>
      {ProductDetail === {} ? (
        ""
      ) : (
        <ParentSingleDiv>
          <ImageDiv>
            <Arrow
              Side={"right"}
              onClick={() => Slideder({ Direction: "right" })}
            >
              {">"}
            </Arrow>
            <Arrow
              Side={"left"}
              onClick={() => Slideder({ Direction: "left" })}
            >
              {"<"}
            </Arrow>
            <ImageParent Slider={imageSlider}>
              {images &&
                images.map((img) => {
                  return (
                    <Image
                      key={img._id}
                      src={img.url}
                      alt="img"
                      width={"100%"}
                      height={"100%"}
                    />
                  );
                })}
            </ImageParent>
          </ImageDiv>
          <ProductDetailsDiv>
            <ProductDetails>
              <ProductNameDiv>
                <ProductName> {name}</ProductName>
                <ProductId>Product ID{_id} </ProductId>
              </ProductNameDiv>
              <ProductReviwe>
                <StarRatings
                  rating={ratings}
                  starRatedColor="green"
                  numberOfStars={5}
                  name="rating"
                  starDimension="1.4vmax"
                  starSpacing="0.1vmax"
                />
                <Numofreviwe>({numofreviwe})Reviews</Numofreviwe>
              </ProductReviwe>

              <Price>₹{price}</Price>
              <AddtocartAndquntity>
                <ParentQuntityButtonDiv>
                  <QuntityButton
                    onClick={() =>
                      SetQuantity((state) => (state <= 1 ? 1 : state - 1))
                    }
                  >
                    -
                  </QuntityButton>
                  <QuntityValue>{Quantity}</QuntityValue>
                  <QuntityButton
                    onClick={() =>
                      SetQuantity((state) => (state <= 4 ? state + 1 : state))
                    }
                  >
                    +
                  </QuntityButton>
                </ParentQuntityButtonDiv>
                <AddToCart
                  onClick={
                    stock > 0
                      ? () => AddtoCart(ProductDetail, Quantity, dispatch)
                      : () => alert.show("Product is Out of Stock")
                  }
                >
                  ADD TO CART
                </AddToCart>
              </AddtocartAndquntity>
              <StatusDiv>
                <StatusKey>Status :</StatusKey>
                <StatusValue>
                  {stock > 0 ? "InStock" : "OutofStock"}
                </StatusValue>
              </StatusDiv>
              <DescriptionDiv>
                <TitleDescription>Description</TitleDescription>
                <Description>this is good product</Description>
              </DescriptionDiv>
              <SubmitReviewButton onClick={ user ? () => SetSubmit((state) => !state) : ()=> alert.show("Please Login to submit Review") }>
                Submit Review
              </SubmitReviewButton>
              <SubmitReview
                Handlesopenclose={submit}
                SetSubmit={SetSubmit}
                Productid={_id}
              />
            </ProductDetails>
          </ProductDetailsDiv>
        </ParentSingleDiv>
      )}
    </MainSingleProduct>
  );
};

var SubmitReviewButton = styled.div`
  width: 12vmax;
  border-radius: 2vmax;
  padding: 0.6vmax 2vmax;

  background-color: #ff5757;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    background-color: #ff3636;
  }
  @media only screen and (max-width: 600px) {
    width: 16vmax;
    padding: 0.9vmax 3vmax;
  }
`;

var Description = styled.p`
  font-weight: 400;
  font-size: 1.3vmax;
  @media only screen and (max-width: 600px) {
    font-size: 1.5vmax;
  }
`;

var TitleDescription = styled.span`
  font-size: 1.5vmax;
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    font-size: 2vmax;
  }
`;

var DescriptionDiv = styled.div`
  @media only screen and (max-width: 600px) {
    padding: 4vmax;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

var StatusDiv = styled.div`
  display: flex;
  @media only screen and (max-width: 600px) {
    padding: 1.2vmax;
  }
`;

var StatusKey = styled.span`
  color: black;
  font-weight: 400;
`;

var StatusValue = styled.span`
  color: #ff5757;
  font-weight: 800;
`;

var AddToCart = styled.div`
  //border:1px solid black;
  border-radius: 2vmax;
  padding: 0.6vmax 1vmax;
  margin-left: 1vmax;
  background-color: #ff5757;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    background-color: #ff3636;
  }
  @media only screen and (max-width: 600px) {
    padding: 1vmax 5vmax;
  }
`;

var ParentQuntityButtonDiv = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    padding: 2vmax;
  }
`;

var QuntityButton = styled.button`
  width: 4vmax;
  height: 2vmax;
  cursor: pointer;
  background-color: #573939;
  color: white;
  border: none;
  font-size: 1.5vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 6vmax;
    height: 4vmax;
  }
`;

var QuntityValue = styled.div`
  width: 4vmax;
  height: 2vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 6vmax;
    height: 4vmax;
  }
`;

var AddtocartAndquntity = styled.div`
  display: flex;
  @media only screen and (max-width: 600px) {
    padding: 1vmax;
    flex-direction: column;
    align-items: center;
  }
`;

var Price = styled.span`
  font-size: 2vmax;
  font-weight: 400;
  @media only screen and (max-width: 600px) {
    font-size: 4vmax;
    font-weight: 400;
    padding: 2vmax;
  }
`;

var Numofreviwe = styled.span`
  color: gray;
`;

var ProductReviwe = styled.div``;

var ImageParent = styled.div`
  height: 100%;
  display: flex;
  transition: all 300ms;
  transform: translateX(-${(prop) => prop.Slider * 100}%); ;
`;

var Arrow = styled.div`
  width: 2.5vmax;
  height: 2.5vmax;
  font-weight: 600;
  border-radius: 50%;
  background: gray;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  position: absolute;
  top: 50%;
  bottom: -50%;
  ${(prop) => (prop.Side === "left" ? "left:0%;" : "right:0%;")}
  z-index:5;
  opacity: 0.4;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  @media only screen and (max-width: 600px) {
    width: 3.5vmax;
    height: 3.5vmax;
  }
`;

var ImageDiv = styled.div`
  width: 40%;
  height: 30vmax;
  display: flex;
  overflow: hidden;
  // border:1px solid blue;
  position: relative;
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 60vmax;
  }
`;
var Image = styled.img`
  object-fit: contain;
`;

var ProductId = styled.span`
  font-size: 1vmax;
  font-weight: 500;
  color: gray;
  @media only screen and (max-width: 600px) {
    font-size: 1.3vmax;
  }
`;

var ProductNameDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    padding: 1vmax;
    align-items: center;
  }
`;

var ProductName = styled.span`
  font-size: 1.5vmax;
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    font-size: 3.5vmax;
  }
`;

var ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // border: 1px solid red;
  width: 90%;
  @media only screen and (max-width: 600px) {
    height: auto;
    padding: 3vmax;
    align-items: center;
  }
`;

var ProductDetailsDiv = styled.div`
  // border: 1px solid black;
  width: 60%;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

var ParentSingleDiv = styled.div`
  width: 55vw;
  height: auto;
  //border: 1px solid red;
  display: flex;
  margin-top: 4vmax;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: auto;
    margin-top: 4vmax;
  }
`;

var MainSingleProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding: 2vmax 0vmax;
`;

export default SingleProductComp;
