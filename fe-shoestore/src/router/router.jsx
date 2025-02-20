import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import Account from "../pages/customer/Account";
import Cart from "../pages/customer/Cart";
import OrderSuccess from "../pages/customer/Order";
import Checkout from "../pages/customer/Checkout";
import Search from "../pages/customer/Search";
import Error from "../pages/error";
import PrivateRoutes from "../components/PrivateRoutes";
import PaymentResult from "../pages/customer/Payment"
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ProductDetail from "../pages/customer/ProductDetail";

export const routes = [
  {
    path: "/",
    element: <CustomerLayout />,
    breadcrumb: "Home",
    children: [
      {
        path: "/",
        element: <Home />,
        breadcrumb: "Home",
      },
      {
        path: "search",
        element: <Search />,
        breadcrumb: "Search",
      },
      {
        path: "product-detail/:productID",
        element: <ProductDetail />,
        breadcrumb: "ProductDetail",
      },

      {
        path: "cart",
        element: <Cart />,
        breadcrumb: "Cart",
        children: [
          {
            path: "checkout",
            element: (
              <PrivateRoutes>
                <Checkout />
              </PrivateRoutes>
            ),
            breadcrumb: "Checkout",
          },
        ],
      },
      {
        path: "payment",
        element: <PaymentResult />,
        breadcrumb: "payment",
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "account",
            element: <Account />,
            breadcrumb: "Account",
          },
        ]
      },
      {
        path: "order",
        element: <OrderSuccess />,
        breadcrumb: "Order",
      },

    ]
  },
  {
    path: "*",
    element: <Error />,
    breadcrumb: "Not Found"
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]