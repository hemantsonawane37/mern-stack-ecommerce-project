import React from 'react'
import styled from 'styled-components';
import DeshboardSideBar from '../Component/DeshboardSideBar';
import AdminCreateProducts from '../Component/AdminCreateProducts';
import MetaData from '../Component/Metadata/MetaData';


const AdminCreateProduct = () => {


  return (
   <>
   <MetaData title={"Admin"}/>
   <MainParentDiv>
   <DeshboardSideBar/>
   <AdminCreateProducts/>
   </MainParentDiv>
   </>
  )
}

var MainParentDiv = styled.div`
display:flex;
@media only screen and (max-width: 600px) {

flex-direction:column;
} 

`;

export default AdminCreateProduct