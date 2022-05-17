import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetUserOrderById } from "../APICallFun/ApiFun";
import { useAlert } from "react-alert";
import { actions } from "../store";

const AdminOrderCompo = () => {
  const [StateOrder, setStateOrder] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const SingleOrder = useSelector((state) => state.Products.SingleOrder);

  useEffect(() => {
    GetUserOrderById(id, alert, dispatch, actions);
    setStateOrder(SingleOrder);
  }, [alert,dispatch,id,SingleOrder]);

  return (
    <>
      <MainParentDiv>
        <MainParentDivChild>
          <OrderProductIdParent>
            <OrderProductId>Order Id {StateOrder._id}</OrderProductId>
          </OrderProductIdParent>
          <ShippingInfoparentDiv>
            <ShippingInfoHeadingDiv>
              <ShippingInfoHeading>Shipping Info</ShippingInfoHeading>
            </ShippingInfoHeadingDiv>
            <ShippingDetailsParent>
              <ShippingName>joe adm</ShippingName>
              <ShippingPhone>{StateOrder.shippinginfo?.phoneNo}</ShippingPhone>
              <ShippingAddress>
                {StateOrder.shippinginfo?.address}
              </ShippingAddress>
            </ShippingDetailsParent>
            <PaymentparentDiv>
              <PaymentheadingDiv>
                <Paymentheading>Payment</Paymentheading>
              </PaymentheadingDiv>
              <PaymentDetailsDiv>
                <PaymentPaid>
                  {StateOrder.paymentinfo?.status === "succeeded"
                    ? "Paid"
                    : "Fail"}
                </PaymentPaid>
                <PaymentAmount>{`Amount : ₹${StateOrder.totalprice}`}</PaymentAmount>
              </PaymentDetailsDiv>
            </PaymentparentDiv>
            <OrderStatusParent>
              <OrderStatusheadingDiv>
                <OrderStatusheading>Order Status</OrderStatusheading>
              </OrderStatusheadingDiv>
              <OrderStatusDetailDiv>
                <OrderStatus>{StateOrder.orderstatus}</OrderStatus>
              </OrderStatusDetailDiv>
            </OrderStatusParent>
            <OrderItemsParent>
              <OrderItemsHeadingDiv>
                <OrderItemsHeading>Order Items</OrderItemsHeading>
              </OrderItemsHeadingDiv>

              <OrderItemsProductsParentDiv>
                {StateOrder &&
                  StateOrder.orderitems?.map((item) => {
                    return (
                      <OrderProductParentDiv key={item._id}>
                        <ImageAndNameParentDiv>
                          <ImageDiv>
                            <Image
                              src="/images/Black-T-Shirt.png"
                              width={"100%"}
                              height={"100%"}
                            ></Image>
                          </ImageDiv>
                          <ProductName>{item.name}</ProductName>
                        </ImageAndNameParentDiv>
                        <PriceAndQuantityDiv>
                          <PriceAndQuantity>{`${item.quantity} x ₹${
                            item.price
                          } = ₹${
                            item.quantity * item.price
                          }`}</PriceAndQuantity>
                        </PriceAndQuantityDiv>
                      </OrderProductParentDiv>
                    );
                  })}
              </OrderItemsProductsParentDiv>
            </OrderItemsParent>
          </ShippingInfoparentDiv>
        </MainParentDivChild>
      </MainParentDiv>
    </>
  );
};

var MainParentDiv = styled.div`
  width: 60vw;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;
var OrderProductIdParent = styled.div`
  // border: 1px solid red;
  padding: 1vmax;
`;
var OrderProductId = styled.h2`
  font-weight: 500;
  color: red;
`;
var ShippingInfoparentDiv = styled.div``;
var ShippingInfoHeading = styled.h3`
  font-weight: 500;
`;
var ShippingInfoHeadingDiv = styled.div`
  // border: 1px solid red;
  padding: 1vmax;
`;
var ShippingAddress = styled.span`
  padding: 1vmax;
`;
var ShippingName = styled.span`
  padding: 1vmax;
`;
var ShippingPhone = styled.span`
  padding: 1vmax;
`;
var ShippingDetailsParent = styled.div`
  display: flex;
  flex-direction: column;
`;
var PaymentparentDiv = styled.div``;
var Paymentheading = styled.h3`
  font-weight: 500;
`;
var PaymentheadingDiv = styled.div`
  // border: 1px solid red;
  padding: 1vmax;
`;
var PaymentDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
var PaymentAmount = styled.span`
  padding: 1vmax;
`;
var PaymentPaid = styled.span`
  padding: 1vmax;
`;
var OrderStatusParent = styled.div``;
var OrderStatusheading = styled.h3`
  font-weight: 500;
`;
var OrderStatusheadingDiv = styled.div`
  //  border: 1px solid red;
  padding: 1vmax;
`;

var OrderStatusDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

var OrderStatus = styled.span`
  padding: 1vmax;
`;

var OrderItemsParent = styled.div``;
var OrderItemsHeadingDiv = styled.div`
  padding: 1vmax;
  border-top: 1px solid lightgray;
`;
var OrderItemsHeading = styled.h3`
  font-weight: 500;
`;
var OrderItemsProductsParentDiv = styled.div`
  width: 100%;
  margin: 1vmax 0vmax;
`;

var OrderProductParentDiv = styled.div`
  height: 12vmax;
  width: 100%;
  display: flex;
  justify-content: space-between;
  //border: 1px solid red;
  margin-top: 2vmax;
`;

var PriceAndQuantity = styled.span`
  padding: 1vmax 2vmax;
  font-size: 1.3vmax;
  font-weight: 500;
`;

var PriceAndQuantityDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

var ImageAndNameParentDiv = styled.div`
  display: flex;
  align-items: center;
`;

var ImageDiv = styled.div`
  height: 100%;
  width: 11vmax;
`;

var Image = styled.img``;

var ProductName = styled.span`
  padding: 1vmax 2vmax;
  font-size: 1.3vmax;
  font-weight: 500;
`;

var MainParentDivChild = styled.div`
  width: 100%;
  padding: 2vmax 0vmax;
`;

export default AdminOrderCompo;
