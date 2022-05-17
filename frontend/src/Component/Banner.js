import React from "react";
import styled from "styled-components";
import { Mouse, TouchApp } from "@material-ui/icons";

const MainBannerDiv = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgb(2, 0, 34);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 34, 1) 0%,
    rgba(121, 9, 9, 1) 70%,
    rgba(158, 0, 0, 1) 100%
  );
`;
const H4 = styled.h4`
  color: white;
  font-weight: 500;
  margin: 2vmax;
`;
const H1 = styled.h1`
  color: white;
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    font-weight: 400;
    font-size: 3.5vmax;
  }
`;

const ScrollDownButton = styled.a`
  width: 7vmax;
  height: 3vmax;
  background-color: #e6deff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2vmax;
  font-weight: 500;
  text-decoration: none;
  color: #ff3636;
  border-radius: 2vmax;
  padding: 0.2vmax;
  @media only screen and (max-width: 600px) {
    width: 14vmax;
    height: 5vmax;
    border-radius: 4vmax;
    margin-top: 4vmax;
  }
`;

const ScrollDiv = styled.div`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const ScrollDivMobile = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const Banner = () => {
  return (
    <MainBannerDiv>
      <H4>Welcome to ECOMMERCE</H4>
      <H1>Find Amazing Products Below</H1>
      <ScrollDownButton href="#Products">
        Scroll{" "}
        <ScrollDiv>
          {" "}
          <Mouse />
        </ScrollDiv>{" "}
        <ScrollDivMobile>
          <TouchApp />
        </ScrollDivMobile>
      </ScrollDownButton>
    </MainBannerDiv>
  );
};

export default Banner;
