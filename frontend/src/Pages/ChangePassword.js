import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../Component/NavBar";
import {ResetPassword} from '../APICallFun/ApiFun';
import { useDispatch,useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const ChangePassword = () => {
  const [Password,SetPassword] = useState({password:"",confirmpassword:""});
  const dispatch = useDispatch();
  const alert = useAlert();
  const isAuthenticeted = useSelector((state) => state.Products.User.success);
  const Token = useParams().token;
  const navigate = useNavigate();
  useEffect(()=> {
  if(isAuthenticeted){
    return navigate("/")
  }
  },[dispatch,isAuthenticeted,navigate])

  return (
    <>
      <NavBar />
      <MainDiv>
        <ParentDiv>
          <HeaderDiv>
            <HeaderName>New password</HeaderName>
          </HeaderDiv>
          <InputParentDiv>
            <NewPasswordInputDiv>
              <NewPasswordInput
                type={"password"}
                placeholder={" New Password"}
                value={Password.password}
                onChange={(e)=>SetPassword({...Password,password:e.target.value})}
              ></NewPasswordInput>
            </NewPasswordInputDiv>
            <NewPasswordInputDiv>
              <NewPasswordInput
                type={"password"}
                placeholder={"confirm password"}
                value={Password.confirmpassword}
                onChange={(e)=>SetPassword({...Password,confirmpassword:e.target.value})}
              ></NewPasswordInput>
            </NewPasswordInputDiv>
            <NewPasswordInputButton onClick={()=> ResetPassword(dispatch,Password,Token,alert)}>Submit</NewPasswordInputButton>
          </InputParentDiv>
        </ParentDiv>
      </MainDiv>
    </>
  );
};

var NewPasswordInputButton = styled.div`
  width: 80%;
  height: 2.2vmax;
  background: #ff3636;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1vmax;
  border-radius: 1vmax;
  margin-top: 1vmax;
  &:hover {
    background-color: #ff2222;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {

    height: 3vmax;

  }
`;

var NewPasswordInput = styled.input`
  width: 100%;
  height: 100%;
  outline-style: none;
  border: none;
  padding: 0vmax 1vmax;
  font-size: 1vmax;
  //border:1px solid red ;
`;

var NewPasswordInputDiv = styled.div`
  //border:1px solid red ;
  width: 80%;
  height: 6vh;
  display: flex;
  justify-content: center;
  margin: 1vmax 0vmax;
  @media only screen and (max-width: 600px) {
    height: 4vh;

  }
`;
var InputParentDiv = styled.div`
  height: 34vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e6deff;
`;

var HeaderName = styled.span`
  font-weight: 500;
  color: #ff3636;
`;

var HeaderDiv = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

var ParentDiv = styled.div`
  width: 25vw;
  height: 40vh;
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
  background: #ddffca;
  display: flex;
  justify-content: center;
`;

export default ChangePassword;
