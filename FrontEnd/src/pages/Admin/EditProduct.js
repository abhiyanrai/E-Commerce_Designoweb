import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";

const EditProduct = () => {
  const { productId } = useParams();
  const [auth, setAuth] = useAuth();
  const token = auth?.token;
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    desc: "",
    size: "",
    color: "",
  });


  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    axios.get(`/api/v1/admin/getProductById/${productId}`, {
      headers,
    })
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.put(`/api/v1/admin/updateProductDetails`, product, {
        headers,
      });
      if (response?.data?.success) {
       
      }
    } catch (error) {
    
    }
  };

  return (
    <Layout title={"Dashboard - Edit Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Edit Product</h1>
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
                Edit Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
