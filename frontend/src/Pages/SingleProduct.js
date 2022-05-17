import React from "react";
import NavBar from "../Component/NavBar";
import SinglePageReviews from "../Component/SinglePageReviews";
import SingleProductComp from "../Component/SingleProductComp";

const SingleProduct = () => {
  return (
    <>
      <NavBar />
      <SingleProductComp />
      <SinglePageReviews />
    </>
  );
};

export default SingleProduct;
