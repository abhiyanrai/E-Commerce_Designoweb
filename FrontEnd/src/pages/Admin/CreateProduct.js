import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const CreateProduct = () => {

  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    desc: "",
    size: "",
    color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = auth?.token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post("/api/v1/admin/addProduct", product, {
        headers,
      });
      if (response?.data?.success) {
        toast.success(response.data.message)
        setProduct({
          name: "",
          category: "",
          price: "",
          desc: "",
          size: "",
          color: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  name="desc"
                  value={product.desc}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Size"
                  name="size"
                  value={product.size}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Color"
                  name="color"
                  value={product.color}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

