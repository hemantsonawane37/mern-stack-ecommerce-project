import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SearchedProductsPage from "./Pages/SearchedProductsPage";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import SignInSignOut from "./Pages/SignInSignOut";
import ForgotPassword from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";
import ShippingInfo from "./Pages/ShippingInfo";
import ComfimOrder from "./Pages/ComfimOrder";
import ProtectedRoute from "./Component/ProtectedRoute";
import CheckoutSuccess from "./Pages/CheckoutSuccess";
import Payment from "./Pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./Pages/MyOrders";
import MyOrderProductPage from "./Pages/MyOrderProductPage";
import AdminDeshboard from "./Pages/AdminDeshboard";
import AdminAllProducts from "./Pages/AdminAllProducts";
import AdminCreateProduct from "./Pages/AdminCreateProduct";
import AdminEditProduct from "./Pages/AdminEditProduct";
import AdminOrders from "./Pages/AdminOrders";
import AdminOrder from "./Pages/AdminOrder";
import AdminUsers from "./Pages/AdminUsers";
import AdminUpdateUser from "./Pages/AdminUpdateUser";
import AdminReviews from "./Pages/AdminReviews";
import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";

function App() {
 

  const stripeApiKey = loadStripe("pk_test_51JWEBsSDbCNx7xSM7J1hWTeH26v63baOtdNce5MJ6tPIj9cDEKmqOQFzJ3knemMbaR7Ud5Tqoar7aOtlShvIgMMg006KskUr3x");
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchedProductsPage />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/signinout" element={<SignInSignOut />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/api/v1/password/reset/:token"
            element={<ChangePassword />}
          />
          <Route path="/order-checkout-success" element={<CheckoutSuccess />} />

          <Route element={<ProtectedRoute CheckAdmin={false} />}>
          <Route
              path="/process/payment"
              element={
                <Elements stripe={stripeApiKey}>
                  <Payment />{" "}
                </Elements>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shippinginfo" element={<ShippingInfo />} />
            <Route path="/comfimorder" element={<ComfimOrder />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/order/:id" element={<MyOrderProductPage />} />
            <Route path="/profile" element={<Profile/>} />

          </Route>

          <Route element={<ProtectedRoute CheckAdmin={true} />}>
        
            <Route path="/admin/deshboard" element={<AdminDeshboard />} />
            <Route path="/admin/allproducts" element={<AdminAllProducts />} />
            <Route path="/admin/create" element={<AdminCreateProduct />} />
            <Route
              path="/admin/editproduct/:id"
              element={<AdminEditProduct />}
            />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/order/:id" element={<AdminOrder />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/user/:id" element={<AdminUpdateUser />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
