import React from 'react'
import DeshboardSideBar from '../Component/DeshboardSideBar';
import DeshBoardcompo from '../Component/DeshBoardcompo';
import styled from 'styled-components';

const AdminDeshboard = () => {
  return (
    <>
    <DeshBoardMainParentDiv>
    <DeshboardSideBar/>
    <DeshBoardcompo/>
    </DeshBoardMainParentDiv>
    </>
  )
}


var DeshBoardMainParentDiv = styled.div`
display:flex;
@media only screen and (max-width: 600px) {
flex-direction:column;
}
`;

export default AdminDeshboard