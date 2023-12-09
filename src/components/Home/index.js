import React from 'react'
import Cookies from "js-cookie"
import { Typography, Button } from '@mui/material'
import { Navigate ,useNavigate} from 'react-router-dom'

function Home() {
  const navigate=useNavigate()

  const onClickLogOutButton=()=>{
    Cookies.remove("name")
    navigate("/login")
    
  }

  const name = Cookies.get("name")
  if (!name) {
    return <Navigate to="/login" />
  }
  return (
    <div className='home-container'>
      <Button
        type="button"
        variant="contained"
        margin="normal"
        color="primary"
       style={{position:"absolute",top:20,right:20}}
       onClick={onClickLogOutButton}
      >
        Logout
      </Button>
      <Typography variant="h4" align="center">Hello, {Cookies.get("name").toUpperCase()}</Typography>
    </div>
  )
}

export default Home
