import React from 'react';
import MetaData from '../Component/Metadata/MetaData';
import NavBar from "../Component/NavBar";
import SignInOutCompo from '../Component/SignInOutCompo';

const SignInSignOut = () => {
  return (
    <>
     <MetaData title={"Sigin/signout"}/>
    <NavBar/>
    <SignInOutCompo/>
    </>
  )
}


export default SignInSignOut