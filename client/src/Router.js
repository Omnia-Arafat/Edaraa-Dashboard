import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import App from "./App";
import Warehouse_list from "./components/pages/Warehouse_ist";
import Request from "./components/pages/Request";
import Log_Out from "./components/pages/Log_Out";
import Warehouse_info from "./components/pages/Warehouse_info";
import Mange_products from "./components/pages/Mange_product/Mange_products";
import Mange_supervisor from "./components/pages/Mange_supervisor/Mange_supervisor";
import Registration from "./components/pages/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/warehouse",
        element: <Warehouse_list />,
      },
      {
        path: "/Request",
        element: <Request />,
      },
      {
        path: "/Log-Out",
        element: <Log_Out />,
      },
      {
        path: "/Warehouse_info/:id",

        children: [
          {
            path: "",
            element: <Warehouse_info />,
          },
          {
            path: "",
            element: <Warehouse_info />,
          },
        ],
      },

      {
        path: "/Mange_products",
        element: <Mange_products />,
      },
      {
        path: "/Mange_supervisor",
        element: <Mange_supervisor />,
      },
      {
        path: "/Registration",
        element: <Registration/>,
      },
    ],
  },
]);
