import React from 'react'
import '../../styles/Warehouse.css'
import { Link } from 'react-router-dom';
function Warehouse() {
  return (
    <div>
      <div id='warehouse-container'>
      <div id='warehouse-body'>

      <div className="box mb-3 bg-white" data-work="Warehouse 1">

        <div id='warehouse-body-in'></div>
        </div>
        </div>
        <div id='warehouse-control'>
          <button><Link>Add</Link></button>
          <button><Link>Update</Link></button>
          <button><Link>Delete</Link></button>
        </div>
      </div>


    </div>
  )
}

export default Warehouse

