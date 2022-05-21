import { useEffect } from "react";
import Axios from "axios";
import { useAlert } from "react-alert";
import { transitions, positions } from "react-alert";
// import { actions } from "../store";

import { actions } from "../store";

export const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

export const FeaturesProducts = (Setstate) => {
  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };
  
  const alert = useAlert();
  useEffect(() => {
    Axios.get("/api/v1/products",config)
      .then((data) => {
        Setstate(data.data.Products);
      })
      .catch((error) => alert.error(error.response.data.error));
  }, [Setstate, alert]);
};

export const GetProducts = async (keyword, dispatch, actions) => {
  try {
    if (keyword !== "") {
      const data = await Axios.get(
        `/api/v1/products?keyword=${keyword}`
      );
      dispatch(actions.initializeLoading(false));
      dispatch(actions.initializeProducts(data.data));
    } else {
      return [];
    }
  } catch (error) {
    alert.error(error.response.data.error);
    return [];
  }
};

export const GetSearchedProducts = async (
  keyword,
  price,
  category,
  alert,
  Page,
  dispatch,
  actions
) => {
  try {
    let categorysecond = `category=${category}`;
    let Link = "";
    if (category !== "all") {
      Link = `/api/v1/products?keyword=${keyword}&price[gt]=${price[0]}&price[lt]=${price[1]}&${categorysecond}&page=${Page}`;
    } else {
      Link = `/api/v1/products?keyword=${keyword}&price[gt]=${price[0]}&price[lt]=${price[1]}&page=${Page}`;
    }

    const data = await Axios.get(Link);
    dispatch(actions.initializeLoading(false));
    dispatch(actions.initializeProducts(data.data));
  } catch (error) {
    alert.error(error.response.data.error);

    return [];
  }
};

export const GetSingleProduct = async (id, dispatch, actions, alert) => {
  try {
    const Product = await Axios.get(
      `/api/v1/product/${id}`
    );
    if (!Product.data.success) {
      alert.error(Product.data.error);
    }

    dispatch(actions.initializeSingleProduct(Product.data));
  } catch (error) {
    alert.error(error.response.data.error);
    dispatch(actions.initializeSingleProduct({}));
  }
};

export const UserLogin = async (data, dispatch, alert, navigate) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const User = await Axios.post(
      "/api/v1/login",
      data,
      config
    );

    if (!User.data.success) {
      alert.error(User.data.error);
    }
    localStorage.setItem("user", JSON.stringify(User.data));
    dispatch(actions.initializeUser(User.data));
    navigate(-1);
  } catch (error) {
    alert.error(error.response.data.error);
    //dispatch(actions.initializeUser({}));
  }
};

export const UserSignUp = async (data, dispatch, navigate, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
      
    };
    const User = await Axios.post(
      "/api/v1/register",
      data,
      config
    );

    if (!User.data.success) {
      alert.error(User.data.error);
    }
    localStorage.setItem("user", JSON.stringify(User.data));
    dispatch(actions.initializeUser(User.data));
    navigate("/");
  } catch (error) {
console.log(data)
    alert.error(error.response.data.error);
  }
};

export const ForgotPasswordFun = async (Email, alert) => {
  try {
    const data = { email: Email };
    const config = { headers: { "Content-Type": "application/json" } };
    alert.show("Wait for a minute");
    const Data = await Axios.post(
      "/api/v1/password/forgot",
      data,
      config
    );
    alert.show(Data.data.message);
  } catch (error) {
    alert.error(error.response.data.error);
  }
};

export const ResetPassword = async (dispatch, data, token, alert) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const Data = await Axios.put(
      `/api/v1/password/reset/${token}`,
      data,
      config
    );
    localStorage.setItem("user", JSON.stringify(Data.data));
    dispatch(actions.initializeUser(Data.data));
    alert.show("successfully password has been reset");
  } catch (error) {
    alert.error(error.response.data.error);
  }
};

export const GetUsersOrder = async (dispatch, actions, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const order = await Axios.get(
      "/api/v1/orders/me",
      config
    );
    dispatch(actions.initializeOrder(order.data.order));
  } catch (error) {
    alert.error(error.response.data.error);
  }
};

