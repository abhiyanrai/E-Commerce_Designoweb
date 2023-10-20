import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <h4>User Web App</h4>
          <NavLink
            to="/dashboard/user/products-listing"
            className="list-group-item list-group-item-action"
          >
            Products Listing
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
