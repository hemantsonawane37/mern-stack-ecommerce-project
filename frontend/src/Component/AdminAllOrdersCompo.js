import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import { Delete, Edit } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { actions } from "../store";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import {
  DeleteOrder,
  GetAllOrders,
} from "../APICallFun/ApiFun";


const AdminAllOrdersCompo = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const alert = useAlert();
  const Rows = [];
  const orders = useSelector((state) => state.Products.AllOrders.orders);

  useEffect(() => {
    if (!orders) {
      GetAllOrders(alert, dispatch, actions);
    }
    
  }, [alert, dispatch, orders]);

  orders &&
    orders.forEach((order) => {
      Rows.push({
        id: order._id,
        status: order.orderstatus,
        quantity: order.orderitems.length,
        amount: order.totalprice,
      });
    });

  const columns = [
    { field: "id", headerName: "ID", width: matches ? 125 : 250 },
    {
      field: "status",
      headerName: "status",
      width: matches ? 100 : 250,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "quantity",
      width: matches ? 30 : 100,
      editable: false,
    },
    {
      field: "amount",
      headerName: "amount",
      width: matches ? 50 : 250,
      editable: false,
    },
    {
      field: "action",
      headerName: "action",
      width: 90,
      editable: false,
      renderCell: (cellValues) => {
        return (
          <>
            <Link to={`/admin/order/${cellValues.row.id}`}>
              <Edit style={{ fontSize: "1.5vmax" }} />
            </Link>
            <DeleteProduct
              onClick={() =>
                DeleteOrder(cellValues.row.id, alert, dispatch, actions)
              }
            >
              <Delete />
            </DeleteProduct>
          </>
        );
      },
    },
  ];

  return (
    <>
      <MainParentDiv>
        <HeadingDiv>
          <Heading>All Orders</Heading>
        </HeadingDiv>
        <ProductsParentDiv>
          <DataGrid
            rows={Rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
            disableSelectionOnClick={true}
            sx={
              matches
                ? {
                    fontSize: "1.2vmax",
                    fontWeight: "400",
                    textDecoration: "none",
                  }
                : { fontSize: "1vmax", textDecoration: "none" }
            }
          />
        </ProductsParentDiv>
      </MainParentDiv>
    </>
  );
};

var HeadingDiv = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
var Heading = styled.h1`
  font-weight: 400;

  @media only screen and (max-width: 600px) {
    font-size: 3vmax;
  }
`;

var DeleteProduct = styled.div`
  margin: 0vmax 1vmax;
  color: #7b7b7b;
  &:hover {
    cursor: pointer;
  }
`;

var ProductsParentDiv = styled.div`
  width: 90%;
  height: 80%;
  margin: auto;
  @media only screen and (max-width: 600px) {
    width: 100%;

    height: 100vh;
  }
`;

var MainParentDiv = styled.div`
  width: 80vw;
  border-left: 1px solid lightgray;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

export default AdminAllOrdersCompo;
