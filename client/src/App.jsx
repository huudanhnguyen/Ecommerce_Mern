import React from "react";
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";

// import các page
import Public from "./pages/public/Public";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import FinalRegister from "./pages/public/FinalRegister";
import Products from "./pages/public/Products";
import DetailProduct from "./pages/public/DetailProduct";
import Blogs from "./pages/public/Blogs";
import FAQs from "./pages/public/FAQs";
import OurServices from "./pages/public/OurServices";
import ForgotPassword from "./pages/public/ForgotPassword";
import ResetPassword from "./pages/public/ResetPassword";
import SearchResult from "./pages/public/SearchResult";
import MyAccount from "./pages/member/MyAccount";
import Profile from "./pages/member/Profile";
import Orders from "./pages/member/Orders";
// import Wishlist from "./pages/member/Wishlist";
import CartPage from "./pages/public/CartPage";
import Wishlist from "./pages/public/WishlistPage";
import Checkout from "./pages/public/Checkout";
import BlogDetail from "./pages/public/BlogDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Public />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.PRODUCTS} element={<Products />} />
        <Route path={path.PRODUCT_CATEGORY} element={<Products />} />
        <Route
          path={path.DETAIL_PRODUCT__ID__SLUG}
          element={<DetailProduct />}
        />
        <Route path={path.CART} element={<CartPage />} />
        <Route path={path.WISHLIST} element={<Wishlist />} />
        <Route path={path.CHECKOUT} element={<Checkout />} />
        <Route path={path.BLOGS} element={<Blogs />} />
        <Route path={path.DETAIL_BLOG__ID} element={<BlogDetail />} />
        <Route path={path.OUR_SERVICES} element={<OurServices />} />
        <Route path={path.FAQs} element={<FAQs />} />
        <Route path="/search" element={<SearchResult />} />

        {/* nested routes cho MyAccount */}
        <Route path="my-account" element={<MyAccount />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          {/* <Route path="wishlist" element={<Wishlist />} /> */}
        </Route>

        <Route path={path.NOT_FOUND} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
