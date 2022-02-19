import {Registration} from './auth/Registration';
import React from 'react'
import { Login } from './auth/Login';
import { Logout } from './auth/Logout';


const Home = (props) => {

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    props.history.push("/dashboard");
  }

  const checkLoginStatus = () => {
    props.checkLoginStatus();
  }

  return (
    <>
      <h1>Status: {props.loggedInStatus}</h1>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth}/>
      <Login handleSuccessfulAuth={handleSuccessfulAuth}/>
      <Logout checkLoginStatus={checkLoginStatus}/>
    </>
  )
}

export default Home

