import React, { useEffect, useState } from "react";
import { create, load, remove } from "../redux/surveys";
import { useReduxDispatch, useReduxSelector } from "../redux";
import { Link } from "react-router-dom";
import "./Surveys.css";

const Admin  = (): React.ReactElement => {
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

  const createSurvey = async () => {

    try {
      await dispatch(create({ newSurveyTitle, newSurveyDescription }));
      setNewSurveyTitle("");
      setNewSurveyDescription("");
    } catch (error) {
    } finally {
    }


  }

  return (
    <>
      {surveys.length ? (
        <table className="sjs-surveys-list">
          <thead>
            <tr style={{ backgroundColor: "grey" }}>
              <th>Title</th>
              <th>ID</th>
              <th colSpan={4}>Action</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr key={index} className="sjs-surveys-list__row">
                <td>
                  <span>{survey.title}</span>
                </td>
                <td>
                  <span>{survey.id}</span>
                </td>
                <td>
                  <Link className="sjs-button" to={"run/" + survey.id}>
                    <span>Run</span>
                  </Link>
                </td>
                <td>
                  <Link className="sjs-button" to={"edit/" + survey.id}>
                    <span>Edit</span>
                  </Link>
                </td>
                <td>
                  <Link className="sjs-button" to={"result/" + survey.id}>
                    <span>Result</span>
                  </Link>
                </td>

                <td>
                  <span
                    className="sjs-button sjs-remove-btn"
                    onClick={() => {
                      dispatch(remove(survey.id));
                    }}
                  >
                    Remove
                  </span>
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

      <div className="sjs-surveys-list__footer">
          <div className="sjs-survey-title">
            <div>
              <input
                type="text"
                name="title"
                value={newSurveyTitle}
                onChange={(e) => setNewSurveyTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <button
              className="sjs-button sjs-add-btn"
              onClick={createSurvey}
            >
              Add Survey
            </button>
          </div>
          <div>
            <textarea
              name="description"
              value={newSurveyDescription}
              onChange={(e) => {
                setNewSurveyDescription(e.target.value);
              }}
              id="description"
              cols={100}
              rows={5}
              placeholder="Description"
            ></textarea>
          </div>
      </div>
    </>
  );
};

export default Admin;
