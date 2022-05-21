import React from 'react'
import DeshboardSideBar from '../Component/DeshboardSideBar';
import DeshBoardcompo from '../Component/DeshBoardcompo';
import styled from 'styled-components';
import MetaData from '../Component/Metadata/MetaData';

const AdminDeshboard = () => {
  return (
    <>
    <MetaData title={"Admin"}/>
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