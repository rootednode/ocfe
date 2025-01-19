import React, { useEffect, useState } from "react";
import { create, load, remove } from "../redux/surveys";
import { useReduxDispatch, useReduxSelector } from "../redux";
import { Link } from "react-router-dom";
import "./Surveys.css";
import "./Tables.css";

const Surveys = (): React.ReactElement => {
  const surveys = useReduxSelector((state) => state.surveys.surveys);
  const dispatch = useReduxDispatch();
  const postStatus = useReduxSelector((state) => state.surveys.status);
  const [newSurveyTitle, setNewSurveyTitle] = useState("");
  const [newSurveyDescription, setNewSurveyDescription] = useState("");
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(load());
    }
  }, [postStatus, dispatch, surveys]);


  return (
    <>
      {surveys.length ? (
    		<div className="table-responsive">
	      <table className="table table-bordered table-striped">
          <thead>
          	<tr className="bg-secondary text-white text-center">
              <th>Title</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
          		<tr key={index} className="bg-secondary text-white text-center">
                <td>
                  <span>{survey.title}</span>
                </td>
                <td>
                  <Link className="btn btn-primary" to={"run/" + survey.id}>
                    <span>Run</span>
                  </Link>
                </td>
                <td>
                  <Link className="btn btn-primary" to={"result/" + survey.id}>
                    <span>Result</span>
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
				</div>
      ) : (
        <div>
          <h3>No surveys. Please add your survey</h3>
        </div>
      )}

    </>
  );
};

export default Surveys;
