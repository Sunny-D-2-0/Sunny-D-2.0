import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Box,
	Typography,
	Avatar,
} from '@material-ui/core';

const styles = {
	paper: {
		marginTop: '8px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: '3px',
	},
	submit: {
		margin: '3px 0 2px',
	},
};

const Login = ({username, setUsername, setDisplayName, setUser}) => {
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
		const user = await fetch('/api/login', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }});
		if (user.status === 400) alert('incorrect info')
		else {
			const json = await user.json()
			setUser(json);
			setDisplayName(json.name);
			console.log('response: ', json)
			nav('/home')
		}

	};

	const handleSignUp = (event) => {
		event.preventDefault();
		const body = JSON.stringify({
			username,
			password,
			name
		})
		fetch('/api/signup', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }})
	};

	const handleSignUpClick = () => {
		setIsSigningUp(true); // Display sign up form on click
	};

	const handleCancelClick = () => {
		setIsSigningUp(false); // Display login form on cancel click
	};

	return (
		<div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<CssBaseline />
			<div style={styles.paper}>
				<Typography component="h1" variant="h5">
					{isSigningUp ? 'Sign up' : 'Sign in'}
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
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
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
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
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