import React, { useEffect, useState } from "react";
import { create, load, remove } from "../redux/surveys";
import { useReduxDispatch, useReduxSelector } from "../redux";
import { Link } from "react-router-dom";

import {Slide, toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    } catch (error) {
			toast.error('Form failed to add!');
    } finally {
      setNewSurveyTitle("");
      setNewSurveyDescription("");
			toast.success('Form added successfully!');
    }


  }

  return (
    <>
      {surveys.length ? (
    		<div className="table-responsive table-container">
	      <table className="table table-bordered table-striped">
          <thead>
          	<tr className="bg-secondary text-white text-center">
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
          		<tr key={index} className="bg-secondary text-white text-center">
                <td>
                  <span>{survey.id}</span>
                </td>
                <td>
                  <span>{survey.title}</span>
                </td>
                <td>
                  <Link className="btn btn-primary me-1" to={"run/" + survey.id}>
                    <span>Run</span>
                  </Link>
                  <Link className="btn btn-primary me-1" to={"/edit/" + survey.id}>
                    <span>Edit</span>
                  </Link>
                  <Link className="btn btn-primary me-3" to={"formlist/" + survey.id}>
                    <span>Forms</span>
                  </Link>
                  <span
										className="btn btn-danger"
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
				</div>
      ) : (
        <div>
          <h3>No surveys. Please add your survey</h3>
        </div>
      )}



<div className="container mt-5">
  <div className="row">
    <div className="col-md-6 offset-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create Form</h5>
          <div className="form-group">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={newSurveyTitle}
          onChange={(e) => setNewSurveyTitle(e.target.value)}
          placeholder="Title"
          className="form-control"
          id="title"
        />
          </div>
          <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          name="description"
          value={newSurveyDescription}
          onChange={(e) => setNewSurveyDescription(e.target.value)}
          id="description"
          className="form-control"
          cols={100}
          rows={5}
          placeholder="Description"
        ></textarea>

          </div>

      <button
        className="btn btn-primary"
        onClick={createSurvey}
      >
        Add Form
      </button>

        </div>
      </div>
    </div>
  </div>
</div>

<ToastContainer />


    </>
  );
};

export default Admin;
