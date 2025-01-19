// src/pages/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Optional, for styling
											//import axios from 'axios';

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';


const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const history = useNavigate();


	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		setError('');

		// Assume `username` and `password` are state variablesi
		const url = `http://orgchaos.co:3001/api/collection/login`;

		try {
			const response: AxiosResponse<{ token: string, admin: string }> = await axios.post(url, {username, password});

			console.log('login:');
			console.log(response.data);
			console.log(response.data['token']);
			console.log(response.data['admin']);

			if (response.status === 200 && response.data['token'] != null) {
				var authtoken = response.data['token'];
				var admin = response.data['admin'];

				localStorage.setItem('authToken', authtoken); // Store the token in local storage
				localStorage.setItem('admin', admin); // Store the token in local storage
				//history.go();
				//document.location.reload();
				//history('/'); // Uncomment to redirect to home on successful login
				window.location.href = '/'; 
				console.log('logged in!');

			} else {
				setError('Invalid credentials');
			}
		} catch (err) {
			console.error('Login error:', err);
			if (axios.isAxiosError(err)) {
				// Handle Axios-specific errors
				if (err.response) {
					setError(`Login failed: ${err.response.data.message || 'Invalid credentials'}`);
				} else if (err.request) {
					setError('Login failed: No response from server');
				} else {
					setError(`Login failed: ${err.message}`);
				}
			} else {
				setError('Login failed: An unknown error occurred');
			}
		}



	};


	return (









			<div className="login-container">

			<h2>Login</h2>


			<form onSubmit={handleLogin}>

			<div data-mdb-input-init className="form-outline mb-4">
			<input type="text" id="form2Example1" className="form-control"
			value={username}
			onChange={(e) => setUsername(e.target.value)}
			placeholder=""
				/>
				<label className="form-label" htmlFor="form2Example1">Username</label>
				</div>

				<div data-mdb-input-init className="form-outline mb-4">
				<input type="password" id="form2Example2" className="form-control"
				value={password}
			onChange={(e) => setPassword(e.target.value)}
			/>
				<label className="form-label" htmlFor="form2Example2">Password</label>
				</div>

				<div className="row mb-4">
				<div className="col d-flex justify-content-center">
				<div className="form-check">
				<input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
				<label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
				</div>
				</div>

				<div className="col">
				<a href="#!">Forgot password?</a>
				</div>
				</div>

				<button  type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>

				</form>


				</div>




				);
};

export default Login;

