import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ShoppingCart,
  Search,
  Menu,
  Close,
  AccountCircle,
} from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GetProducts } from "../APICallFun/ApiFun";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
import { Badge } from "@mui/material";
import { Debouncing } from "../functions/debouncing";

const MainDiv = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 6;
  width: 100vw;
  height: 10vh;
  background-color: #e6deff;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    height: 8vh;
  }
`;

const LeftSection = styled.div`
  flex: 0.5;
  height: 10vh;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    height: 8vh;
  }
`;
const CenterSection = styled.div`
  flex: 0.7;
  height: 10vh;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const RightSection = styled.div`
  flex: 0.5;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media only screen and (max-width: 600px) {
    height: 8vh;
  }
`;
const H1 = styled.h1`
  color: #ff3636;
  margin-left: 1.2vmax;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    font-size: 2vmax;
  }
`;
const SearchCountener = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  height: 6vh;
  flex: 5;
  border: none;
  outline: none;
  padding: 0px 6px;
  font-size: 1.3vmax;
`;

const SearchButton = styled.button`
  flex: 1;
  height: 6vh;
  border: none;
  cursor: pointer;
  background-color: #ff5757;
  color: white;
  padding: 0vmax 1.5vmax;
  &:hover {
    background-color: #ff3636;
  }
  font-size: 1.1vmax;
`;

const CartDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Span = styled.span`
  font-size: 1.2vmax;
  margin-right: 0.5vmax;
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const MyOrder = styled.div`
  font-size: 1.2vmax;
  text-align: center;

  font-weight: 500;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const SignInOut = styled.div`
  font-size: 1.2vmax;
  margin-right: 0.5vmax;
  font-weight: 500;

  cursor: pointer;
`;

const MobileSearch = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;
const MenuDiv = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const SideMenuDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 70vw;
  height: 100vh;
  background-color: white;
  z-index: 7;
  transition: all 300ms;
  overflow: hidden;

  ${(Props) =>
    Props.slide === true
      ? "transform: translate(0%);"
      : "transform: translate(-100%);"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CloseSignDiv = styled.div`
  width: 100%;
  height: 6vmax;

  display: flex;
  align-items: center;
  justify-content: right;
`;

const LogOut = styled.div`
  font-size: 1.2vmax;
  text-align: center;

  font-weight: 500;
  cursor: pointer;