export const SubmitRatingAndReview = async (data, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const review = await Axios.put(
      "/api/v1/review",
      data,
      config
    );
    return review.data.success;
  } catch (error) {
    alert.error(error.response.data.error);
  }
};

export const GetUserOrderById = async (id, alert, dispatch, actions) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const order = await Axios.get(
      `/api/v1/order/${id}`,
      config
    );
    dispatch(actions.initializeSingleOrder(order.data.order));
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const AdminGetAllProducts = async (alert, dispatch, actions) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const products = await Axios.get(
      `/api/v1/admin/products`,
      config
    );
    //console.log(products.data.Products.length)
    dispatch(actions.initializeAllProducts(products.data.Products));
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

// get all orders

export const AdminGetAllOrders = async (alert, dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const orders = await Axios.get(
      `/api/v1/orders/admin`,
      config
    );

    dispatch(actions.initializeOrdersAdmin(orders.data));
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

// get all users

export const CreateProduct = async (data, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const product = await Axios.post(
      "/api/v1/product/new",
      data,
      config
    );

    return product;
  } catch (error) {
    alert.error(error.response?.data.error);
    return;
  }
};

export const DeleteProductFun = async (id, alert, navigate) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    await Axios.delete(`/api/v1/product/${id}`, config);
    navigate("/admin/deshboard");
    alert.show("Product has been deleted successfully");
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const UpdateProduct = async (id, alert, data) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    await Axios.put(`/api/v1/product/${id}`, data, config);
    return true;
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const GetAllOrders = async (alert, dispatch, actions) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const orders = await Axios.get(
      `/api/v1/orders/admin`,
      config
    );
    dispatch(actions.initializeAllOrders(orders.data));
    return true;
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const DeleteOrder = async (id, alert, dispatch, actions) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    await Axios.delete(`/api/v1/order/${id}`, config);
    dispatch(actions.initializeAllOrders({}));

    return true;
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const UpdateOrderStatus = async (id, orderstatus, dispatch, alert) => {
  try {
    const data = { status: orderstatus };
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    await Axios.put(
      `/api/v1/order/status/${id}`,
      data,
      config
    );
    dispatch(actions.initializeSingleOrder({}));

    return true;
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const AdminGetAllUsers = async (dispatch, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const users = await Axios.get(
      `/api/v1/admin/users`,
      config
    );

    dispatch(actions.initializeAllusers(users.data.users));

    return true;
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const AdminGetUser = async (id, dispatch, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const user = await Axios.get(
      `/api/v1/user/${id}`,
      config
    );

    dispatch(actions.initializeAdminUser(user.data.user));
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const UpdateUser = async (id, navigate, dispatch, data, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const user = await Axios.put(
      `/api/v1/user/update/${id}`,
      data,
      config
    );

    alert.show(`${user.data.message}`);
    dispatch(actions.initializeAllusers([]));
    navigate("/admin/users");
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const DeleteUser = async (id, dispatch, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const user = await Axios.delete(
      `/api/v1/user/delete/${id}`,
      config
    );

    alert.show(`${user.data.message}`);
    dispatch(actions.initializeAllusers([]));
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const GetProductReviews = async (id, dispatch, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      params: { id: id },
    };

    const reviews = await Axios.get(
      `/api/v1/admin/product/reviews`,
      config
    );
    dispatch(actions.initializeReviwes(reviews.data.reviews));
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const DeleteReview = async (id, productId, dispatch, alert) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      params: { id: id, productId: productId },
    };

    await Axios.delete(`/api/v1/reviews/delete`, config);
    dispatch(actions.initializeReviwes([]));
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};

export const EditUserProfile = async (data, dispatch, alert) => {
  try {
    console.log(data)
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const result = await Axios.put(
      `/api/v1/me/update`,
      data,
      config
    );
    dispatch(actions.initializeUser(result.data));
    localStorage.setItem("user", JSON.stringify(result.data));
    alert.show("Your Profile is Edited !")
  } catch (error) {
    alert.error(error.response?.data.error);
  }
};
