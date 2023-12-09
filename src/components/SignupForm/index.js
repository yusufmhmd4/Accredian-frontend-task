import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import './index.css';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, updateIsError] = useState(false);
  const [errMsg, updateErrMsg] = useState('');

  const navigate = useNavigate();
  
  const submitDetails = async () => {
    if (password !== confirmPassword) {
      updateIsError(true);
      updateErrMsg('Password must be the same');
      return;
    }
  
    const userDetails = {
      username,
      email,
      password,
    };
  
    const apiurl = 'https://nodep1-production.up.railway.app/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };
  
   
      const fetchDetails = await fetch(apiurl, options);
  
      if (fetchDetails.ok) {
        updateIsError(false);
        updateErrMsg('');
        const response = await fetchDetails.text();
        console.log(response);
        
        alert(`${response} Login Now!`)
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        navigate("/login")
      } else {
        const response = await fetchDetails.text();
        updateIsError(true);
        updateErrMsg(response);
      }
   
  };
    const handleSubmit = async (event) => {
    event.preventDefault();
    submitDetails();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Typography variant="h4" align="center" margin={2}>
        Sign Up
      </Typography>
      <TextField
        required
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        required
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        required
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        required
        label="Confirm Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        margin="normal"
        color="primary"
        fullWidth
        style={{ margin: '20px 0' }}
      >
        Sign Up
      </Button>
      {isError && (
        <Typography
          variant="body4"
          align="start"
          className="error-msg"
          color="danger"
          style={{ marginTop: '4px', color: 'red' }}
        >
          *{errMsg}
        </Typography>
      )}
      <Typography
        variant="body2"
        align="center"
        style={{ margin: '20px 0' }}
      >
        Already have an account?{' '}
        <Link to="/login" className="login-text">
          Login
        </Link>
      </Typography>
    </form>
  );
};

export default SignupForm;