`;

const NavBar = () => {
  const [MenuCondition, SetMenuCondition] = useState(false);
  const [visibleMobileNavBar, SetvisibleMobileNavBar] = useState(false);
  const dispatch = useDispatch();
  const histroy = useNavigate();
  const SearchRouteInput = useLocation()
    .search.trim()
    .slice(9)
    .replace(/%20/g, " ");
  const [SearchValue, SetSearchValue] = useState(SearchRouteInput);

  const CartLenght = useSelector((state) => state.Products.CarLength);

  function LogOutFun() {
    localStorage.removeItem("user");
    dispatch(actions.removeUser());
    histroy("/signinout");
  }

  useEffect(() => {
    async function fn() {
      GetProducts(SearchValue, dispatch, actions);
    }
    dispatch(actions.initializeLoading(true));
    Debouncing(fn, 2000);
  }, [dispatch, SearchValue]);

  useEffect(() => {
    dispatch(
      actions.initializeCartLength(
        JSON.parse(localStorage.getItem("cart")) !== null
          ? JSON.parse(localStorage.getItem("cart")).length
          : 0
      )
    );
    dispatch(
      actions.initializeUser(
        JSON.parse(localStorage.getItem("user")) !== null
          ? JSON.parse(localStorage.getItem("user"))
          : {}
      )
    );
  }, [dispatch]);

  let isAuthenticated = JSON.parse(localStorage.getItem("user"));

  const Submit = async () => {
    GetProducts(SearchValue, dispatch, actions);
    histroy(`/search?keyword=${SearchValue}`);
  };

  const SearchHandle = (e) => {
    SetSearchValue(e.target.value);
  };
  const MenuConditionFun = () => {
    SetMenuCondition((current) => !current);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      Submit();
    }
  };

  return (
    <>
      <SideMenuDiv slide={MenuCondition}>
        <CloseSignDiv>
          {" "}
          <Close
            style={{ margin: "1.3vmax", transform: "scale(1.1)" }}
            onClick={() => MenuConditionFun()}
          />
        </CloseSignDiv>
        <MyParentDiv>
          <Link to={"/myorder"} style={{ textDecoration: "none" }}>
            <MyChildtDiv>My Orders</MyChildtDiv>
          </Link>
        </MyParentDiv>
        <MyParentDiv>
          <Link to={"/profile"} style={{ textDecoration: "none" }}>
            <MyChildtDiv>My Profile</MyChildtDiv>
          </Link>
        </MyParentDiv>
      </SideMenuDiv>
      <MainDiv>
        <LeftSection>
          <MenuDiv>
            <Menu
              style={{ transform: "scale(2)", marginRight: "1.2vmax" }}
              onClick={() => MenuConditionFun()}
            />
          </MenuDiv>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <H1>ECOMMERCE.</H1>
          </Link>{" "}
          <MyProfileParent>
            <AccountCircle style={{ color: "red" }} />
            <Link
              to={"/profile"}
              style={{ textDecoration: "none", Margin: "auto" }}
            >
              {" "}
              <MyProfile> Profile</MyProfile>{" "}
            </Link>
          </MyProfileParent>
        </LeftSection>
        <CenterSection>
          <SearchCountener>
            <SearchInput
              type={"search"}
              value={SearchValue}
              onChange={SearchHandle}
              onKeyDown={onEnter}
              placeholder={"Search Here..."}
            ></SearchInput>

            <SearchButton onClick={() => Submit()}>Search</SearchButton>
          </SearchCountener>
        </CenterSection>
        <RightSection>
          <MobileSearch>
            <Search
              onClick={() => SetvisibleMobileNavBar((state) => !state)}
              style={{ transform: "scale(1.1)" }}
            />
          </MobileSearch>

          <Link to={"/cart"} style={{ color: "black", textDecoration: "none" }}>
            {" "}
            <CartDiv>
              <Span>Cart</Span>
              <Badge badgeContent={CartLenght} color="success">
                <ShoppingCart style={{ transform: "scale(1.1)" }} />
              </Badge>
            </CartDiv>
          </Link>
          <Link
            to={"/myorder"}
            style={{ color: "black", textDecoration: "none" }}
          >
            <MyOrder>
              My <br /> Orders
            </MyOrder>
          </Link>
          {isAuthenticated?.success ? (
            <Link
              to={"/signinout"}
              style={{ color: "black", textDecoration: "none" }}
            >
              {" "}
              <LogOut onClick={() => LogOutFun()}>Logout</LogOut>
            </Link>
          ) : (
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to={"/signinout"}
            >
              <SignInOut>
                SignIn /<br />
                SignOut
              </SignInOut>
            </Link>
          )}
        </RightSection>
      </MainDiv>
      <MobileNavBarParentDiv visible={visibleMobileNavBar}>
        <MobileSearchDiv>
          <MobileSearchInput
            type={"text"}
            value={SearchValue}
            onChange={SearchHandle}
            onKeyDown={onEnter}
            placeholder={"Search Here"}
          ></MobileSearchInput>
          <MobileNavBarSearchButton onClick={() => Submit()}>
            <Search />
          </MobileNavBarSearchButton>
        </MobileSearchDiv>
      </MobileNavBarParentDiv>
    </>
  );
};

var MyProfileParent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
var MyProfile = styled.span`
  font-size: 1.2vmax;
  text-align: center;
  color: black;
  font-weight: 500;
  cursor: pointer;
`;

var MyParentDiv = styled.div`
  width: 90%;
  height: 4.6vmax;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1vmax auto;
  border-radius: 2.5vmax;
  margin-top: 1.5vmax;
`;
var MyChildtDiv = styled.span`
  font-size: 1.8vmax;
  color: #414141;
`;

var MobileSearchInput = styled.input`
  width: 80vw;
  height: 100%;
  border: none;
  padding: 0vmax 1.1vmax;
  outline-style: none;
  font-size: 1.8vmax;
`;

var MobileNavBarSearchButton = styled.div`
  width: 20vw;
  height: 100%;
  background: #ff3636;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

var MobileSearchDiv = styled.div`
  width: 80vw;
  height: 5vh;
  background: white;
  display: flex;
`;

var MobileNavBarParentDiv = styled.div`
  display: none;
  transition: all 350ms;

  @media only screen and (max-width: 600px) {
  
    z-index: 6;
    background-color: #e6deff;
    width: 100vw;
    ${(prop) => (prop.visible ? "opacity:1;  position: sticky; height: 7vh; " : "opacity:0;  position: static; height: 0vh;")}
    top: 0;
    left: 0;
    right: 0;
    display:flex;
    justify-content: center;
    align-items: center;
  }
`;

export default NavBar;
