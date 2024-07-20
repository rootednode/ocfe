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
		const url = `http://10.254.0.6:8099/api/collection/login`;

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
						history('/'); // Uncomment to redirect to home on successful login
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
								<div>
										<label>Username:</label>
										<input
												type="text"
												value={username}
												onChange={(e) => setUsername(e.target.value)}
										/>
								</div>
								<div>
										<label>Password:</label>
										<input
												type="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
										/>
								</div>
								<button type="submit">Login</button>
						</form>
				</div>
		);
};

export default Login;

