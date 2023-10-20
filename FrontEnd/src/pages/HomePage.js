import React from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  return (
    <Layout title={"Best offers"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Home Page</h1>
      </div>
    </Layout>
  );
};

export default HomePage;

