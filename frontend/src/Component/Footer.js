import React from "react";
import styled from "styled-components";
const MainDiv = styled.div`
  display: flex;
  background-color: #110f24;
  color: white;
`;
const LeftSection = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vmax 0vmax;
`;
const CenterSection = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vmax 0vmax;
`;
const H4 = styled.h4`
  margin-bottom: 1vmax;
  @media only screen and (max-width: 600px) {
    font-size: 1.3vmax;
  }
`;
const P = styled.p`
  margin-bottom: 1.2vmax;
  text-align: center;
  @media only screen and (max-width: 600px) {
    font-size: 1.2vmax;
  }
`;
const Img = styled.img`
  margin: 0.6vmax 0vmax;
  @media only screen and (max-width: 600px) {
    width: 70px;
  }
`;
const H1 = styled.h1`
  color: #ff3636;
  margin: 2vmax;
  @media only screen and (max-width: 600px) {
    font-size: 2vmax;
  }
`;

const A = styled.a`
  text-decoration: none;
  color: white;
  margin: 0.4vmax;
  transition: all 350ms;

  &:hover {
    color: #ff3636;
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.5vmax;
    margin: 0.9vmax;
  }
`;

function Footer() {
  return (
    <>
      <MainDiv>
        <LeftSection>
          <H4>Download our App</H4>
          <P>Download App for Android and ios Modules Phones</P>
          <Img src="./images/get-it-on-google-play-badge.png" width={"100px"} />
          <Img src="./images/apple-store-app.png" width={"100px"} />
        </LeftSection>
        <CenterSection>
          <H1>ECOMMERCE.</H1>
          <P>High Quality its our priority</P>
          <P>CopyRight &copy; @MeHemantSonawane</P>
          <P>Contact  <A href="https://www.gmail.com" target={"_blank"} >hemantsonawanem@gmail.com</A> </P>
        </CenterSection>
        <RightSection>
          <H4>Follow Us</H4>
          <A href="/">Facebook</A>
          <A href="https://www.instagram.com/_._hemant_._._" target={"_blank"} >Instagram</A>
          <A href="/">Linkdin</A>
        
        </RightSection>
      </MainDiv>
    </>
  );
}

export default Footer;
