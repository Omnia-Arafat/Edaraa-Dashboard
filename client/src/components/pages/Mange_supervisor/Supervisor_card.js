import React from 'react';
import { Button } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
import productImage from '../../../uploaded/images/cat.jpg';
import { Link } from 'react-router-dom';
const Supervisor_card = () => {
    return (
        <div id='Product_card'>
    
        <div id='Warehouse_info' >
    
        <div id='card-product-div'>
        <Card style={{ width: '18rem' }} id='card-product'>
        <Card.Img variant="top" src={productImage} alt='image not found yet' id='product-img' />
        <Card.Body>
          <Card.Title style={{ fontSize: '30px' }}>Supervisor Cat </Card.Title>
          <Card.Text>
           warehouse#id
          </Card.Text>
          <div id='product-controls'> </div>
          <Link to={"/Update_supervisor/"}><Button className='general-button' id='update-button' > Update</Button></Link>
          <Button className='general-button  delete-button' >Delete</Button>
        </Card.Body> 
    
      </Card>
      </div>
        </div>
        </div>
      )
}

export default Supervisor_card
