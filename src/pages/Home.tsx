import React, { useEffect, useState } from "react";
import Surveys from "../components/Surveys";
import Admin from "../components/Admin";

const Home = () => {
	const isAdmin = localStorage.getItem("admin") === "1";

	return (
			<div className="container mt-5">
			<h1 className="text-center">{isAdmin ? "Forms" : "Types"}</h1>
			{isAdmin ? (
					<div>
					<Admin />
					</div>
					) : (
						<Surveys />
						)}
			</div>
			);
};

export default Home;
