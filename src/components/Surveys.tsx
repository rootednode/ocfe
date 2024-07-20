import React, { useEffect, useState } from "react";
import { create, load, remove } from "../redux/surveys";
import { useReduxDispatch, useReduxSelector } from "../redux";
import { Link } from "react-router-dom";
import "./Surveys.css";
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

  const createSurvey = () => {
    dispatch(
      create({
        newSurveyTitle,
        newSurveyDescription,
      })
    ).then(() => {
      setNewSurveyTitle("");
      setNewSurveyDescription("");
    });

  }

  return (
    <>
      {surveys.length ? (
        <table className="sjs-surveys-list">
          <thead>
            <tr style={{ backgroundColor: "grey" }}>
              <th>Title</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr key={index} className="sjs-surveys-list__row">
                <td>
                  <span>{survey.title}</span>
                </td>
                <td>
                  <Link className="sjs-button" to={"run/" + survey.id}>
                    <span>Run</span>
                  </Link>
                </td>
                <td>
                  <Link className="sjs-button" to={"result/" + survey.id}>
                    <span>Result</span>
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h3>No surveys. Please add your survey</h3>
        </div>
      )}

    </>
  );
};

export default Surveys;
