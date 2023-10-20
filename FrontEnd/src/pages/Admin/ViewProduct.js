import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";

const ViewProduct = () => {
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
  const [isEditable, setIsEditable] = useState(false);

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

  return (
    <Layout title={"Dashboard - View Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>View Product</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={product.name}
                  readOnly={!isEditable}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={product.category}
                  readOnly={!isEditable}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={product.price}
                  readOnly={!isEditable}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="desc" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="desc"
                  name="desc"
                  value={product.desc}
                  readOnly={!isEditable}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="size" className="form-label">
                  Size
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="size"
                  name="size"
                  value={product.size}
                  readOnly={!isEditable}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="form-label">
                  Color
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  name="color"
                  value={product.color}
                  readOnly={!isEditable}
                />
              </div>
            </form>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsEditable(!isEditable)}
            >
              {isEditable ? "Save Changes" : "Edit Product"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewProduct;
