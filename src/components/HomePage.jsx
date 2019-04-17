import React from 'react'
import './main.css'
import Login from './auth/Login'
import { withRouter } from 'react-router-dom';


const Homepage = (props) => {
  const backgroundImage = "linear-gradient(135deg, rgba(158, 46, 124, 0.1) 0%," +
    "rgba(90, 199, 85, 0.15) 50%), url(" + require("../assets/backpack.jpg") + ")";
  return (
    <div style={{ backgroundImage }} className="banner" id="main-img">
      <h1> Backpacking </h1>
      <h3> Your ultimate dream</h3>
      <Login/>
    </div>
  )
}

export default withRouter(Homepage)
