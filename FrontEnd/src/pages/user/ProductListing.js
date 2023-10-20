import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Header from "../../components/Layout/Header";
import { Link } from "react-router-dom"; // Import Link

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useAuth();

  const addToCart = (product) => {
    alert("Product added to cart")
    setCart([...cart, product]);
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${auth?.token}`,
      "Content-Type": "application/json",
    };
    axios
      .get("/api/v1/user/getAllProducts", {
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
    <Layout title={"Your Profile - All Products Listing"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {/* <Header cart={cart} /> */}
            <h1>All Products Listing</h1>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Add to Cart</th>
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
                      <button
                        onClick={() => addToCart(product)}
                        className="btn btn-primary"
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/cart" state={{ cart }}>View Cart</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;




