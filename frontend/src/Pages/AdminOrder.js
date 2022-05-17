import React from 'react';
import DeshboardSideBar from '../Component/DeshboardSideBar';
import styled from 'styled-components';
import AdminOrderCompo from '../Component/AdminOrderCompo';
import AdminOrderUpdateCompo from './AdminOrderUpdateCompo';

const AdminOrder = () => {
  return (
    <><OrderParentDiv>
        <DeshboardSideBar/>
        <AdminOrderCompo/>
        <AdminOrderUpdateCompo/>
    </OrderParentDiv>
    </>
  )
}


var OrderParentDiv = styled.div`
display:flex;
@media only screen and (max-width: 600px) {
flex-direction:column;
}

`;

export default AdminOrder