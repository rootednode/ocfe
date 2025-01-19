import React, { useEffect, useState } from "react";
import { create, imp, load, remove } from "../redux/tables";
import { useReduxDispatch, useReduxSelector } from "../redux";
import { Link } from "react-router-dom";

import {Slide, toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./Surveys.css";
import "./Tables.css";

const TableList  = (): React.ReactElement => {
	const tables = useReduxSelector((state) => state.tables.modules);
	const dispatch = useReduxDispatch();
	const postStatus = useReduxSelector((state) => state.tables.status);
	const [newModuleTitle, setNewModuleTitle] = useState("");
	const [newModuleDescription, setNewModuleDescription] = useState("");


	useEffect(() => {
			if (postStatus === "idle") {
			dispatch(load());
			}
			}, [postStatus, dispatch, tables]);


	const importModule = () => {

		console.log('import');

		// Trigger the file selector programmatically
		const fileInput = document.getElementById("fileInput") as HTMLInputElement;
		if (fileInput) {
			fileInput.click();
		}
	};



	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log("handleFileChange");
		const file = event.target.files?.[0];

		if (file) {

			try {

				console.log(file);
				await dispatch(imp({ file: file }));

				toast.success("File uploaded successfully!");
			} catch (error) {
				console.error("Error uploading file:", error);
				toast.error("Failed to upload file!");
			}
		} else {
			toast.error("No file selected!");
		}
	};



	const createModule = async () => {

		try {
			await dispatch(create({ newModuleTitle, newModuleDescription }));

		} catch (error) {
			toast.error('Form failed to add!');
		} finally {
			setNewModuleTitle("");
			setNewModuleDescription("");
			toast.success('Form added successfully!');
		}


	}

	console.log('TABLES', tables);

	return (
			<>
			{tables.length ? (
					<div className="table-container table-responsive">
					<table className="table table-bordered table-striped">
					<thead>
					<tr className="bg-secondary text-white text-center">
					<th>ID</th>
					<th>Table Name</th>
					<th>Created At</th>
					<th>Action</th>
					</tr>
					</thead>
					<tbody>
					{tables.map((module, index) => (
								<tr key={index} className="bg-secondary text-white text-center">
								<td>
								<span>{module.id}</span>
								</td>
								<td>
								<span>{module.tableName}</span>
								</td>
								<td>
								<span>{module.createdAt}</span>
								</td>
								<td>
								<Link className="btn btn-primary me-1" to={"/Tables/View/" + module.id}>
								<span>View</span>
								</Link>
								<Link className="btn btn-primary me-1" to={"/editm/" + module.id}>
								<span>Edit</span>
								</Link>
								<Link className="btn btn-primary me-3" to={"/exportm/" + module.id}>
								<span>Export</span>
								</Link>
								<span
								className="btn btn-danger"
								onClick={() => {
								dispatch(remove(module.id));
								}}
								>
									Remove
									</span>
									</td>
									</tr>
									))}
			</tbody>
				</table>
				</div>
				) : (
					<div>
					<h3>No tables found.</h3>
					</div>
					)}



			<div className="container mt-5">
				<div className="row">
				<div className="col-md-6 offset-md-3">


				<input
				type="file"
				id="fileInput"
				onChange={handleFileChange}
				style={{ display: "none" }}
			/>

				<button
				className="btn btn-primary"
				onClick={importModule}
			>
				Import CSV
				</button>
				<br/>
				<br/>


				</div>
				</div>
				</div>

				<ToastContainer />


				</>
				);
};

export default TableList;
