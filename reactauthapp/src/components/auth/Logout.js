import React from 'react';
import {useState} from 'react';
import axios from 'axios';

export const Logout = (props) => {
  
  const handleLogout = () => {
    axios.delete("http://localhost:3001/logout", {withCredentials: true})
    .then(checkLoginStatus)
  }

  const checkLoginStatus = () => {
    props.checkLoginStatus()
  }

  return (
    <button onClick={handleLogout} type='submit' style={{color:'red'}}>Logout</button>
  )
}

