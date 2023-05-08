import React from "react";
import "../../styles/Warehouse_list.css";
import Warehouse from "./Warehouse";
import { Data } from "../../core/data/warehouse_mokup_data";
import { Link } from "react-router-dom";

const Warehouse_list = () => {



  
  const warehouse_data = Data;


  const display_warehouses = () => {
    if(warehouse_data.length ===0){
      return( <p >There   is No Warehouses To List Yet</p>)
    }
    else{
    return warehouse_data.map((item) => {
      return (
        <Warehouse
          key={item.id}
          id={item.id}
          supervisor_name={item.supervisor_name}
        />
      );
    });}
  };


  return (

    
    <div id="warehouse_list">
    
    
    {display_warehouses()} 

    <Link to={"/Add_warehouse/"}><button id="create-warehouse"> Create+ </button> </Link>
  
  </div>);
};


export default Warehouse_list;
