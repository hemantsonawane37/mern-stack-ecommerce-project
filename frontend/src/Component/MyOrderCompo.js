import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";
import { GetUsersOrder } from "../APICallFun/ApiFun";
import { useAlert } from "react-alert";
import { GetOrderDetails } from "../functions/cart";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from "react-router-dom";
import { LinkOutlined } from "@material-ui/icons";


const MyOrderCompo = () => {
  const [stateRows,setRows] = useState([]);
  const dispatch = useDispatch();
  const alert = useAlert();
  const UserOrders = useSelector((state)=> state.Products.myOrder);
  const matches = useMediaQuery('(max-width:600px)');
  

  useEffect(() => {
    GetUsersOrder(dispatch, actions, alert);
    setRows(GetOrderDetails(UserOrders))
  }, [dispatch,alert,UserOrders]);
  

  const columns = [
    { field: "id", headerName: "ID",  width: matches ? 125 : 250 },
    {
      field: "status",
      headerName: "status",
      width:matches ? 100 : 250,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "quantity",
      width:matches ? 30 : 250,
      editable: false,
    },
    {
      field: "price",
      headerName: "price",
      width:matches ? 50 : 250,
      editable: false,
    },
    {
      field: "action",
      headerName: "action",
      width:90,
      editable: false,
      renderCell: (cellValues) => {
        return <Link to={`${cellValues.row.action}`}><LinkOutlined style={{fontSize:"1.5vmax"}}/></Link>;
      }
    },
  ];

  return (
    <MainParentDiv>
      <OrderParentDiv>
        <DataGrid
          rows={stateRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableSelectionOnClick={true}
           sx={matches ? {fontSize:"1.2vmax",fontWeight:"400",textDecoration:"none"}:{fontSize:"1vmax",textDecoration:"none"}}
        />
      </OrderParentDiv>
    </MainParentDiv>
  );
};

var OrderParentDiv = styled.div`
  width: 80%;
  height: 80%;
  margin-top: 2vmax;
`;

var MainParentDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export default MyOrderCompo;
