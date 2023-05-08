import React from 'react'
import { useForm } from "react-hook-form";
import "../../../styles/Update_supervisor.css"

const Update_supervisor = () => {


    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        console.log(data);
        reset();
      }; // your form submit function which will invoke after successful validation
    

  return (
    <div >
    <form onSubmit={handleSubmit(onSubmit)} id="Update_supervisor_form">
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
      {...register("warehouse#id", { required: true })}
      placeholder="warehouse#id"
      id="warehouse#id"
    />
    {/* errors will return when field validation fails  */}
    {errors.description && (
      <label htmlFor="des_input">This field is required</label>
    )}

    <input type="submit" id="submit-button" value={"Update Supervisor"} />

    <input
      type="file"
      {...register("photo", { required: true })}
      placeholder=" photo-input"
      id="photo"
    />
    {/* errors will return when field validation fails  */}
    {errors.photo && (
      <label htmlFor="photo-input">This field is required</label>
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

export default Update_supervisor
