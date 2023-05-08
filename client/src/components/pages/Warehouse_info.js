import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Product_card from "./Product_card";
import "../../styles/Warehouse_info.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const Warehouse_info = () => {
  const [products, setProduct] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setProduct({ ...products, loading: true });

    axios
      .get("http://localhost:5000/product")
      .then((resp) => {
        console.log(resp);
        setProduct({
          ...products,
          results: resp.data.results,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setProduct({
          ...products,
          loading: false,
          err: "Something went wrong, please try again later!",
        });
      });
  }, []);

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
  };

  return (
    <div id="warehouse_info_con">
      <form onSubmit={handleSubmit(onSubmit)} id="request_product_form">
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          id="input_name"
        />
        {errors.name && (
          <label htmlFor="input_name">This field is required</label>
        )}
        <input
          {...register("description", { required: true })}
          placeholder="Description"
          id="des_input"
        />
        {errors.description && (
          <label htmlFor="des_input">This field is required</label>
        )}
        <input type="submit" id="submit-button" value="Request Product" />
        <input
          type="file"
          {...register("photo", { required: true })}
          placeholder="photo-input"
          id="photo"
        />
        {errors.photo && (
          <label htmlFor="photo-input">This field is required</label>
        )}
        <input
          {...register("stock", { required: true })}
          placeholder="Stock"
          id="stock_input"
        />
        {errors.stock && (
          <label htmlFor="stock_input">This field is required</label>
        )}
      </form>

      <div id="request_product_div_cont">
        {products.loading && <Spinner animation="border" />}
        {products.err && <Alert variant="danger">{products.err}</Alert>}
        {products.results?.map((product) => (
          <Product_card
            key={product.id}
            product={product}
            name={product.name}
            description={product.description}
            image={product.image_url}
            id={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Warehouse_info;
