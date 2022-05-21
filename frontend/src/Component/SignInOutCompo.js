import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  MailOutline,
  LockOutlined,
  FaceOutlined,
  AccountCircle,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { UserLogin, UserSignUp } from "../APICallFun/ApiFun";
import { useAlert } from "react-alert";
import { useNavigate, Link } from "react-router-dom";

const SignInOutCompo = () => {
  const [State, SetState] = useState("Login");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Name, SetName] = useState("");
  const [stateImage, setImage] = useState([]);
  const [statePreImage, setPreImage] = useState([]);

  const isAdminAuthenticated = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate("/");
    }
  }, [isAdminAuthenticated, navigate]);

  function GETLoginUser() {
    if (!Email) {
      return alert.error("Please enter email !");
    } else if (!Password) {
      return alert.error("Please enter Password !");
    }
    const data = { email: Email, password: Password };
    UserLogin(data, dispatch, alert, navigate);
  }
  function RegisterUser() {
    if (!Name) {
      return alert.error("Please enter Name !");
    } else if (!Email) {
      return alert.error("Please enter Email !");
    } else if (!Password) {
      return alert.error("Please enter Your Password !");
    }
    const data = {
      email: Email,
      password: Password,
      name: Name,
      avatar: stateImage[0] ? stateImage : null,
    };
    UserSignUp(data, dispatch, navigate, alert);
  }

  function RemoverPrevInput() {
    SetEmail("");
    SetPassword("");
  }

  const HandleImageUpload = (e) => {
    const Image = Array.from(e.target.files);

    setImage([]);
    setPreImage([])
    const reader = new FileReader();
    reader.onload = function () {
      if (reader.readyState === 2) {
        setImage((old) => [...old, reader.result]);
        setPreImage((old) => [...old, reader.result]);

      }
    };
    reader.readAsDataURL(Image[0]);
  };

  return (
    <MainAuthDiv>
      <SigninoutParentDiv>
        <HeadingParentDiv>
          <HeadingText
            onClick={() => {
              SetState((state) => (state = "Login"));
              RemoverPrevInput();
            }}
          >
            Sign In
          </HeadingText>
          <HeadingText
            onClick={() => {
              SetState((state) => (state = "SignUp"));
              RemoverPrevInput();
            }}
          >
            Sign Up
          </HeadingText>
        </HeadingParentDiv>
        <Line Condition={State}></Line>
        <div style={{ display: "flex" }}>
          <SignInInputParentDiv Condition={State}>
            <InputDiv>
              <MailOutline
                style={{ margin: "0px auto", fontSize: "1.6vmax" }}
              />{" "}
              <Input
                type={"email"}
                name={"email"}
                value={Email}
                placeholder={"Email"}
                onChange={(e) => SetEmail(e.target.value)}
              />
            </InputDiv>
            <InputDiv>
              <LockOutlined
                style={{ margin: "0px auto", fontSize: "1.6vmax" }}
              />{" "}
              <Input
                type={"password"}
                value={Password}
                onChange={(e) => SetPassword(e.target.value)}
                placeholder={"Password"}
              />
            </InputDiv>

            <ForgotPasswordLinkDiv>
              <Link to={"/forgotpassword"} style={{ textDecoration: "none" }}>
                {" "}
                <ForgotPasswordLink>Forgot Password</ForgotPasswordLink>
              </Link>
            </ForgotPasswordLinkDiv>
            <LoginSignUpButtonDiv>
              <LoginSignUpButton onClick={() => GETLoginUser()}>
                Login
              </LoginSignUpButton>
            </LoginSignUpButtonDiv>
          </SignInInputParentDiv>
          <SignUp Condition={State}>
            <InputDiv>
              <FaceOutlined
                style={{ margin: "0px auto", fontSize: "1.6vmax" }}
              />{" "}
              <Input
                type={"text"}
                value={Name}
                onChange={(e) => SetName(e.target.value)}
                placeholder={"Name*"}
              />
            </InputDiv>
            <InputDiv>
              <MailOutline
                style={{ margin: "0px auto", fontSize: "1.6vmax" }}
              />{" "}
              <Input
                type={"email"}
                placeholder={"Email*"}
                value={Email}
                onChange={(e) => SetEmail(e.target.value)}
              />
            </InputDiv>
            <InputDiv>
              <LockOutlined
                style={{ margin: "0px auto", fontSize: "1.6vmax" }}
              />{" "}
              <Input
                type={"password"}
                placeholder={"Password"}
                value={Password}
                onChange={(e) => SetPassword(e.target.value)}
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
              {statePreImage &&
                statePreImage.map((img, I) => {
                  return <PreviweImage src={img} key={I} />;
                })}
            </PreviweParentDiv>
            <LoginSignUpButtonDiv>
              <LoginSignUpButton onClick={() => RegisterUser()}>
                Sign Up
              </LoginSignUpButton>
            </LoginSignUpButtonDiv>
          </SignUp>
        </div>
      </SigninoutParentDiv>
    </MainAuthDiv>
  );
};

