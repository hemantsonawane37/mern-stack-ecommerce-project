import React from "react";
import MetaData from "../Component/Metadata/MetaData";
import NavBar from "../Component/NavBar";
import SinglePageReviews from "../Component/SinglePageReviews";
import SingleProductComp from "../Component/SingleProductComp";

const SingleProduct = () => {
  return (
    <>
    <MetaData title={"Product"}/>
      <NavBar />
      <SingleProductComp />
      <SinglePageReviews />
    </>
  );
};

export default SingleProduct;
