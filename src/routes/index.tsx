import React, { useState, useEffect } from "react";
import { Route, NavLink, Routes } from "react-router-dom";
import withAuth from '../hocs/withAuth'; // Import the HOC


import Home from "../pages/Home";
import Tables from "../pages/Tables";
import Users from "../pages/Users";
import Run from "../pages/Run";
import View from "../pages/View";
import Edit from "../pages/Edit";
import Formlist from "../pages/Formlist";
import Form from "../pages/Form";
import Login from "../pages/Login";

import { isAuthenticated } from '../components/Auth';
import { failedAuth } from '../components/Auth';
import { logout } from '../components/Auth';

//  const logout = () => {
//    console.log("Logout");
//    localStorage.removeItem("authToken");
//    localStorage.removeItem("admin");
//    window.location.reload();
//  }

export const NavBar = () => {

	//isAuthenticated();

  useEffect(() => {
    // Check authentication status when the component mounts
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
			isAuthenticated();

    };

    checkAuthStatus();
  }, []);

	return (


	<nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
  <div className="container-fluid">







	{isAuthenticated() ? (


<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img
        src="http://orgchaos.co:3000/logo.png"
        height="60"
        alt="Logo"
        loading="lazy"
      />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {isAuthenticated() ? (
        <>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Forms</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Tables">Tables</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Users">Users</a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>
            <a className="nav-link" href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </>
      ) : (
        <>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Organized Chaos</a>
            </li>
          </ul>
        </>
      )}
    </div>
  </div>
</nav>



	) : (


<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img
        src="http://orgchaos.co:3000/logo.png"
        height="60"
        alt="Logo"
        loading="lazy"
      />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {isAuthenticated() ? (
        <>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          </ul>

          <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>
            <a className="nav-link" href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </>
      ) : (
        <>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Organized Chaos</a>
            </li>
          </ul>
        </>
      )}
    </div>
  </div>
</nav>


	)}







  </div>
	</nav>

	);


};

const NoMatch = () => (
  <>
    <h1>404</h1>
  </>
);


// Wrap all components that require authentication with `withAuth`
const ProtectedHome = withAuth(Home);
const ProtectedTables = withAuth(Tables);
const ProtectedView = withAuth(View);
const ProtectedUsers = withAuth(Users);
const ProtectedRun = withAuth(Run);
const ProtectedEdit = withAuth(Edit);
const ProtectedFormlist = withAuth(Formlist);
const ProtectedForm = withAuth(Form);



const Content: React.FC = (): React.ReactElement => (
  <>
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedHome />} />
      <Route path="/Tables" element={<ProtectedTables />} />
      <Route path="/Tables/View/:id" element={<ProtectedView />} />
      <Route path="/Users" element={<ProtectedUsers />} />
      <Route path="/run/:id" element={<ProtectedRun />} />
      <Route path="/edit/:id" element={<ProtectedEdit />} />
      <Route path="/formlist/:id" element={<ProtectedFormlist />} />
      <Route path="/form/:id/:formid" element={<ProtectedForm />} />
      <Route element={<NoMatch />} />

    </Routes>
  </>
);

export default Content;
