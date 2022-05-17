import React from "react";
import styled from "styled-components";
import { Error } from "@material-ui/icons";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <MainDiv>
        <Error style={{ color: "red", fontSize: "5vmax" }} />
      <P>Not Found</P>
     <Link style={{textDecoration:"none"}} to={"/"} ><HomeLink>Home</HomeLink></Link>
      </MainDiv>
    </>
  );
};

var P = styled.p`
font-size:2vmax;
`;

var HomeLink = styled.div`
width:4vmax;
height:1.6vmax;
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:1.2vmax;
  background:#0b1120;
  color:white;
  padding:0.6vmax  1vmax;
`;


var MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
  text-align:center;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default NotFound;
