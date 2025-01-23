import React, { useEffect, useState } from "react";
import { useReduxDispatch } from "../redux";
import { gettablename } from "../redux/tables";
import Loading from "../components/Loading";

import TableView from "../components/TableView";


const View = (params: { id: string }): React.ReactElement => {
  const dispatch = useReduxDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableName, setTableName] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultsAction = await dispatch(gettablename(params.id));
        const data = resultsAction?.payload;

				console.log('view', params.id, data);

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
        <div><TableView tableName={tableName} /></div>
      ) : (
        <div>No table name found for this ID.</div>
      )}
    </div>
	);
};

export default View; 
