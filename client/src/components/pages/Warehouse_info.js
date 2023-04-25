import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import "../../styles/Warehouse_info.css"
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import productImage from '../../uploaded/images/cat.jpg';


const Warehouse_info = () => {
  


  return (
    <div id='warehouse_info_con'>
    <Button className='general-button  delete-button ' id='add-product' >Add Product +</Button>

    <div id='Warehouse_info' >

    <div id='card-product-div'>
    <Card style={{ width: '18rem' }} id='card-product'>
    <Card.Img variant="top" src={productImage} alt='image not found yet' id='product-img' />
    <Card.Body>
      <Card.Title style={{ fontSize: '30px' }}>Cat </Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <div id='product-controls'> </div>
      <Button className='general-button' id='update-button' >Update</Button>
      <Button className='general-button  delete-button' >Delete</Button>
    </Card.Body> 

  </Card>
  </div>
    </div>
    </div>
  )
}

export default Warehouse_info
