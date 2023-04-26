import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/Mange_products.css";
// import "../../styles/Product_card.css"
// import "../../styles/Warehouse_info.css"
import { Button } from "react-bootstrap";

import Product_card from "../Product_card";

const Mange_products = () => {

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
    <div id="Mange_product">
{
      // <Button className="general-button  delete-button " id="add-product">
      //   Add Product +
      // </Button>
    }
      <form onSubmit={handleSubmit(onSubmit)} id="add_product_form">
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("name" ,{required:true})} placeholder="Name" id="input_name"/>
           {/* errors will return when field validation fails  */}
       {errors.name && <label htmlFor="input_name">This field is required</label>}           
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("description", { required: true })}  placeholder="Description" id="des_input"/>
      {/* errors will return when field validation fails  */}
      {errors.description && <label htmlFor="des_input" >This field is required</label>}

      <input type="submit" id="submit-button" value={"Add Product"}/>


      <input type="file" {...register("photo", { required: true })} placeholder=" photo-input"  id="photo"/>
      {/* errors will return when field validation fails  */}
      {errors.photo && <label htmlFor="photo-input">This field is required</label>}
      <input {...register("stock", { required: true })}  placeholder="Stock" id="stock_input"/>
      {/* errors will return when field validation fails  */}
      {errors.stock && <label htmlFor="stock_input">This field is required</label>}

    </form>

<div id="product_div_cont">
      <Product_card />
      <Product_card />
      <Product_card />
      <Product_card />
      </div>
    </div>
  );
};

export default Mange_products;
