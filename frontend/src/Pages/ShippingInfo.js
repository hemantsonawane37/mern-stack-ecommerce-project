import React, { useEffect } from "react";
import NavBar from "../Component/NavBar";
import HorizontalLabelPosition from "../Component/HorizontalLabelPosition";
import styled from "styled-components";
import { Apartment, Home, LocationOn, Phone, Public } from "@material-ui/icons";
import { useDispatch} from "react-redux";
import { Country, State } from "country-state-city";
import { actions } from "../store";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const ShippingInfo = () => {
  const [CountryName, setCountryName] = React.useState("");
  const [addressName, setaddressName] = React.useState("");
  const [cityName, setcityName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [pincode, setpincode] = React.useState("");
  const [StateName, setStateName] = React.useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const preshippinginfo = JSON.parse(localStorage.getItem("shippinginfo"));
    if (preshippinginfo) {
      setCountryName(preshippinginfo.country);
      setaddressName(preshippinginfo.address);
      setcityName(preshippinginfo.city);
      setPhoneNumber(preshippinginfo.PhoneNo);
      setpincode(preshippinginfo.pincode);
      setStateName(preshippinginfo.state);
    }
  }, []);

  function SavingShippingInfo() {
    const shippinginfodata = {
      country: CountryName,
      address: addressName,
      city: cityName,
      PhoneNo: phoneNumber,
      pincode: pincode,
      state: StateName,
    };
    if (
      !CountryName &&
      !addressName &&
      !cityName &&
      !phoneNumber &&
      !pincode &&
      !StateName
    ) {
      return alert.error("please enter and select all fields ");
    }
    if (phoneNumber.length !== 10) {
      return alert.error("phone number should be 10 characters");
    }
    dispatch(actions.initialShippingInfo(shippinginfodata));
    return navigate("/comfimorder");
  }

  return (
    <>
      <NavBar />
      <HorizontalLabelPosition OrderSteps={0} />
      <MainParentDiv>
        <ShippingInputsParentDiv>
          <HeaderDiv>
            <HeaderText>Shipping Details</HeaderText>
          </HeaderDiv>
          <InputParentDiv>
            <IconDiv>
              <Home />
            </IconDiv>
            <Input
              type={"text"}
              value={addressName}
              onChange={(e) => setaddressName(e.target.value)}
              placeholder={"Address"}
              required
            />
          </InputParentDiv>
          <InputParentDiv>
            <IconDiv>
              <Apartment />
            </IconDiv>
            <Input
              type={"text"}
              value={cityName}
              onChange={(e) => setcityName(e.target.value)}
              placeholder={"City"}
              required
            />
          </InputParentDiv>
          <InputParentDiv>
            <IconDiv>
              <LocationOn />
            </IconDiv>
            <Input
              type={"number"}
              value={pincode}
              onChange={(e) => setpincode(e.target.value)}
              placeholder={"Pin code"}
              required
            />
          </InputParentDiv>
          <InputParentDiv>
            <IconDiv>
              <Phone />
            </IconDiv>
            <Input
              type={"number"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={"Phone number"}
              required
            />
          </InputParentDiv>
          <InputParentDiv>
            <IconDiv>
              <Public />{" "}
            </IconDiv>

            <Selecter
              required
              value={CountryName}
              onChange={(e) => setCountryName(e.target.value)}
            >
              {Country &&
                Country.getAllCountries().map((name, index) => {
                  return (
                    <Option key={index} value={name.isoCode}>
                      {name.name}
                    </Option>
                  );
                })}
            </Selecter>
          </InputParentDiv>
          <InputParentDiv>
            <IconDiv>
              <Public />
            </IconDiv>
            <Selecter
              required
              value={StateName}
              onChange={(e) => setStateName(e.target.value)}
            >
              {Country &&
                State.getStatesOfCountry(CountryName).map((name) => {
                  return (
                    <Option key={name.isoCode} value={name.isoCode}>
                      {name.name}
                    </Option>
                  );
                })}
            </Selecter>
          </InputParentDiv>
          <Button onClick={() => SavingShippingInfo()}>continue</Button>
        </ShippingInputsParentDiv>
      </MainParentDiv>
    </>
  );
};

var Button = styled.button`
  width: 90%;
  height: 2.6vmax;
  margin: 2.1vmax auto;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff5757;
  color: white;
  font-size: 1.3vmax;
  @media only screen and (max-width: 600px) {
    height: 4.5vmax;
    font-size: 1.5vmax;
  }
`;

var Selecter = styled.select`
  width: 85%;
  height: 100%;
  border: none;
  outline-style: none;
  font-size: 1.1vmax;
  color: #505050;
`;
var Option = styled.option`
  width: 85%;
  height: 100%;
  border: none;
  outline-style: none;
  font-size: 1.1vmax;
`;

var IconDiv = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #505050;
  @media only screen and (max-width: 600px) {
    font-size: 1vmax;
  }
`;

var Input = styled.input`
  width: 85%;
  height: 100%;
  border: none;
  outline-style: none;
  font-size: 1vmax;
  @media only screen and (max-width: 600px) {
    font-size: 1.5vmax;


  }
`;

var InputParentDiv = styled.div`
  width: 90%;
  height: 2.5vmax;
  border: 1px solid lightgray;
  margin: 1vmax auto;
  display: flex;
  @media (max-width: 600px) {
    width: 80%;
    margin: 3vmax auto;
    height: 4.5vmax;
  }
`;

var HeaderText = styled.span``;

var HeaderDiv = styled.div`
  width: 100%;
  height: 4vmax;

  display: flex;
  justify-content: center;
  align-items: center;
`;

var MainParentDiv = styled.div`
  width: 100vw;
  height: 90vh;
`;
var ShippingInputsParentDiv = styled.div`
  width: 25vw;
  border: 1px solid gray;
  margin: auto;
  @media (max-width: 600px) {
    width: 80vw;
  }
`;

export default ShippingInfo;
