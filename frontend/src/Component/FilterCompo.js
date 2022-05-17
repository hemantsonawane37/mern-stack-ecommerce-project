import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSelector, useDispatch } from "react-redux";
import { GetSearchedProducts } from "../APICallFun/ApiFun";
import { useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import { actions } from "../store";
import { Debouncing } from "../functions/debouncing";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterCompo = () => {
  const [value, setValue] = useState([0, 80000]);
  const [stateCategory, setCategory] = useState("all");


  const alert = useAlert();
  const dispatch = useDispatch();
  const keyword = useLocation().search.trim().slice(9).replace(/%20/g, " ");

  const HandleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Page = useSelector((state) => state.Products.Page);

  useEffect(() => {
    const random = async () => {
      GetSearchedProducts(
        keyword,
        value,
        stateCategory,
        alert,
        Page,
        dispatch,
        actions
      );
    };

    dispatch(actions.initializeLoading(true));
    Debouncing(random, 2000);
  }, [keyword, stateCategory,value, alert, dispatch, Page]);

  return (
    <MainFilterCompoDiv>
      <HeadingDiv>
        <Heading>Filters</Heading>
      </HeadingDiv>
      <FilterTitleDiv>
        <FilterTitle>Price</FilterTitle>
      </FilterTitleDiv>
      <ParentOfFilter>
        <Box sx={{ width: 220 }}>
          <Slider
            aria-labelledby="range-slider"
            value={value}
            onChange={HandleChange}
            valueLabelDisplay="auto"
            min={0}
            max={80000}
            size={"small"}
          />
        </Box>
      </ParentOfFilter>
      <FilterTitleDiv>
        <FilterTitle>Category</FilterTitle>
      </FilterTitleDiv>
      <ParentOfFilter>
      <FormControl
                sx={{ minWidth: "80%", minHeight: "100%" }}
                size="small"
              >
                <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={stateCategory}
                  onChange={(e) => setCategory(e.target.value)}
                  required={true}
                 
                >
                  <MenuItem value={"all"}>All</MenuItem> 
                  <MenuItem value={"T-shirt"}>T-shirt</MenuItem>
                  <MenuItem value={"Shirt"}>Shirt</MenuItem>
               
                </Select>
              </FormControl>
      </ParentOfFilter>
    </MainFilterCompoDiv>
  );
};

var FilterTitleDiv = styled.div`
  width: 100%;
  //border:1px solid black;
  display: flex;
  justify-content: center;
  height:2vmax;
  align-items:center;
`;
var FilterTitle = styled.span`
  margin: auto;
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    font-size: 1.3vmax;
  }
`;

var ParentOfFilter = styled.div`
  width: 100%;
  height: 3vmax;
  //border:1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:3vmax;
`;

var MainFilterCompoDiv = styled.div`
  flex: 1;
  height: 100vh;
  position: sticky;
  left: 0px;
  top: 0px;
  bottom: 0px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ff9595;
    border-radius: 5px;
  }

  @media only screen and (max-width: 600px) {
    flex: 2;
  }
`;

var HeadingDiv = styled.div`
  margin: 2vmax auto;
  width: 6vmax;
  height: 2vmax;
  border-bottom: 1px solid black;
  text-align: center;
  @media only screen and (max-width: 600px) {
    width: 7vmax;
    height: 2vmax;
  }
`;

var Heading = styled.h3`
  font-weight: 500;
  font-size: 1.5vmax;
  @media only screen and (max-width: 600px) {
    font-size: 1.5vmax;
  }
`;

export default FilterCompo;
