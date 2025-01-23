import { useState } from "react";
import { useParams } from "react-router";
import Formlist from "../components/Formlist";
import EditResult from "../components/EditResult";
const Result = () => {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  if (!id) {
    return <div>Missing id parameter</div>;
  }

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };
  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  return (
			<div className="container mt-5">
      <div className="position-end">
        <button className="sjs-button sjs-add-btn" onClick={handleEditClick}>
          {isEditMode ? "Cancel Editing" : "Edit Result"}
        </button>
      </div>
      <div className="sjs-results-container">
        {isEditMode ? (
          <EditResult id={id} onCancel={handleCancelClick} />
        ) : (
          <Formlist id={id} />
        )}
      </div>
      </div>
  );
};

export default Result;
