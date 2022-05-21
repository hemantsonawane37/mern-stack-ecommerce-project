import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";

const SinglePageReviews = () => {
  const [stateReviwes, setStateReviwes] = useState([]);
  const productReviwe = useSelector(
    (state) => state.Products.SingleProduct.product?.reviewes
  );
  
  useEffect(() => {
    setStateReviwes(productReviwe);
  }, [productReviwe]);


  return (
    <>
      <HeadingDiv>
        <Heading>Reviews</Heading>
      </HeadingDiv>
      <MainReviewContainer>
        {stateReviwes?.length ? (
          stateReviwes.map((review,i) => {
            return (
                <ParentReviewDiv key={review._id} >
                  <Img
                    src={review.avatar?.url}
                    alt="img"
                    width={"60vmax"}
                    height={"60vmax"}
                  />
                  <Name>{review.name}</Name>
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="green"
                    numberOfStars={5}
                    name="rating"
                    starDimension="1.4vmax"
                    starSpacing="0.1vmax"
                  />
                  <Review>
                  {review.comment}
                  </Review>
                </ParentReviewDiv>
          
            );
          })
        ) : (
          <>
            <NoReviewDiv>
              <NoRevie>NO Review Yet</NoRevie>
            </NoReviewDiv>
          </>
        )}
      </MainReviewContainer>
    </>
  );
};

var NoReviewDiv = styled.div`
  height: 5vmax;
  padding: 2vmax;
  width: 100vw;
  text-align: center;
`;
var NoRevie = styled.span`
  color: gray;
  font-weight: 500;
`;

var HeadingDiv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
var Heading = styled.span`
  font-weight: 500;
  font-size: 1.5vmax;
`;

var Review = styled.p`
  @media only screen and (max-width: 600px) {
    font-size: 1.3vmax;
  }
`;

var Name = styled.span``;

var Img = styled.img``;

var ParentReviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 20vmax;
  border: 1px solid lightgray;
  padding: 1vmax;
  margin: 1vmax 1vmax;
`;

var MainReviewContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 3vmax 0vmax;

  @media only screen and (max-width: 600px) {
  }
`;

export default SinglePageReviews;
