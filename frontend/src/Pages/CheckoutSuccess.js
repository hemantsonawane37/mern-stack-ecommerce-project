import { CheckCircle } from "@material-ui/icons";
import React, { useEffect } from "react";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../store";

const CheckoutSuccess = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initializeOrder([]));
  }, [dispatch]);

  return (
    <MainParentDiv>
      <SuccessDiv>
        <CheckCircle
          style={
            matches
              ? { fontSize: "5vmax", color: "green" }
              : { fontSize: "4vmax", color: "green" }
          }
        />
        <Text>Your Order has been placed sucessfully</Text>
        <Link to="/myorder" style={{ textDecoration: "none" }}>
          {" "}
          <ViewOrderButton>view order</ViewOrderButton>
        </Link>
      </SuccessDiv>
    </MainParentDiv>
  );
};

var ViewOrderButton = styled.span`
  padding: 0.9vmax;
  background: #110f24;
  color: white;

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {
    margin-top: 2vmax;
    padding: 1.3vmax;
  }
`;

var Text = styled.p`
  font-size: 1.5vmax;
  margin-bottom: 2vmax;
  @media only screen and (max-width: 600px) {
    font-size: 2.4vmax;
  }
`;

var SuccessDiv = styled.div`
  width: 30vw;
  height: 50vh;
  //border:1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media only screen and (max-width: 600px) {
    width: 90vw;
    height: 80vh;
  }
`;

var MainParentDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CheckoutSuccess;
