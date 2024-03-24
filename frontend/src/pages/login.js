import "../styles/login.scss";
import React, { useState } from "react";
import axios from "axios";


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Cookies from "universal-cookie";
const cookies = new Cookies();
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MUI compnent reworked
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage(props) {

  const { dispatch, state } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/login`, { email, password });


      // Set a cookie with the value of the user
      cookies.set("user_id", response.data.userId, { path: "/" });
      cookies.set("email", response.data.email, { path: "/" });
      cookies.set("user_name", response.data.username, { path: "/" });
      // Change login state to true
      dispatch({ type: "SET_LOGIN_STATE" });
      window.location.reload();
    } catch (error) {

      alert("Login failed!");
    }
  };

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newId, setNewId] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleLogout = () => {
    // Dispatch an action to reset the login state
    dispatch({ type: "SET_LOGIN_STATE" });
    cookies.remove("user_id");
    cookies.remove("email");
    cookies.remove("user_name");
  };

  const handleChangeEmail = async () => {
    try {
      const user_id = cookies.get("user_id");

      // Make an HTTP request to change the email
      const response = await axios.put(`/login`, {
        email: newEmail, id: user_id
      });

      alert("Email changed successfully!");
    } catch (error) {
      console.error("Error changing email:", error);
      alert("Failed to change email. Please try again.");
    }
  };

  const handleChangeUsername = async () => {
    try {
      const user_id = cookies.get("user_id");

      // Make an HTTP request to change the email
      const response = await axios.put(`/login`, {
        username: newUsername, id: user_id
      });

      alert("Username changed successfully!");
    } catch (error) {
      console.error("Error changing email:", error);
      alert("Failed to change email. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    try {

      const user_id = cookies.get("user_id");

      // Make an HTTP request to change the password
      const response = await axios.put(`/login`, {
        password: newPassword, id: user_id
      });

      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    }
  };


  const handleDelete = async () => {
    try {
      const user_id = cookies.get("user_id");

      // Make an HTTP request to delete the user account
      const response = await axios.delete(`/register`, {
        data: { id: user_id } // Include the user ID in the request body
      });

      alert("User deleted successfully!");
      handleLogout(); // Log out the user after deleting the account
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };













  const user_id = cookies.get("user_id");
  const user_email = cookies.get("email");

  if (!user_id) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
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
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>

                  </Grid>
                  <Grid item>
                    <Link href="/sign-up" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

    );
  } else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Manage your account
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter a new email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                />
                <Button
                  onClick={handleChangeEmail}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}

                >Change Email</Button>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Enter a new username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter new username"
                />
                <Button
                  onClick={handleChangeUsername}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}

                >Change Username</Button>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Enter a new password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  onClick={handleChangePassword}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >Change Password</Button>
                <div>Delete account for user #{user_id}</div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="id"
                  label="Input account ID to delete your account"
                  type="text"
                  id="id"
                  autoComplete="current-password"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  placeholder="Input account ID to delete your account"
                />
                <Button
                  onClick={handleDelete}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >Delete Account Permanently</Button>


                <Grid container>
                  <Grid item xs>

                  </Grid>
                  <Grid item>

                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>);
  }
}
