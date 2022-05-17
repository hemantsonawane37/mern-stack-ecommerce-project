import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ShortText,
  Money,

  AccountCircle,
} from "@material-ui/icons";

import DeshboardSideBar from "../Component/DeshboardSideBar";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetUser, UpdateUser } from "../APICallFun/ApiFun";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


const AdminUpdateUser = () => {
  const [stateName, setName] = useState("");
  const [stateEmail, setEmail] = useState("");
  const [stateRole, setRole] = useState("");
  const user = useSelector((state) => state.Products.AdminUser);
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
      if (JSON.stringify(user) === JSON.stringify({})) {
      AdminGetUser(id, dispatch, alert);
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
   
  }, [id, user, dispatch, alert]);

  const HandleSubmit = (e) => {
    e.preventDefault() 
    const data ={
        name:stateName,
        email:stateEmail,
        role:stateRole
    }
    UpdateUser(id,navigate,dispatch,data,alert)
  }

  return (
    <>
      <Main>
        <DeshboardSideBar />
        <MainParentDiv>
          <CreateProFormDiv>
            <HeadingDiv>
              <Heading>Update User</Heading>
            </HeadingDiv>
            <Form onSubmit={(e)=> HandleSubmit(e)} >
              <InputDiv>
                <IconDiv>
                  <ShortText />
                </IconDiv>
                <Input
                  type={"text"}
                  value={stateName}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={"Name"}
                  required={true}
                />
              </InputDiv>
              <InputDiv>
                <IconDiv>
                  <Money />
                </IconDiv>
                <Input
                  type={"email"}
                  value={stateEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"email"}
                  required={true}
                />
              </InputDiv>

              <InputDiv>
                <IconDiv>
                  <AccountCircle />
                </IconDiv>
                <FormControl
                  sx={{ minWidth: "80%", minHeight: "100%" }}
                  size="small"
                >
                  <InputLabel id="demo-multiple-name-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={stateRole}
                    onChange={(e) => setRole(e.target.value)}
                    required={true}
                  >
                    {user.role === "admin" ? (
                      <MenuItem value={"user"}>user</MenuItem>
                    ) : (
                      <MenuItem value={"admin"}>admin</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </InputDiv>

              <Button type={"submit"}  >Submit</Button>
            </Form>
          </CreateProFormDiv>
        </MainParentDiv>
      </Main>
    </>
  );
};

var Main = styled.div`
  display: flex;
`;

var Button = styled.button`
  width: 70%;
  height: 3vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2vmax auto;
  background: green;
  color: white;
  border: none;
  font-size: 1.2vmax;

  &:hover {
    cursor: pointer;
    background: darkgreen;
  }
  @media only screen and (max-width: 600px) {
    height: 5vmax;
    font-size: 1.5vmax;
  }
`;

var HeadingDiv = styled.div`
  width: 100%;
  height: 4vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1vmax;
`;

var Heading = styled.h2`
  font-weight: 400;
  color: green;
`;

var IconDiv = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

var InputDiv = styled.div`
  width: 70%;
  height: 3vmax;
  display: flex;
  align-items: center;
  margin: 2vmax auto;
  border: 1px solid lightgray;
  color: gray;
  @media only screen and (max-width: 600px) {
    height: 5vmax;
  }
`;



var Input = styled.input`
  width: 80%;
  height: 100%;
  border: none;
  outline-style: none;
  padding: 0vmax 1vmax;
`;

var Form = styled.form``;

var CreateProFormDiv = styled.div`
  width: 30vw;
  border: 1px solid lightgray;
  margin: 6vmax 0vmax;
  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
`;

var MainParentDiv = styled.div`
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid gray;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

export default AdminUpdateUser;
