import React from 'react';
import styled from 'styled-components';
import DeshboardSideBar from '../Component/DeshboardSideBar';
import AdminReviewComp from '../Component/AdminReviewComp';



const AdminReviews = () => {
  return (
    <>
    <MainParentDiv>
        <DeshboardSideBar/>
        <AdminReviewComp/>
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


export default AdminReviews