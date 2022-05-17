import React, { useState, useRef, useEffect } from "react";
import {
  ShortText,
  Money,
  Description,
  Category,
  FormatListNumbered,
} from "@material-ui/icons";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import styled from "styled-components";
import { CreateProduct } from "../APICallFun/ApiFun";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const AdminCreateProducts = () => {
  const [stateName, setName] = useState("");
  const [statePrice, setPrice] = useState("");
  const [stateCategory, setCategory] = useState("");
  const [stateDescription, setDescription] = useState("");
  const [stateStock, setStock] = useState("");
  const [stateImage, setImage] = useState([]);
  const [statePreview, setPreview] = useState([]);
  const alert = useAlert();
  const navigate = useNavigate();
  const CreateBtn = useRef(null)

  useEffect(() => {}, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: stateName,
      description: stateDescription,
      price: statePrice,
      images: stateImage,
      category: stateCategory,
      stock: stateStock,
    };
    const isCreated = await CreateProduct(data, alert);
    isCreated && navigate("/admin/allproducts");
  };

  const HandleImageUpload = (e) => {
    const Images = Array.from(e.target.files);

    setImage([]);
    setPreview([]);
    Images.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function () {
        if (reader.readyState === 2) {
          setImage((old) => [...old, reader.result]);
          setPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MainParentDiv>
        <CreateProFormDiv>
          <HeadingDiv>
            <Heading>Create Products</Heading>
          </HeadingDiv>
          <Form onSubmit={(e) => HandleSubmit(e)}>
            <InputDiv>
              <IconDiv>
                <ShortText />
              </IconDiv>
              <Input
                type={"text"}
                value={stateName}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Product Name"}
                required={true}
              />
            </InputDiv>
            <InputDiv>
              <IconDiv>
                <Money />
              </IconDiv>
              <Input
                type={"number"}
                value={statePrice}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={"Product Price"}
                required={true}
              />
            </InputDiv>
            <InputDiv>
              <IconDiv>
                <Category />
              </IconDiv>
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
                  <MenuItem value={"laptop"}>Laptop</MenuItem>
                  <MenuItem value={"T-shirt"}>T-shirt</MenuItem>
                  <MenuItem value={"Shirt"}>Shirt</MenuItem>
                  <MenuItem value={"Phone"}>Phone</MenuItem>
                </Select>
              </FormControl>
            </InputDiv>
            <InputDiv>
              <IconDiv>
                <Description />
              </IconDiv>
              <Input
                value={stateDescription}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={"Product Description"}
                required={true}
              ></Input>
            </InputDiv>
            <InputDiv>
              <IconDiv>
                <FormatListNumbered />
              </IconDiv>
              <Input
                type={"number"}
                value={stateStock}
                onChange={(e) => setStock(e.target.value)}
                placeholder={"stock"}
                required={true}
              ></Input>
            </InputDiv>
            <FileInputDiv>
              <FileInput
                type={"file"}
                multiple={true}
                name={"image"}
                accept={"image/png, image/jpeg,image/webp"}
                onChange={(e) => HandleImageUpload(e)}
                required={true}
              ></FileInput>
            </FileInputDiv>
            <PreviweParentDiv visible={statePreview}>
              {statePreview &&
                statePreview.map((img, I) => {
                  return <PreviweImage src={img} key={I} />;
                })}
            </PreviweParentDiv>
            <Button type={"submit"} ref={CreateBtn} >Create</Button>
          </Form>
        </CreateProFormDiv>
      </MainParentDiv>
    </>
  );
};

var PreviweImage = styled.img`
  height: 100%;
  width: 5vmax;
  flex-shrink: 0;
`;

var PreviweParentDiv = styled.div`
  width: 100%;
  height: 7vmax;
  //border: 1px solid red;
  display: flex;
  overflow-x: scroll;
  ${(prop) => (prop.visible.length ? "display:flex;" : "display:none;")}
  ::-webkit-scrollbar {
    height: 8px;
  }
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

var FileInputDiv = styled.div`
  width: 70%;
  height: 3vmax;
  display: flex;
  margin: 2vmax auto;
  text-align: center;
  border: 1px solid lightgray;
`;

var FileInput = styled.input`
  color: transparent;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }

  ::before {
    content: "Choose files";
    color: gray;
    display: inline-block;
    background: white;
    //border: 1px solid red;

    margin: auto;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 400;
    font-size: 1.1vmax;
  }
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

export default AdminCreateProducts;
