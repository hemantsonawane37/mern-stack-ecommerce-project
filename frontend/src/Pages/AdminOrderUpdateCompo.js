import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { UpdateOrderStatus } from "../APICallFun/ApiFun";

const AdminOrderUpdateCompo = () => {
  const [stateStatus, setStatus] = useState("");
  const Orderstatus = useSelector(
    (state) => state.Products.SingleOrder?.orderstatus
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();


  const HandleonChange = (e) => {
     setStatus(e.target?.value)
  }

  return (
    <>
      <MainParentDiv>
        <OrderUpdateParentDiv>
          <OrderUpdateHeaderDiv>
            <OrderUpdateHeaderText>Order Update</OrderUpdateHeaderText>
          </OrderUpdateHeaderDiv>
          <UpdateStatusParentdiv>
            <FormControl
              sx={{ width: "90%", margin: "2vmax 0vmax" }}
              size="small"
            >
              <InputLabel style={{ color: "gray" }} id="demo-simple-select">
                Select Status
              </InputLabel>
              <Select
                labelId="-status-label"
                value={stateStatus}
                onChange={(e) => HandleonChange(e)}
                required={true}
              >
              {Orderstatus !== "Shipped" && Orderstatus !== "Deliverd" && <MenuItem value={"Shipped"}>Shipped</MenuItem>}  
              <MenuItem value={"Deliverd"}>Deliverd</MenuItem>  
              </Select>
            </FormControl>
          </UpdateStatusParentdiv>
          <ProcessButton
            onClick={() => UpdateOrderStatus(id, stateStatus, dispatch, alert)}
            disabled={ Orderstatus === "Deliverd" ? true : false}
          >
            Process
          </ProcessButton>
        </OrderUpdateParentDiv>
      </MainParentDiv>
    </>
  );
};

var UpdateStatusParentdiv = styled.div`
width:100%;
4.5vmax;
display:flex;
justify-content:center;
align-items:center;
`;

var ProcessButton = styled.button`
  width: 100%;
  height: 3.5vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  background: green;
  color: white;
  border-radius: 1.1vmax;
  border:none;
  font-size:1.3vmax;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 600px) {
    margin: 4vmax 0vmax;
    height: 4.5vmax;
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
  width: 80%;
  //border: 1px solid red;
  margin: 1vmax auto;
`;

var MainParentDiv = styled.div`
  width: 30vw;
  border-left: 1px solid gray;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

export default AdminOrderUpdateCompo;
