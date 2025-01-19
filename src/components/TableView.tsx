import React, { useEffect, useState } from "react";
import { useReduxDispatch } from "../redux";
import { getTableContents } from "../redux/tables";
import Loading from "../components/Loading";



interface TableViewProps {
  tableName: string; // The name of the table to fetch
}

const TableView: React.FC<TableViewProps> = ({ tableName }) => {
  const dispatch = useReduxDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const resultsAction = await dispatch(getTableContents(tableName));
        console.log("Fetched table data:", resultsAction);



        const data = resultsAction?.payload;


        if (Array.isArray(data)) {
          setRows(data); // Store the rows from the API
        } else {
          setError("Invalid data format received.");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load table contents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [dispatch, tableName]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (rows.length === 0) {
    return <div>No rows found in the table.</div>;
  }

  // Dynamically render table rows and columns
  const columnNames = Object.keys(rows[0]);

  return (
    <div className="table-container table-responsive">
	    <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columnNames.map((colName) => (
              <th key={colName}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columnNames.map((colName) => (
                <td key={colName}>{row[colName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;

