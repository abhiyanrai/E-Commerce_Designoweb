import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";


const ProductListing = () => {
  
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const token = auth?.token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    axios.get("/api/v1/admin/getAllProductsByAdmin", {
      headers,
    })
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - Products Listing"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Products Created By Admin</h1>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.desc}</td>
                    <td>{product.size}</td>
                    <td>{product.color}</td>
                    <td>
                        <Link to={`/dashboard/admin/products/edit/${product._id}`}>Edit</Link>
                         {" | "}
                        <Link to={`/dashboard/admin/products/view/${product._id}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;

