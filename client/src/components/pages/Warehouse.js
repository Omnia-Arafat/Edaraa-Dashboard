import React from "react";
import "../../styles/Warehouse.css";
import { Link } from "react-router-dom";
function Warehouse(props) {
  return (
    <div id="warehouse-container">
      <Link to={"/Warehouse_info/" + props.id}>
        <div id="warehouse-body">
          <div
            className="box mb-3 bg-white"
            data-work={"Warehouse Number (" + props.id + ")"}
          >
            <div id="warehouse-body-in"></div>
          </div>
        </div>
        <div id="warehouse-control">
          <button>
            <Link to={"/Mange_products/"}>Add</Link>
          </button>
          C:\Users\DELL\OneDrive\Documents\GitHub\Edaraa-Dashboard\client\src\components\pages\Warehouse.js
          <button>
            <Link to={"/Update_warehouse/"}>Update</Link>
          </button>
          <button>
            <Link>Delete</Link>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Warehouse;
