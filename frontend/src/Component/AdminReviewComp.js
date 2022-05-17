import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { GetProductReviews } from "../APICallFun/ApiFun";
import AdminProductReviwes from "./AdminProductReviwes";

const AdminReviewComp = () => {
  const [stateProductId, setProductId] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
 

  return (
    <>
      <MainParentDiv>
        <OrderUpdateParentDiv>
          <OrderUpdateHeaderDiv>
            <OrderUpdateHeaderText>Get Reviews</OrderUpdateHeaderText>
          </OrderUpdateHeaderDiv>
          <SearchInputParentdiv>
            <Input
              type={"text"}
              value={stateProductId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder={"Enter Product Id"}
            />
          </SearchInputParentdiv>
          <ProcessButton onClick={()=> GetProductReviews(stateProductId,dispatch,alert)}>
            Submit
          </ProcessButton>
        </OrderUpdateParentDiv>
        <AdminProductReviwes productId={stateProductId} />
      </MainParentDiv>
    </>
  );
};

var Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0vmax 2vmax;
  font-size: 1.3vmax;
  font-weight: 100;
`;

var SearchInputParentdiv = styled.div`
  width: 80%;
  height: 3vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  margin: 2vmax 0vmax;
`;

var ProcessButton = styled.button`
  width: 80%;
  height: 2.6vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  background: green;
  color: white;
  border-radius: 1.1vmax;
  border: none;
  font-size: 1.3vmax;
  font-weight: 100;

  &:hover {
    cursor: pointer;
  }
  @media (max-width: 600px) {
    margin: 4vmax 0vmax;
    height: 3.5vmax;
  }
`;

var OrderUpdateHeaderText = styled.h2`
  font-weight: 400;
  color: green;
`;

var OrderUpdateHeaderDiv = styled.div`
  width: 100%;
  height: 4.5vmax;
  display: flex;
  justify-content: center;
  align-items: center;
`;

var OrderUpdateParentDiv = styled.div`
  width: 50%;
  //border: 1px solid red;
  margin: 1vmax auto;
  display: flex;
  flex-direction: column;

  align-items: center;
`;

var MainParentDiv = styled.div`
  width: 100vw;
  border-left: 1px solid lightgray;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

export default AdminReviewComp;
