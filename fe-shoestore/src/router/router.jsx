import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import Account from "../pages/customer/Account";
import Cart from "../pages/customer/Cart";
import Order from "../pages/customer/Order";
import Checkout from "../pages/customer/Checkout";
import Search from "../pages/customer/Search";
import Error from "../pages/error";
import PrivateRoutes from "../components/PrivateRoutes";
import PaymentSuccess from "../pages/customer/Payment";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
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
        path: "cart",
        element: <Cart />,
        breadcrumb: "Cart",  
        children: [
          {            
            path: "checkout",
            element: (<Checkout />),
            breadcrumb: "Checkout",
          },
        ],       
      },
      {
        path: "payment",
        element: <PaymentSuccess />,
        breadcrumb: "payment",         
      },
      {
        element: <PrivateRoutes />,
        children: [
          // {
          //   path: "cart/checkout",
          //   element: <Checkout />,
          //   breadcrumb: "Checkout",
          // },
          {
            path: "account",
            element: <Account />,
            breadcrumb: "Account", 
          },
        ]
      },
      {
        path: "order",
        element: <Order />,
        breadcrumb: "Order",
      },
      
      // {
      //   path: "blog",
      //   element: <Blog />,
      //   children: [
      //     {
      //       index: true,
      //       element: <BlogAll />
      //     },
      //     {
      //       path: ":id",
      //       element: <BlogDetail />
      //     },
      //     {
      //       path: "news",
      //       element: <BlogNews />
      //     },
      //     {
      //       path: "related",
      //       element: <BlogRelated />
      //     }
      //   ]
      // },
     
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