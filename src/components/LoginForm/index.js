import React, { useState } from 'react';
import Cookies from "js-cookie"
import {
  TextField,
  Button,
  Typography,
} from '@mui/material';

import { Link , Navigate, useNavigate  } from "react-router-dom"

import "./index.css"

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, updateIsError] = useState(false)
  const [errMsg, updateErrMsg] = useState('')

  const navigate=useNavigate()

  const submitDetails = async () => {
    const userDetails = {
      usernameOrEmail,
      password,
    };

    const apiurl = `https://nodep1-production.up.railway.app/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const fetchDetails = await fetch(apiurl, options);
    if (fetchDetails.ok === true) {
      updateIsError(false)
      updateErrMsg('')
      const response = await fetchDetails.json()
      console.log(response)
      Cookies.set("name",response.username)
      navigate("/")
    } else {
      const response = await fetchDetails.text()
      
      updateIsError(true)
      updateErrMsg(response)
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    submitDetails()

  };

  if(Cookies.get("name")){
    return <Navigate to="/"/>
  }

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <Typography variant="h4" align="center" margin={2}>Login</Typography>
      <TextField
        required
        label="Username or Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={usernameOrEmail}
        onChange={(event) => setUsernameOrEmail(event.target.value)}
      />
      <TextField
        required
        type="password"
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        margin="normal"
        color="primary"
        fullWidth
        style={{ marginTop: '20px' }}
      >
        Login
      </Button>
      {isError && <Typography variant="body4" align="start" className='error-msg'   color="danger"  style={{ marginTop: '4px' ,color:"red"}}>
        *{errMsg}

      </Typography>}
      <Typography variant="body2" align="center"   style={{ margin: '20px 0' }} >
        Don't have an account?{' '}
        <Link to="/sign-up" className='login-text'>
          SignUp
        </Link>
      </Typography>

    </form>
  );
};

export default LoginForm;
