import React from 'react';
import styled from 'styled-components';
import DeshboardSideBar from '../Component/DeshboardSideBar';
import AdminUsersComp from '../Component/AdminUsersComp';




const AdminUsers = () => {
  return (
    <><AllusersParentDiv>
     <DeshboardSideBar/>
     <AdminUsersComp/>
    </AllusersParentDiv>
    </>
  )
}

var AllusersParentDiv = styled.div`
display:flex;
@media only screen and (max-width: 600px) {
flex-direction:column;
}`

export default AdminUsers