import React from "react";
import { Route, NavLink, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Run from "../pages/Run";
import Edit from "../pages/Edit";
import Result from "../pages/Result";
import Login from "../pages/Login";
import ProtectedRoute from '../components/ProtectedRoute';

  const logout = () => {
    console.log("Logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin");
    window.location.reload();
  }


export const NavBar = () => (
  <>
    <NavLink className="sjs-nav-button" to="/">
      <span>My Surveys</span>
    </NavLink>

				<button
					className="sjs-button logout-button"
					onClick={logout}
				>
					Logout
				</button>


  </>
);

const NoMatch = () => (
  <>
    <h1>404</h1>
  </>
);

const Content: React.FC = (): React.ReactElement => (
  <>
    <Routes>

      <Route path="/login" element={<Login />}></Route>

      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>

      <Route path="/run/:id" element={<ProtectedRoute><Run /></ProtectedRoute>}></Route>
      <Route path="/edit/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>}></Route>
      <Route path="/result/:id" element={<ProtectedRoute><Result /></ProtectedRoute>}></Route>
      <Route element={<NoMatch />}></Route>
    </Routes>
  </>
);

export default Content;
