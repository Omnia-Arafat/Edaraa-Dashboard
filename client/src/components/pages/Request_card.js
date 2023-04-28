import React , {useState}from "react";
import "../../styles/Request_card.css";
import { Button } from 'react-bootstrap';

const Request_card = () => {

  

  return (
    <div id="request_card" >
      <div id="request_card_cont">
        <div className="request_user_id_card">
          <p>User#id</p>
        </div>
        <div className="request_product_name_card">
          <p>Product name</p>
        </div>
        <div className="request_product_description_card">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.{" "}
          </p>
        </div>

        <div className="request_product_controls_card">
        
        <Button className='general-button' id='accepted-button' >Accepted</Button>
      <Button className='general-button  delete-button'  >Rejected</Button>
     
    
    </div>
      </div>
    </div>
  );
};

export default Request_card;
