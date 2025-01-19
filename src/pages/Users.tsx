import React, { useEffect, useState } from "react";
import Users from "../components/Users";
import Admin from "../components/Admin";

const Userpage = () => {
	const isAdmin = localStorage.getItem("admin") === "1";

	return (
			<div className="container mt-5">
			<h1 className="text-center">{isAdmin ? "Users" : "Users"}</h1>
			<div>
			<Users />
			</div>
			</div>
			);
};

export default Userpage;
