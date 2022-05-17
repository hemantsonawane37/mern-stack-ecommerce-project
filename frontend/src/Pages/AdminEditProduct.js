import React from 'react'
import styled from 'styled-components';
import DeshboardSideBar from '../Component/DeshboardSideBar';
import AdmineditProducts from '../Component/AdmineditProducts';



const AdminEditProduct = () => {
  return (
    <>
    <MainParentDiv>
    <DeshboardSideBar/>
    <AdmineditProducts/>
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

export default AdminEditProduct