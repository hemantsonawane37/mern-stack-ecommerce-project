import React from 'react'
import styled from 'styled-components';
import AdminAllOrdersCompo from '../Component/AdminAllOrdersCompo';
import DeshboardSideBar from '../Component/DeshboardSideBar';
import MetaData from '../Component/Metadata/MetaData';


const AdminOrders = () => {
  return (
    <>
    <MetaData title={"Admin"}/>
    <AllOrdersParentDiv>
     <DeshboardSideBar/>
     <AdminAllOrdersCompo/>
    </AllOrdersParentDiv>
    </>
  )
}


var AllOrdersParentDiv = styled.div`
display:flex;
@media only screen and (max-width: 600px) {
flex-direction:column;
}`

export default AdminOrders