import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OrderSummary = () => {
  const [OrderSummary, setOrderSummry] = useState({
    subtotal: "",
    Total: "",
    tax: "",
    shippingCharges: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let SubTotal = TotalPrice(cart);
    const shippingCharges = SubTotal > 1000 ? 0 : 200;

    const tax = SubTotal * 0.18;

    const TOTAL = SubTotal + tax + shippingCharges;

    setOrderSummry({
      ...OrderSummary,
      subtotal: SubTotal,
      Total: TOTAL.toFixed(2),
      tax: tax,
      shippingCharges: shippingCharges,
    });
  }, [OrderSummary]);

  function TotalPrice(Product) {
    let Total = 0;
    Product.forEach((data) => {
      Total += data.TotalPrice;
    });
    return Total;
  }

  function ProceedToPayment() {
    const data = {
      subtotal: OrderSummary.subtotal,
      shippingCharges: OrderSummary.shippingCharges,
      tax: OrderSummary.tax,
      totalPrice: OrderSummary.Total,
    };

    sessionStorage.setItem("orderinfo", JSON.stringify(data));

    navigate("/process/payment");
  }

  return (
    <MainParentDiv>
      <OrderSummaryParentDiv>
        <OrderSummaryHeaderDiv>
          <OrderSummaryHeaderText>Order Summary</OrderSummaryHeaderText>
        </OrderSummaryHeaderDiv>
        <OrderSummaryDetailsParentDiv>
          <OrderDetailParentDiv>
            <Key>subtotal</Key>
            <Value>₹{OrderSummary.subtotal}</Value>
          </OrderDetailParentDiv>
          <OrderDetailParentDiv>
            <Key>Shipping Charges</Key>
            <Value>₹{OrderSummary.shippingCharges}</Value>
          </OrderDetailParentDiv>
          <OrderDetailParentDiv>
            <Key>Tax</Key>
            <Value>₹{OrderSummary.tax}</Value>
          </OrderDetailParentDiv>
          <TotalAmountDiv>
            <Key>Total :</Key>
            <Value>₹{OrderSummary.Total}</Value>
          </TotalAmountDiv>
          <ProcessToPaymentButton onClick={() => ProceedToPayment()}>
            Process to Payment
          </ProcessToPaymentButton>
        </OrderSummaryDetailsParentDiv>
      </OrderSummaryParentDiv>
    </MainParentDiv>
  );
};

var ProcessToPaymentButton = styled.div`
  width: 100%;
  height: 3.5vmax;
  display: flex;
  justify-content: center;
  align-items: center;
  background: green;
  color: white;
  border-radius: 1.1vmax;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    margin: 4vmax 0vmax;
    height: 5vmax;
  }
`;

var TotalAmountDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vmax;
  border-top: 1px solid lightgray;
`;

var OrderSummaryDetailsParentDiv = styled.div`
  width: 100%;
`;

var OrderDetailParentDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1vmax 0vmax;
`;

var Key = styled.span`
  font-weight: 500;
`;

var Value = styled.span`
  font-weight: 500;
`;

var OrderSummaryHeaderText = styled.h2`
  font-weight: 400;
  color: green;
`;

var OrderSummaryHeaderDiv = styled.div`
  width: 100%;
  height: 4.5vmax;
  display: flex;
  justify-content: center;
  align-items: center;
`;

var OrderSummaryParentDiv = styled.div`
  width: 80%;
  //border: 1px solid red;
  margin: 1vmax auto;
`;

var MainParentDiv = styled.div`
  width: 30vw;
  border-left: 1px solid gray;
  @media only screen and (max-width: 600px) {
    width: 100vw;
    border: none;
  }
`;

export default OrderSummary;
