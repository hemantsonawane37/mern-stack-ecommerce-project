import React from "react";
import styled from "styled-components";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import {
  Add,
  ExpandMore,
  ListAlt,
  People,
  PostAdd,
  RateReview,
} from "@material-ui/icons";
import { ImportExport } from "@material-ui/icons";
import { Link } from "react-router-dom";





const DeshboardSideBar = () => {


  return (
    <SideBarMainParentDiv>
      <HeadingDiv>
        <Heading>ECOMMERCE</Heading>
      </HeadingDiv>
      <LinksParentDiv>
        <TreeParent>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}
           sx={{fontSize:"1.3vmax"}}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to={"/admin/create"}>
                {" "}
                <TreeItem nodeId="2" label="create" icon={<PostAdd />} />
              </Link>
              <Link to={"/admin/allproducts"}>
                {" "}
                <TreeItem nodeId="2" label="All" icon={<Add />} />
              </Link>
            </TreeItem>
          </TreeView>
        </TreeParent>
        <LinkParentDiv>
          <Link to={"/admin/orders"}>
            <P>
              {" "}
              <ListAlt /> Orders
            </P>{" "}
          </Link>
        </LinkParentDiv>
        <LinkParentDiv>
          <Link to={"/admin/users"}>
            <P>
              {" "}
              <People /> Users
            </P>{" "}
          </Link>
        </LinkParentDiv>
        <LinkParentDiv>
          <Link to={"/admin/reviews"}>
            <P>
              {" "}
              <RateReview />   Reviwes
            </P>{" "}
          
          </Link>
        </LinkParentDiv>
      </LinksParentDiv>
    </SideBarMainParentDiv>
  );
};

var P = styled.p`
  display: flex;
  align-items: center;
  font-size:1.3vmax;
@media only screen and (max-width: 600px) {
  font-size:1.5vmax;

}
`;

var LinkParentDiv = styled.div`
  margin-top: 2vmax;
  text-decoration:none;
  //border: 1px solid red;
@media only screen and (max-width: 600px) {
  margin-top: 2.5vmax;

}

`;

var TreeParent = styled.div`
  margin-top: 2vmax;
 
`;

var LinksParentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

 // border: 1px solid red;
`;

var HeadingDiv = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
var Heading = styled.h1`
  font-weight: 500;
  color: red;
`;

var SideBarMainParentDiv = styled.div`
  width: 20vw;
 height: 100vh;
  //border: 1px solid red;
@media only screen and (max-width: 600px) {

width:100vw;
height:50vh;
}
`;

export default DeshboardSideBar;
