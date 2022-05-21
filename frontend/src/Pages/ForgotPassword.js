import React,{useState } from "react";
import styled from "styled-components";
import NavBar from "../Component/NavBar";
import { ForgotPasswordFun } from "../APICallFun/ApiFun";
import { useAlert } from "react-alert";
import MetaData from '../Component/Metadata/MetaData';


const ForgotPassword = () => {
    const [Email,SetEmail] = useState("");
 
    const alert = useAlert();


  return (
    <>
    <MetaData title={"Forgot Password"}/>
      <NavBar />
      <MainDiv>
        <ParentDiv>
            <HeaderDiv>
                <HeaderName>Forgot Password</HeaderName>
            </HeaderDiv>
            <InputParentDiv>
            <TextDiv>
            <P>You will get link on Your @gmail.com address to Change your Password </P>
            </TextDiv>
            <ForgotPasswordInputDiv>
                <ForgotPasswordInput type={"email"} value={Email} onChange={(e)=> SetEmail(e.target.value)} placeholder={"@Email.com"} ></ForgotPasswordInput>
                <ForgotPasswordInputButton onClick={()=> ForgotPasswordFun(Email,alert)}>Submit</ForgotPasswordInputButton>
            </ForgotPasswordInputDiv>
            </InputParentDiv>
        </ParentDiv>
      </MainDiv>
    </>
  );
};

var TextDiv = styled.div`
width:90%;
margin-bottom:1.2vmax;
@media only screen and (max-width: 600px) {
  margin-bottom:2vmax;
width:70%;


}
`;

var P = styled.p`
font-size:1vmax;
font-weight:400;
`;

var ForgotPasswordInputButton = styled.div`
width:25%;
height:100%;
background:#ff3636;
display:flex;
justify-content:center;
align-items: center;
color:white;
font-size:1vmax;
&:hover {
    background-color: #ff2222;
    cursor:pointer;
  }
`;

var ForgotPasswordInput = styled.input`
width:75%;
height:100%;
outline-style:none;
border:none;
padding:0vmax 1vmax;
font-size:1vmax;
`;

var ForgotPasswordInputDiv = styled.div`
//border:1px solid red ;
width:90%;
height:6vh;
display:flex;
@media only screen and (max-width: 600px) {
  height:4vh;
  width:70%;


}
`;

var InputParentDiv = styled.div`
height:30vh;
width:100%;

display:flex;
flex-direction:column;
justify-content:center;
align-items: center;
background-color: #e6deff;
`;

var HeaderName = styled.span`
font-weight:500;
color:#ff3636;
`;

var HeaderDiv = styled.div`
width:100%;
height:6vh;
display:flex;
justify-content:center;
align-items: center;

`;

var ParentDiv = styled.div`
  width: 25vw;
  height: 36vh;
  background: white;
  border-radius: 1vmax;
  margin-top: 5vmax;
  @media only screen and (max-width: 600px) {
    width: 80vw;

  }
`;

var MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background:#ddffca;
  display: flex;
  justify-content: center;
`;

export default ForgotPassword;
