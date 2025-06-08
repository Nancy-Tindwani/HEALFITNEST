import React, { useContext, useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import { Alert, Snackbar, Typography } from '@mui/material';
import { Button, Link } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = 'http://localhost:8989/api';
const data = {
  email: '',
  password: ''
}

const Login = () => {

  const paperStyle = { padding: 20, height: '75vh', width: 320, margin: '0' }
  const avtstyle = { backgroundColor: 'rgb(15 155 66)' }
  const btstyle = { margin: '10px 0', backgroundColor: '#39c06b' }
  const psstyle = { margin: '15px auto' }

  const [user, setUser] = React.useState(data);
  const [severity, setSeverity] = React.useState('success');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = () => {
    // validate2();
    console.log(user);
    setOpen(true);
    axios.post(`${baseUrl}/v2/loginUser`, user).then((response) => {
      console.log("Response", response)
      localStorage.setItem('userId', JSON.stringify(response.data.userId));
      localStorage.setItem('cartId', JSON.stringify(response.data.cartId));
      console.log(JSON.parse(localStorage.getItem('userId')));
      console.log(JSON.parse(localStorage.getItem('cartId')));
      setSeverity('success');
      setMessage("Logged in successfully!!");
      setOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }).catch(error => {
      if (!error.response) {
        console.log('Error: Network Error');
      } else {
        setSeverity('warning');
        setMessage("Invalid Login credentials!!");
        setOpen(true);
        console.log(error.response);
      }
    })

  }

  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={600} >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

      <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avtstyle}><LockIcon /></Avatar>
            <h2>Log In</h2>
          </Grid>

          <TextField
            required
            id="email"
            label="Email id"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
          />
          <small id="email_error" color='red'></small>
          <TextField
            required id="password"
            label="Password"
            type='password'
            name="password"
            value={user.password}
            onChange={handleChange}
            style={psstyle} fullWidth />
          <small id="password_error" color='red'></small>
          <Button variant="contained" type='submit' onClick={handleSubmit} style={btstyle} fullWidth>Log In</Button>
          <Typography> Don't have an account?
            <Link href="/signup">Sign Up</Link>
          </Typography>


        </Paper>
      </Grid>
    </div>
  )
}
export default Login;