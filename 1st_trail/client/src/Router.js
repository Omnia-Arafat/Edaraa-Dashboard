import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import App from "./App";
import Warehouse_list from "./components/pages/Warehouse_ist";
import Request from "./components/pages/Request";
import Log_Out from "./components/pages/Log_Out";
import Warehouse_info from "./components/pages/Warehouse_info";

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
        element: <Warehouse_info />,
      },
    ],
  },
]);
