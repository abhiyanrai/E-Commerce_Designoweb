import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductListing from "./pages/Admin/ProductListing";
import CreateProduct from "./pages/Admin/CreateProduct";
import EditProduct from "./pages/Admin/EditProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Cart from "./pages/user/Cart";
import UserProductListing from "./pages/user/ProductListing";
import ViewProduct from "./pages/Admin/ViewProduct";
import { useAuth } from  "./context/auth"

function App() {
  const [auth] = useAuth()
  console.log(auth,  'ath')
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {auth?.user?.role === 0 ? (
          <Route path="/cart" element={<Cart />} />
        ) : (
          <Route path="*" element={<Pagenotfound />} />
        )}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/products-listing" element={<UserProductListing />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/products-listing" element={<ProductListing />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/edit/:productId" element={<EditProduct />} />
          <Route path="admin/products/view/:productId" element={<ViewProduct />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;

