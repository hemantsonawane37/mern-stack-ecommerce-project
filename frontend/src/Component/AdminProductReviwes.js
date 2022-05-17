import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Delete} from "@material-ui/icons";
import { useSelector } from "react-redux";

import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { DeleteReview } from "../APICallFun/ApiFun";

const AdminProductReviwes = ({productId}) => {
  const matches = useMediaQuery("(max-width:600px)");
  const reviews = useSelector((state) => state.Products.Reviwes);
  const Rows = [];
  const alert = useAlert();
  const dispatch = useDispatch();

  reviews.forEach((review, i) => {
    Rows.push({
      id: review._id,
      name: review.name,
      comment: review.comment,
      rating: review.rating,
    });
  });

  const columns = [
    { field: "id", headerName: "ID", width: matches ? 125 : 250 },
    {
      field: "name",
      headerName: "name",
      width: matches ? 50 : 250,
      editable: false,
    },
    {
      field: "comment",
      headerName: "comment",
      width: matches ? 100 : 250,
      editable: false,
    },
    {
      field: "rating",
      headerName: "rating",
      width: matches ? 30 : 100,
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
            <DeleteProduct onClick={()=> DeleteReview(cellValues.row.id,productId,dispatch,alert) } >
              <Delete />
            </DeleteProduct>
          </>
        );
      },
    },
  ];

  return (
    <>
      {" "}
      <MainParentDiv>
        <HeadingDiv>
          <Heading>All Reviews</Heading>
        </HeadingDiv>

        <ProductsParentDiv>
          {reviews.length ? (
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
          ) : (
            "No Reviews"
          )}
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
  height: 100vh;
  border-left: 1px solid lightgray;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

export default AdminProductReviwes;
