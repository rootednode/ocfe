import { useState } from "react";
import { useParams } from "react-router";
import Form from "../components/Form";
const Result = () => {
  const { id, formid } = useParams();
  if (!id) {
    return <div>Missing id parameter</div>;
  }
  if (!formid) {
    return <div>Missing id parameter</div>;
  }


  return (
    <>
      <div className="position-end">
      </div>
			<h2>Form {formid}</h2>
      <div className="sjs-results-container">
          <Form id={id} formid={formid} />
      </div>
    </>
  );
};

export default Result;
