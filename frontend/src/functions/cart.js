

import { actions } from "../store";

export const AddtoCart = (Product, Quantity, dispatch) => {
  let cart = [];

  const DATA = JSON.parse(localStorage.getItem("cart"));

  if (DATA === null) {
    const TotalPrice = Number(Product.price) * Number(Quantity);
    const ProductWithQty = {
      ...Product,
      Quantity: Quantity,
      TotalPrice: TotalPrice,
    };

    cart.push(ProductWithQty);
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(actions.initializeCartItem(cart));
    dispatch(actions.initializeCartLength(cart.length));
  } else {
    
    const TotalPrice = Number(Product.price) * Number(Quantity);
    const ProductWithQty = {
      ...Product,
      Quantity: Quantity,
      TotalPrice: TotalPrice,
    };
    DATA.push(ProductWithQty);
    let arra = [];
    const keys = ["_id"],
      filtered = DATA.filter(
        (
          (s) => (o) =>
            ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join("|"))
        )(new Set())
      );

    filtered.forEach((v) => {
      arra.push(v);
    });
   
    localStorage.setItem("cart", JSON.stringify(filtered));
    dispatch(actions.initializeCartItem(filtered));
    dispatch(actions.initializeCartLength(filtered.length));
  }
};

export const GetCartItemfromLocalStore = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const CartLength = (key) => {
  const length = JSON.parse(localStorage.getItem(key));
  return length.length;
};

export const RemoveProductFromCart = (id, dispatch, actions) => {
  const CartItems = JSON.parse(localStorage.getItem("cart"));
  let NewcartItems = CartItems.filter((data) => data._id !== id);


  if (Array.isArray(NewcartItems) && NewcartItems.length) {
    localStorage.setItem("cart", JSON.stringify(NewcartItems));
    dispatch(
      actions.actions.initializeCartLength(JSON.parse(NewcartItems.length))
    );
  } else {
    localStorage.removeItem("cart");
  }

  dispatch(
    actions.initializeCartItem(
      JSON.parse(localStorage.getItem("cart")) !== null
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    )
  );
 
};

export const increaseQuantity = (id, Quantity, condition) => {
  console.log(id, Quantity, "innn");
  const CartItems = JSON.parse(localStorage.getItem("cart"));
  const UpdatedCartitems = CartItems.map((data) => {
    if (data._id === id && condition === "increase") {
      data.Quantity = Quantity;
      data.TotalPrice = Number(data.price) * Number(Quantity);
    } else if (
      data._id === id &&
      condition === "decrease" &&
      data.TotalPrice > data.price
    ) {
      data.Quantity = Quantity;
      data.TotalPrice = Number(data.TotalPrice) - Number(data.price);
    }
    return data;
  });

  localStorage.setItem("cart", JSON.stringify(UpdatedCartitems));

};

export const GetOrderDetails = (Orders) => {
  const orderDetails = [];
  Orders.forEach((order) => {
    order.orderitems.forEach((product) => {
      orderDetails.push({
        id: product._id,
        price: product.price,
        quantity: product.quantity,
        status: order.orderstatus,
        action:`/order/${order._id}`
      });
    });
  });
  return orderDetails;
};
