import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line, Pie } from "react-chartjs-2";
import {
  AdminGetAllOrders,
  AdminGetAllProducts,
  AdminGetAllUsers,
} from "../APICallFun/ApiFun";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actions } from "../store";

const DeshBoardcompo = () => {
  const [stateProducts, setProducts] = useState([]);
  const [stateOrders, setOrders] = useState([]);

  const Products = useSelector((state) => state.Products.AllProducts);
  const Orders = useSelector((state) => state.Products.AdminOrders);
  const Users = useSelector((state) => state.Products.Allusers);

  const dispatch = useDispatch();
  const alert = useAlert();

  let outofstock = 0;

  Products.length &&
    Products?.forEach((item) => {


      if (item.stock === 0) {
        outofstock += 1;
      }
    });

  useEffect(() => {
    //console.log(Products);
    if (Products.length === 0) {
      AdminGetAllProducts(alert, dispatch, actions);
      setProducts(Products);
    }

    if (JSON.stringify(Orders) === JSON.stringify({})) {
      AdminGetAllOrders(alert, dispatch);
      setOrders(Orders);
    }

    if (Users.length === 0) {
      AdminGetAllUsers(dispatch, alert);
    }
  }, [alert, dispatch, Products, Orders]);

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Amount Earned",
      },
    },
  };

  const data = {
    labels: ["initalAmount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        data: [0, Orders?.totalAmount],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const PieData = {
    labels: ["out of stock", "instock"],
    datasets: [
      {
        label: "Stock",
        data: [outofstock, Products?.length],
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 1)"],
      },
    ],
  };

  return (
    <DeshBoardMainParentDiv>
      <HeadingDiv>
        <Heading>DeshBoard</Heading>
      </HeadingDiv>
      <TotalAmountDiv>
        <TotalAmount>
          Total Amount <br /> ₹{Orders?.totalAmount}
        </TotalAmount>
      </TotalAmountDiv>
      <TotalDetailsDiv>
        <TotalProductsDiv>
          <TotalProducts>
            Products
            <br />
            {Products?.length}
          </TotalProducts>
        </TotalProductsDiv>
        <TotalOrdersDiv>
          <TotalOrders>
            Orders
            <br />
            {Orders?.orders?.length}
          </TotalOrders>
        </TotalOrdersDiv>
        <TotalUsersDiv>
          <TotalUser>
            Users <br /> {Users?.length}
          </TotalUser>
        </TotalUsersDiv>
      </TotalDetailsDiv>
      <LineCharParentDiv>
        <Line options={options} data={data} />
      </LineCharParentDiv>
      <PieChartParentDiv>
        <Pie data={PieData} />
      </PieChartParentDiv>
    </DeshBoardMainParentDiv>
  );
};

var PieChartParentDiv = styled.div`
  width: 30%;
  margin: auto;
  @media only screen and (max-width: 600px) {
    width: 60%;
  }
`;

var LineCharParentDiv = styled.div`
  width: 80%;
  margin: auto;
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

var TotalDetailsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
var TotalProductsDiv = styled.div`
  width: 14em;
  height: 14em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5vmax 0vmax;
  background: #f3ac3c;
  color: white;
  @media only screen and (max-width: 600px) {
    width: 7em;
    height: 7em;
  }
`;
var TotalProducts = styled.span`
  text-align: center;
  line-height: 1.5vmax;
  font-size: 1.5vmax;
`;
var TotalUsersDiv = styled.div`
  margin: 1.5vmax 0vmax;

  border: 1px solid red;
  width: 14em;
  height: 14em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #323438;
  color: white;
  @media only screen and (max-width: 600px) {
    width: 7em;
    height: 7em;
  }
`;
var TotalUser = styled.span`
  text-align: center;
  line-height: 1.5vmax;
  font-size: 1.5vmax;
`;

var TotalOrdersDiv = styled.div`
  width: 14em;
  height: 14em;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin: 1.5vmax 0vmax;
  align-items: center;
  background: #ff5757;
  color: white;
  @media only screen and (max-width: 600px) {
    width: 7em;
    height: 7em;
  }
`;
var TotalOrders = styled.div`
  text-align: center;
  line-height: 1.5vmax;
  font-size: 1.5vmax;
`;

var TotalAmountDiv = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #8e58ff;
  color: white;
`;

var TotalAmount = styled.h2`
  font-weight: 500;
  text-align: center;
  @media only screen and (max-width: 600px) {
    font-size: 2.6vmax;
  }
`;

var HeadingDiv = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
var Heading = styled.h1`
  font-weight: 400;

  @media only screen and (max-width: 600px) {
    font-size: 3vmax;
  }
`;

var DeshBoardMainParentDiv = styled.div`
  width: 80vw;
  //height:100vh;
  border-left: 1px solid lightgray;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`;

export default DeshBoardcompo;
