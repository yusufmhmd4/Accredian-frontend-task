// App.js
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import LoginForm from './components/LoginForm'; // Adjust the path accordingly
import SignupForm from "./components/SignupForm"
import "./App.css"

const App = () => {
  return (
    <div className='app-container'>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<LoginForm/>}/>
        <Route exact path="/sign-up" element={<SignupForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
