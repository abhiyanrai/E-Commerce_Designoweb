import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item._id]: 1 }), {})
  );

  const incrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const decrementQuantity = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };


  const totalNetPrice = cart.reduce((total, item) => {
    return total + item.price * quantities[item._id];
  }, 0);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-9">
            <h1>Cart</h1>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Net Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <div className="d-flex">
                        <button
                          onClick={() => decrementQuantity(item._id)}
                          className="btn btn-secondary btn-sm"
                        >
                          -
                        </button>
                        <span className="mx-2">{quantities[item._id]}</span>
                        <button
                          onClick={() => incrementQuantity(item._id)}
                          className="btn btn-primary btn-sm"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{item.price * quantities[item._id]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="text-end">
              <p>Total Net Price: {totalNetPrice}</p>
              <button className="btn btn-primary">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

