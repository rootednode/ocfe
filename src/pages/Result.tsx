import { useState } from "react";
import { useParams } from "react-router";
import View from "../components/View";
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
    <>
      <div className="position-end">
        <button className="sjs-button sjs-add-btn" onClick={handleEditClick}>
          {isEditMode ? "Cancel Editing" : "Edit Result"}
        </button>
      </div>
      <div className="sjs-results-container">
        {isEditMode ? (
          <EditResult id={id} onCancel={handleCancelClick} />
        ) : (
          <View id={id} />
        )}
      </div>
    </>
  );
};

export default Result;
