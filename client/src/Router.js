import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import App from "./App";
import Warehouse_list from "./components/pages/Warehouse_ist";
import Request from "./components/pages/Request";
import Log_Out from "./components/pages/Log_Out";
import Log_in from "./components/pages/Log_in";
import Add_warehouse from "./components/pages/Mange_warehouse/Add_warehouse";
import Update_warehouse from "./components/pages/Mange_warehouse/Update_warehouse";
import Warehouse_info from "./components/pages/Warehouse_info";
import Mange_products from "./components/pages/Mange_product/Mange_products";
import Mange_supervisor from "./components/pages/Mange_supervisor/Mange_supervisor";
import Update_supervisor from "./components/pages/Mange_supervisor/Update_supervisor";
import Registration from "./components/pages/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Log_in />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      
      {
        path: "/warehouse_list",
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
        path: "/Mange_products/:id",

        children: [
          {
            path: "",
            element: <Mange_products />,
          },
          {
            path: "",
            element: <Warehouse_info />,
          },
        ],
      },

      {
        path: "/Warehouse_info",
        element: <Warehouse_info/>,
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
        path: "/Update_supervisor",
        element: <Update_supervisor />,
      },
      {
        path: "/Registration",
        element: <Registration/>,
      },
      {
        path: "/Add_warehouse",
        element: <Add_warehouse/>,
      },
      {
        path: "/Update_warehouse",
        element: <Update_warehouse/>,
      },
     
    ],
  },
]);