var PreviweImage = styled.img`
  height: 100%;
  width: 7vmax;
  flex-shrink: 0;
  margin:auto;
  object-fit: contain;
`;

var PreviweParentDiv = styled.div`
  width: 100%;
  height: 7vmax;
  //border: 1px solid red;
  display: flex;
  
  ${(prop) => (prop.visible.length ? "display:flex;" : "display:none;")}
  
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
  
      font-size: 1.5vmax;

    }
  }
`;

var SignUp = styled.div`
  flex-shrink: 0;
  transition: 300ms;
  width: 22vw;
  //height:calc(72vh - 4vmax);
  //border:1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(Prop) =>
    Prop.Condition === "Login"
      ? "transform: translateX(0%);"
      : " transform: translateX(-100%);"}

      @media only screen and (max-width: 600px) {
        width: 85vw;
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
  font-size:2vmax;
    height: 5vmax;
     
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
    margin: 1vmax auto;
    font-size:2vmax;
  height: 7vmax;
   
 
  }
`;

var ForgotPasswordLink = styled.span`
  color: blue;
  font-size: 1.1vmax;
  &:hover {
    cursor: pointer;
  }
`;

var ForgotPasswordLinkDiv = styled.div`
  width: 90%;
  height: 4vmax;
  //border:1px solid black;
  display: flex;
  justify-content: end;
  align-items: center;
  //margin-top:2vmax;
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
    font-size: 1.7vmax;

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
    margin-top: 5vmax;
    width: 80%;
  height: 5vmax;

  }
`;

var SignInInputParentDiv = styled.div`
  width: 22vw;
  //height:calc(72vh - 4vmax);
  //border:1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  transition: 300ms;
  ${(Prop) =>
    Prop.Condition === "Login"
      ? "transform: translateX(0%);"
      : " transform: translateX(-100%);"}

  @media only screen and (max-width: 600px) {
    width: 85vw;
  }
`;

var Line = styled.div`
  width: 50%;
  height: 2.5px;
  background: red;
  transition: 300ms;
  ${(Prop) =>
    Prop.Condition === "Login"
      ? "transform: translateX(0%);"
      : " transform: translateX(100%);"}
`;

var HeadingText = styled.span`
  font-weight: 400;
  font-size: 1.3vmax;
  &:hover {
    cursor: pointer;
    color: red;
  }
  @media only screen and (max-width: 600px) {

    font-size: 1.8vmax;

  }
`;

var HeadingParentDiv = styled.div`
  width: 100%;
  height: 4vmax;
  //border:1px solid black ;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 600px) {
    height: 5vmax;
  }
`;

var SigninoutParentDiv = styled.div`
  width: 22vw;
  height: auto;
  background: white;
  overflow: hidden;
  margin-bottom:2vmax;
  margin-top:2vmax;

  @media only screen and (max-width: 600px) {
    width: 85vw;
    height: 70vh;
  }
`;

var MainAuthDiv = styled.div`
  width: 100vw;
  height: auto;
  background: #ffebeb;
  display: flex;
  justify-content: center;
  align-items: center; ;
`;

export default SignInOutCompo;
