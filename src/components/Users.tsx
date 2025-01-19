import React, { useEffect, useState } from "react";
import { create, load, remove } from "../redux/users";
import { useReduxDispatch, useReduxSelector } from "../redux";
import { Link } from "react-router-dom";

import {Slide, toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomModal from './SetPasswordModal';

import "./Surveys.css";
import "./Tables.css";




const Users = (): React.ReactElement => {
  const users = useReduxSelector((state) => state.users.users);
  const dispatch = useReduxDispatch();
  const postStatus = useReduxSelector((state) => state.users.status);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserAdmin, setNewUserAdmin] = useState<boolean>(false);
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(load());
    }
  }, [postStatus, dispatch, users]);







  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');

  const openModalWithContent = (content: string) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };










  const createUser = async () => {

    try {
      await dispatch(create({ newUserName, newUserPassword, newUserAdmin }));
      setNewUserName("");
      setNewUserPassword("");
      setNewUserAdmin(false);
    } catch (error) {
		
    } finally {
			toast.success('User added successfully!');
    }


  }


  return (
<>
  {users.length ? (
    <div className="table-responsive table-container">
      <table className="table table-bordered table-striped">
        <thead>
          <tr className="bg-secondary text-white text-center">
            <th>ID</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <button
                  className="btn btn-primary me-3"
									onClick={() => openModalWithContent(user.id)}
                >
                  Set Password
                </button>


                <button
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch(remove(user.id));
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>No users available</div>
  )}



<div className="container mt-5">
  <div className="row">
    <div className="col-md-6 offset-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Create User</h5>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="form2Example31"
              onChange={(e) => setNewUserAdmin(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="form2Example31">
              Admin
            </label>
          </div>
          <button
            className="btn btn-primary"
            onClick={createUser}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  </div>

</div>

<ToastContainer />

      <button onClick={() => openModalWithContent('1')}>1</button>
      <button onClick={() => openModalWithContent('2')}>2</button>

      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        content={modalContent}
      />


    </>
  );
};

export default Users;