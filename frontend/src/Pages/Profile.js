import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MailOutline,
 
  FaceOutlined,
  AccountCircle,
} from "@material-ui/icons";
import NavBar from "../Component/NavBar";
import { EditUserProfile } from "../APICallFun/ApiFun";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Component/Metadata/MetaData";

const Profile = () => {
  const [Email, SetEmail] = useState("");
  const [Name, SetName] = useState("");
  const [stateImage, setImage] = useState([]);
  const [statePreImage, setPreImage] = useState("");
  const userdata = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
      if(userdata){
        SetName(userdata.user.name);
        SetEmail(userdata.user.email);
        setPreImage(userdata.user.avatar?.url);
      }

  },[]);
  

  const HandleImageUpload = (e) => {
    const Image = Array.from(e.target.files);

    setImage([]);
    setPreImage([]);

    const reader = new FileReader();
    reader.onload = function () {
      if (reader.readyState === 2) {
        setImage((old) => [...old, reader.result]);
        setPreImage((old) => [...old, reader.result]);

      }
    };
    reader.readAsDataURL(Image[0]);
  };

  const SubmitEdit = () => {
      const data = {name:Name,email:Email,avatar:stateImage}
    EditUserProfile(data,dispatch,alert)
  }

  return (
    <>
    <MetaData title={"Profile"}/>
<NavBar/>
      <MainDiv>
        <ProfileParent>
            <HeadingDiv>
                <Heading>Edit Profile</Heading>
            </HeadingDiv>
          <SignUp >
            <InputDiv>
              <FaceOutlined
                style={{ margin: "0px auto", fontSize: "1.6vmax" }}
              />{" "}
              <Input
                type={"text"}
                value={Name}
                onChange={(e) => SetName(e.target.value)}
                placeholder={"Name"}
              />
            </InputDiv>
            <InputDiv>
              <MailOutline
                style={{ margin: "0px auto", fontSize: "1.6vmax" }}
              />{" "}
              <Input
                type={"email"}
                placeholder={"Email"}
                value={Email}
                onChange={(e) => SetEmail(e.target.value)}
              />
            </InputDiv>
            <InputDiv>
              <AccountCircle
                style={{ margin: "auto auto auto 1vmax ", fontSize: "1.6vmax" }}
              />
              <FileInput
                type={"file"}
                multiple={false}
                name={"avatar"}
                accept={"image/png, image/jpeg,image/webp"}
                 onChange={(e) => HandleImageUpload(e)}
              ></FileInput>
            </InputDiv>
            <PreviweParentDiv visible={statePreImage}>
              <PreviweImage src={statePreImage} alt={"img"}/>
            </PreviweParentDiv>
            <LoginSignUpButtonDiv>
              <LoginSignUpButton  onClick={()=> SubmitEdit()} >Edit Profile</LoginSignUpButton>
            </LoginSignUpButtonDiv>
          </SignUp>
        </ProfileParent>
      </MainDiv>
    </>
  );
};

var HeadingDiv = styled.div`
width:100%;
height:3vmax;
display:flex;
justify-content:center;
align-items:center;
`;
var Heading = styled.h3`
font-weight:300;
`;


var PreviweImage = styled.img`
  height: 100%;
  width: 5.3vmax;
  flex-shrink: 0;
`;

var PreviweParentDiv = styled.div`
  width: 100%;
  height: 7vmax;
  //border: 1px solid red;
  display: flex;
  justify-content: center;
  ${(prop) => (prop.visible ? "display:flex;" : "display:none;")}
`;

var FileInput = styled.input`
  color: transparent;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }

  ::after {
    content: "Choose profile img";
    color: gray;
    display: inline-block;
    background: white;
    //border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 400;
    font-size: 1.1vmax;
    width: 75%;
    margin: 0px auto 1.2vmax auto;
    height: 2.5vmax;
    padding: 0vmax 0.5vmax;
    outline-style: none;
    font-weight: 400;
    font-size: 1vmax;

  @media only screen and (max-width: 600px) {
    font-size: 1.6vmax;


  }
  }
`;

var Input = styled.input`
  width: 75%;
  height: 3vmax;
  border: none;
  padding: 0vmax 0.5vmax;
  outline-style: none;
  font-weight: 400;
  font-size: 1vmax;
  @media only screen and (max-width: 600px) {
    font-size: 1.6vmax;


  }
`;

var InputDiv = styled.div`
  width: 18vw;
  height: 3vmax;
  border: 1px solid lightgray;
  margin: 0px auto;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 2.5vmax;
  @media only screen and (max-width: 600px) {
    margin-top: 4.5vmax;
    width: 60vw;
  height: 4.5vmax;

  }
`;

var LoginSignUpButton = styled.div`
  //border:1px solid black;
  width: 100%;
  font-size: 1.5vmax;
  height: 3vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff5757;
  color: white;

  &:hover {
    background: #ff3333;
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    height: 4vmax;
    margin:2vmax auto;
  }
`;

var LoginSignUpButtonDiv = styled.div`
  margin: 0px auto;
  width: 85%;
  height: 6vmax;
  //border:1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    margin:2vmax auto;
  }
  
`;

var SignUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:100%;

  @media only screen and (max-width: 600px) {
    width: 75vw;
  }
`;

var MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
var ProfileParent = styled.div`
  width: 30vw;
 
  @media only screen and (max-width: 600px) {
    width: 85vw;
    display:flex;
    flex-direction:column;
    align-items:center;
  }
`;

export default Profile;
