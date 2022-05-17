import React from 'react';
import DeshboardSideBar from '../Component/DeshboardSideBar';
import AdminAllproductsCompo from '../Component/AdminAllproductsCompo';
import styled from 'styled-components';

const AdminAllProducts = () => {
  return (
    <>
    <AllProductsParentDiv>
        <DeshboardSideBar/>
        <AdminAllproductsCompo/>
    </AllProductsParentDiv>
    </>
  )
}

var AllProductsParentDiv = styled.div`
display:flex;
@media only screen and (max-width: 600px) {
flex-direction:column;
}

`;


export default AdminAllProducts