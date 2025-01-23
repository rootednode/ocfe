import React, { useEffect, useState } from "react";
import { useReduxDispatch } from "../redux";
import { gettablename, exp } from "../redux/tables";
import Loading from "../components/Loading";

const Export = (params: { id: string }): React.ReactElement => {
	const dispatch = useReduxDispatch();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [tableName, setTableName] = useState<string | null>(null);

	useEffect(() => {
			const fetchData = async () => {
			try {
			const resultsAction = await dispatch(gettablename(params.id));
			const data = resultsAction?.payload;

			console.log("view", params.id, data);


			if (data?.tableName) {
			setTableName(data.tableName);


			} else {
			setError("Table name not found.");
			}

			} catch (error) {
			console.error(error);
			setError("Failed to load result IDs. Please try again later.");
			} finally {
				setLoading(false);
			}
			};

			fetchData();
	}, [dispatch, params.id]);

	const handleDownloadCsv = async () => {
		if (!tableName) return;

		try {
			// Fetch the CSV file from the server
			const response = await dispatch(exp(tableName));
			//      const response = await fetch(`/api/tables/export/${tableName}`);
			console.log('export', response);



			try {


				// Extract the payload array
				const data = response.payload;

				// Check if data is valid
				if (!Array.isArray(data) || data.length === 0) {
					throw new Error("No data available to export.");
				}



// Generate CSV content
const headers = Object.keys(data[0]).slice(1); // Exclude the first key from the headers
const csvContent = [
  headers.join(","), // Join headers into a single comma-separated string
  ...data.map(row => {
    return headers.map(field => 
      `"${(row[field] || "").toString().replace(/"/g, '""')}"`
    ).join(",");
  })
].join("\n");

console.log(csvContent);


				const fileName = `${tableName}.csv`; // Append .csv to tableName



				// Create a blob and object URL
				const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
				const url = URL.createObjectURL(blob);

				// Create a temporary anchor element
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", fileName); // Set the file name
				document.body.appendChild(link); // Append it to the body

				// Trigger the download
				link.click();

				// Clean up: remove the link and revoke the object URL
				document.body.removeChild(link); // Ensure it is appended before removing
				URL.revokeObjectURL(url);




				//  link.setAttribute("download", fileName); // Name of the file
				//  document.body.appendChild(link);
				//  link.click();

				// Clean up
				//  document.body.removeChild(link);
				// URL.revokeObjectURL(url);
			} catch (err) {
				console.log('error', err);
			}








		} catch (err) {
			console.error(err);
			setError("Failed to download CSV. Please try again later.");
		}
	};

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <div className="error">{error}</div>;
	}

	return (
			<div>
			<h1>Tables - {tableName}</h1>
			{tableName ? (
					<div>
					<button onClick={handleDownloadCsv}>Download CSV</button>
					</div>
					) : (
						<div>No table name found for this ID.</div>
						)}
			</div>
			);
};

export default Export;

