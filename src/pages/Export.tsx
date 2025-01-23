import { useState } from "react";
import { useParams } from "react-router";
import Export from "../components/Export";
const Result = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Missing id parameter</div>;
  }

  return (
			<div className="container mt-5">
      <div className="position-end">
      </div>
      <div className="sjs-results-container">
          <Export id={id} />
      </div>
      </div>
  );
};

export default Result;
