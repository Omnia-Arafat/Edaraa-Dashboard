import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import "../../../styles/Add_warehouse.css"
const Add_warehouse = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [image, setImage] = useState(null);
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
  
    const onSubmit = data => {
      console.log(data);
      console.log(image);
    
    };
    
  
  
    return (
      <div id='Add_warehouse' >
  
        <div id='add-product-session'>
       
      <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
        <input  {...register("name" , {required: true})} 
        placeholder='warehouse name'/>
        {errors.exampleRequired && <p>This field is required</p>}
  
        <label htmlFor="image">Image:</label>
        <input type="file" onChange={handleImageChange} />
        {errors.exampleRequired && <p>This field is required</p>}
  
        
        <input type="submit" />
      </form>
        </div>
      </div>
    )
}

export default Add_warehouse
