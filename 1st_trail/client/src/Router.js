import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Home from "./components/pages/Home"
import App from './App';
import Warehouse from './components/pages/Warehouse';
import Request from './components/pages/Request';
import Log_Out from './components/pages/Log_Out';

export const router = createBrowserRouter([
   
   {
    path:"/",
    element:<App/>,
    children:[

        
            {
                path: "/",
                element: <Home/>,
              },
            {
                path: "/home",
                element: <Home/>,
              },
            {
                path: "/warehouse",
                element: <Warehouse/>,
              },
            {
                path: "/Request",
                element: <Request/>,
              },
            {
                path: "/Log-Out",
                element: <Log_Out/>,
              },

        
    ]
   },
   
   
  ]);

  