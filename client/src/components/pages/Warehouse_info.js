import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Product_card from "./Product_card";

import "../../styles/Warehouse_info.css";



const Warehouse_info = () => {
  
  const {
    register,reset,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input





  return (
    <div id='warehouse_info_con'>
   
    <form onSubmit={handleSubmit(onSubmit)} id="request_product_form">
    {/* register your input into the hook by invoking the "register" function */}
    <input {...register("name" ,{required:true})} placeholder="Name" id="input_name"/>
         {/* errors will return when field validation fails  */}
     {errors.name && <label htmlFor="input_name">This field is required</label>}           
    {/* include validation with required or other standard HTML validation rules */}
    <input {...register("description", { required: true })}  placeholder="Description" id="des_input"/>
    {/* errors will return when field validation fails  */}
    {errors.description && <label htmlFor="des_input" >This field is required</label>}

    <input type="submit" id="submit-button" value={"Request Product"}/>


    <input type="file" {...register("photo", { required: true })} placeholder=" photo-input"  id="photo"/>
    {/* errors will return when field validation fails  */}
    {errors.photo && <label htmlFor="photo-input">This field is required</label>}
    <input {...register("stock", { required: true })}  placeholder="Stock" id="stock_input"/>
    {/* errors will return when field validation fails  */}
    {errors.stock && <label htmlFor="stock_input">This field is required</label>}

  </form>


  <div id='request_product_div_cont'>
    <Product_card/>
    <Product_card/>
    <Product_card/>
    <Product_card/>
    <Product_card/>
    <Product_card/>
    </div>

    </div>
  )
}

export default Warehouse_info
