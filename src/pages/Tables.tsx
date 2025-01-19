import React, { useEffect, useState } from "react";
import Surveys from "../components/Surveys";
import TableList from "../components/TableList";

const Tables = () => {
	const isAdmin = localStorage.getItem("admin") === "1";

	return (
			<div className="container mt-5">
			<h1 className="text-center">{isAdmin ? "Tables" : "Tables"}</h1>
			<div>
			<TableList />
			</div>
			</div>
			);
};

export default Tables;
