import { useState } from "react";
import { useParams } from "react-router";
import View from "../components/View";
const Result = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Missing id parameter</div>;
  }


  return (
    <>
      <div className="position-end">
      </div>
      <div className="sjs-results-container">
          <View id={id} />
      </div>
    </>
  );
};

export default Result;
