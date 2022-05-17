import React, { useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { SubmitRatingAndReview } from "../APICallFun/ApiFun";
import { useAlert } from "react-alert";

const SubmitReview = ({ Handlesopenclose, SetSubmit, Productid }) => {
  const [stateRating, setRating] = useState(0);
  const [statecomment, setstatecomment] = useState("");
  const alert = useAlert();
  const User = JSON.parse(localStorage.getItem("user"));

  const HandleSubmitReviwe = async () => {
    const data = {
      ProductId: Productid,
      rating: stateRating,
      comment: statecomment,
      avatar: User?.user.avatar,
    };
    if (!stateRating && !statecomment) {
      alert.show("can`t send sumbit empty comment and rating !");
      SetSubmit((state) => !state);
      return;
    } else {
      const isreviweSubmit = await SubmitRatingAndReview(data, alert);
      if (isreviweSubmit) {
        SetSubmit((state) => !state);
      }
    }
  };

  return (
    <>
      <Dialog open={Handlesopenclose}>
        <ParentHeading>
          <DialogTitle>Review</DialogTitle>
        </ParentHeading>
        <Box sx={{ width: 200, padding: "1vmax 2vmax" }}>
          <Typography variant="subtitle1">Rating</Typography>
          <Rating
            name="rating"
            value={Number(stateRating)}
            onChange={(e) => setRating(e.target.value)}
          />
        </Box>
        <ParentTextArea>
          <TextArea
            placeholder="write comment here..."
            value={statecomment}
            onChange={(e) => setstatecomment(e.target.value)}
          ></TextArea>
        </ParentTextArea>
        <ButtonParent>
          <Button onClick={() => SetSubmit((state) => !state)}>Close</Button>
          <Button onClick={() => HandleSubmitReviwe()}>Submit</Button>
        </ButtonParent>
      </Dialog>
    </>
  );
};

var ParentHeading = styled.div`
  text-align: center;
`;

var ParentTextArea = styled.div`
  width: 25vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

var TextArea = styled.textarea`
width:80%;
height:6vmax;
margin:auto:
outline:none;
padding:1vmax;
overflow: auto;
outline: none;
border:1px solid lightgray;

-webkit-box-shadow: none;
-moz-box-shadow: none;
box-shadow: none;
resize:none;
`;

var Button = styled.button`
  margin: 0vmax 1vmax;
  width: 6vmax;
  height: 2vmax;
  border: none;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
`;

var ButtonParent = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 1vmax 0vmax;
`;

export default SubmitReview;
