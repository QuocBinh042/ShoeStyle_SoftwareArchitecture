import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import Account from "../pages/customer/Account";
import Cart from "../pages/customer/Cart";
import OrderSuccess from "../pages/customer/Order";
import Checkout from "../pages/customer/Checkout";
import Search from "../pages/customer/Search";
import Error from "../pages/error";
import PaymentResult from "../pages/customer/Payment";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ProductDetail from "../pages/customer/ProductDetail";
import PrivateRoute from "../components/PrivateRoutes";
export const routes = [
  {
    path: "/",
    element: <CustomerLayout />,
    breadcrumb: "Home",
    children: [
      { path: "/", element: <Home />, breadcrumb: "Home" },
      { path: "search", element: <Search />, breadcrumb: "Search" },
      { path: "product-detail/:productID", element: <ProductDetail />, breadcrumb: "ProductDetail" },
      { path: "cart", element: <Cart />, breadcrumb: "Cart" },
      { path: "payment", element: <PaymentResult />, breadcrumb: "Payment" },
      { path: "order", element: <OrderSuccess />, breadcrumb: "Order" },

      // 🔒 Bảo vệ các trang yêu cầu đăng nhập
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
        breadcrumb: "Checkout",
      },
      {
        path: "account",
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
        breadcrumb: "Account",
      },
    ],
  },
  { path: "*", element: <Error />, breadcrumb: "Not Found" },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
];
