import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || {};
   const [selectedRole, setSelectedRole] = useState(role || 0);

  let formTitle = "LOGIN FORM" ;
  if (role === 0) {
    formTitle = "LOGIN USER";
  } else if (role === 1) {
    formTitle = "LOGIN ADMIN";
  }

  const handleRoleChange = (event) => {
    setSelectedRole(Number(event.target.value));
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
        role: selectedRole
      });
      console.log(res, 'resss')
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Layout title="Register - Ecommer App">
    <div className="form-container ">
      <form onSubmit={handleSubmit}>
        <h4 className="title">{formTitle}</h4>

        {/* Render the role selection radio buttons when formTitle is "LOGIN FORM" */}
        {formTitle === "LOGIN FORM" && (
  <div className="mb-3" style={{ display: "flex", flexDirection: "column" }}>
    <label>Select Role:</label>
    <div style={{ marginBottom: "10px" }}>
      <label style={{ display: "flex", alignItems: "center" }}>
        <input
          type="radio"
          value={0}
          checked={selectedRole === 0}
          onChange={handleRoleChange}
          style={{ marginRight: "5px" }}
        />
        User
      </label>
    </div>
    <div>
      <label style={{ display: "flex", alignItems: "center" }}>
        <input
          type="radio"
          value={1}
          checked={selectedRole === 1}
          onChange={handleRoleChange}
          style={{ marginRight: "5px" }}
        />
        Admin
      </label>
    </div>
  </div>
)}


        {/* Continue with the rest of the form */}
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Email "
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          LOGIN
        </button>
      </form>
    </div>
  </Layout>
  );
};

export default Login;
