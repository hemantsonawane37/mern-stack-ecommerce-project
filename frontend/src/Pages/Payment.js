import React from "react";
import styled from "styled-components";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import HorizontalLabelPosition from "../Component/HorizontalLabelPosition";
import { useRef } from "react";
import "./payment.css";
import axios from "axios";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../store";
import MetaData from "../Component/Metadata/MetaData";

const Payment = () => {
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderinfo"));

  const HandlePayment = async () => {
    payBtn.current.disabled = true;
    const orderInfo = JSON.parse(sessionStorage.getItem("orderinfo"));
    const shippingInfo = JSON.parse(localStorage.getItem("shippinginfo"));
    const user = JSON.parse(localStorage.getItem("user"));
    const cartProducts = JSON.parse(localStorage.getItem("cart"));

    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        "http://localhost:3737/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.Client_Secrete;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        orderInfo.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        orderInfo.user = user.user._id;

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        try {
          const order = await axios.post(
            "http://localhost:3737/api/v1/order/new",
            {
              orderInfo: orderInfo,
              cartProducts: cartProducts,
              shippingInfo: shippingInfo,
            },
            config
          );

          dispatch(actions.initializeOrder(order.data.order));
          localStorage.removeItem("cart");
          navigate("/order-checkout-success");
        } catch (error) {
          alert.error(error.response.data.error);
          payBtn.current.disabled = false;
        }
      }
    } catch (err) {
      alert.error(err.response.data.error);
      payBtn.current.disabled = false;
    }
  };

  return (
    <>
      <MainParentDiv>
      <MetaData title={"Payment"}/>
        <HorizontalLabelPosition OrderSteps={2} />

        <FormDiv>
          <Heading>Card info</Heading>

          <InputParentDiv>
            <CardNumberElement />
          </InputParentDiv>
          <InputParentDiv>
            <CardCvcElement />
          </InputParentDiv>
          <InputParentDiv>
            <CardExpiryElement />
          </InputParentDiv>

          <PayButton
            type="submit"
            onClick={() => HandlePayment()}
            value={`Pay - ₹${orderInfo.totalPrice}`}
            ref={payBtn}
          />
        </FormDiv>
      </MainParentDiv>
    </>
  );
};

var Heading = styled.h3``;

var PayButton = styled.input`
  width: 26vw;
  height: 3vmax;
  margin-top: 2vmax;
  border: none;
  color: white;
  background: green;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    width:90%;
    height: 4.5vmax;
    margin:1vmax auto;

  }

`;

var InputParentDiv = styled.div`
  width: 23vw;
  height: 1vmax;
  border: 1px solid red;
  margin: 2vmax auto;
  padding: 1vmax 1vmax;
  @media only screen and (max-width: 600px) {
 width:90%;
 height: 2vmax;

  }
`;

var FormDiv = styled.div`
  width: 30vw;
  height: 60vh;
 
  text-align: center;
  margin: auto;
  @media only screen and (max-width: 600px) {

    width: 90vw;
    height: auto;

  }
`;

var MainParentDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Payment;
