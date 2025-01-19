 import React, { useEffect, useState } from "react";
import { useReduxDispatch } from "../redux";
import { load_one } from "../redux/results";
import Loading from "../components/Loading";

const View = (params: { id: string }): React.ReactElement => {
  const dispatch = useReduxDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resultIds, setResultIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultsAction = await dispatch(load_one(params.id));
        const data = resultsAction?.payload;

        if (data && Array.isArray(data)) {
          const ids = data.map((item: { id: string }) => item.id);
          setResultIds(ids);
        } else {
          setResultIds([]);
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
			<h1>{params.id}</h1>
      {resultIds.length > 0 ? (
        <ul>
          {resultIds.map((id) => (
            <li key={id}><a href={`/form/${params.id}/${id}`}>{id}</a></li>
          ))}
        </ul>
      ) : (
        <div>No results found for this survey.</div>
      )}
    </div>
  );
};

export default View; 
