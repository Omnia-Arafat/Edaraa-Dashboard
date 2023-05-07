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
      <div id='Mange_warehouse' >
  
        
       
      <form onSubmit={handleSubmit(onSubmit)} id="add_warehouse_form">
        {/* register your input into the hook by invoking the "register" function */}
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          id="input_name"
        />
        {/* errors will return when field validation fails  */}
        {errors.name && (
          <label htmlFor="input_name">This field is required</label>
        )}
        {/* include validation with required or other standard HTML validation rules */}
        <input
          {...register("Location", { required: true })}
          placeholder="Location"
          id="location"
        />
        {/* errors will return when field validation fails  */}
        {errors.description && (
          <label htmlFor="des_input">This field is required</label>
        )}

        <input type="submit" id="submit-button" value={"Add warehouse"} />

        <input
        {...register("state", { required: true })}
        placeholder="State"
        id="state"
        type='number'
      />
      {/* errors will return when field validation fails  */}
      {errors.description && (
        <label htmlFor="des_input">This field is required</label>
      )}
        <input
          style={{ visibility: "hidden" }}
          {...register("stock", { required: true })}
          placeholder="Stock"
          id="stock_input"
        />
        {/* errors will return when field validation fails  */}
        {errors.stock && (
          <label htmlFor="stock_input">This field is required</label>
        )}
      </form>
        </div>
     
    )
}

export default Add_warehouse
