import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

const ParentDiv = styled.div`
  width: 15vmax;
  height: 24vmax;
  margin: 2vmax 2vmax;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: all 300ms;
  color: #2b2b2b;

  &:hover {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 600px) {
    width: 27vmax;
    height: 41vmax;
    margin: 3vmax 1.5vmax;
    flex-shrink:1;
  }
`;
const Image = styled.img`
  flex: 1;
  object-fit: contain;
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0vmax 0.5vmax;
  height: auto;
  text-overflow: ellipsis;

  overflow-x: hidden;
  // overflow-y: hidden;
`;
const Name = styled.span`

width:100%;
max-height:2vmax;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

 
  @media only screen and (max-width: 600px) {
    font-size: 1.8vmax;
  }
`;
const Price = styled.span`
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    font-size: 1.8vmax;
  }
`;
const ReviewDiv = styled.div``;
const Span = styled.span`
  font-size: 1vmax;
  font-weight: 400;
  @media only screen and (max-width: 600px) {
    font-size: 1.2vmax;
  }
`;

const Product = ({ Data }) => {
  return (
    <Link to={`/product/${Data._id}`} style={{ textDecoration: "none" }}>
      <ParentDiv>
        {Data.images ? (
          <Image
            src={Data.images[0]?.url}
            alt="image"
            width={"100%"}
            height={"75%"}
          />
        ) : (
          <Image
            src={"/images/Black-T-Shirt.png"}
            alt="image"
            width={"100%"}
            height={"75%"}
          />
        )}

        <ProductDetails>
          <Name>{Data.name}</Name>
          <ReviewDiv>
            <StarRatings
              rating={Data.ratings}
              starRatedColor="green"
              numberOfStars={5}
              name="rating"
              starDimension="1.4vmax"
              starSpacing="0.1vmax"
            />
            <Span>({Data.numofreviwe})Reviews</Span>
          </ReviewDiv>
          <Price>₹{Data.price}</Price>
        </ProductDetails>
      </ParentDiv>
    </Link>
  );
};

export default Product;
