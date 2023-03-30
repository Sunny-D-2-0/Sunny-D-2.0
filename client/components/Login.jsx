import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Avatar
} from '@material-ui/core';

import logo from '../images/logo.png'

const styles = {
	paper: {
		marginTop: '8px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		fontFamily: 'Montserrat'
	},
	form: {
		width: '100%',
		marginTop: '3px',
		fontFamily: 'Montserrat'
	},
	submit: {
		margin: '3px 0 2px',
		fontFamily: 'Montserrat'
	},
};

const Login = ({ username, setUsername, setDisplayName, setUser }) => {
	const [password, setPassword] = useState('');
	const [isSigningUp, setIsSigningUp] = useState(false); // Track whether user is signing up or not
	const [name, setName] = useState('');
	const nav = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log('frontend: ' + username, password);
		const body = JSON.stringify({
			username,
			password
		})
		const user = await fetch('/api/login', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } });
		if (user.status === 400) alert('Incorrect info!');
		else {
			const json = await user.json()
			setUser(json);
			setDisplayName(json.name);
			console.log('response: ', json);
			nav('/home');
		}

	};

	const handleSignUp = async (event) => {
		event.preventDefault();
		const body = JSON.stringify({
			username,
			password,
			name
		})
		const res = await fetch('/api/signup', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } })
		const json = await res.json();
		console.log(json)
		if (!json) {
			alert('User already exists');
			return;
		}
		setUser(json);
		setDisplayName(json.name);
		nav('/home')
	};

	const handleSignUpClick = () => {
		setIsSigningUp(true); // Display sign up form on click
	};

	const handleCancelClick = () => {
		setIsSigningUp(false); // Display login form on cancel click
	};

	return (
		<div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20, fontFamily: 'Montserrat' }}>
			<CssBaseline />
			<div style={{...styles.paper, fontFamily: 'Montserrat'}}>
				<img style={{height: 100, width: 'auto'}} src={logo}/>
				<Typography component="h1" variant="h5" style={{fontFamily: 'Montserrat'}}>
					{isSigningUp ? 'Sign Up' : 'Sign In'}
				</Typography>
				{isSigningUp ? (
					<form style={styles.form} onSubmit={handleSignUp}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="name"
							label="Name"
							name="name"
							autoComplete="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="new-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							style={styles.submit}
						>
							Sign up
						</Button>
						<Grid container>
							<Grid item>
								<Link href="#" variant="body2" onClick={handleCancelClick}>
									{'Cancel'}
								</Link>
							</Grid>
						</Grid>
					</form>
				) : (
					<form style={styles.form} onSubmit={handleLogin}>
						<TextField
							variant="outlined"

							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							style={styles.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href="#" variant="body2" onClick={handleSignUpClick}>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				)}
			</div>
		</div>
	);
};

export default Login;