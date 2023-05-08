import React from "react";
import { useForm } from "react-hook-form";
import Product_card from "./Product_card";
import "../../styles/Warehouse_info.css";

const Warehouse_info = () => {
  // const [product, setProduct] = useState({
  // loading: true,
  // results: [],
  // err: null,
  // reload: 0,
  // });

  // useEffect(() => {
  // setProduct({ ...product, loading: true });

  // axios
  //   .get('http://localhost:5000/product')
  //   .then((resp) => {
  //     console.log(resp);
  //     setProduct({
  //       ...product,
  //       results: resp.data.results,
  //       loading: false,
  //       err: null,
  //     });
  //   })
  //   .catch((err) => {
  //     setProduct({
  //       ...product,
  //       loading: false,
  //       err: 'Something went wrong, please try again later!',
  //     });
  //   });

  // }, []);

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
        <Product_card />
        <Product_card />
        <Product_card />
        <Product_card />
      </div>
    </div>
  );
};

export default Warehouse_info;
