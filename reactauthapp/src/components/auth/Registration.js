import React from 'react';
import {useState} from 'react';
import axios from 'axios';

export const Registration = (props) => {
  
  const initialState = {
    email: "",
    password: "",
    password_confirmation: "",
    registrationErrors: ""
  }

  const [userinfo, setUserinfo] = useState(initialState)
  
  // const handleSubmit = () => {
  //   const sendData = async () => await axios.post('http://localhost:3001/registrations', {user: userinfo}, {withCredentials: true});
  //   const result = sendData();
  //   result.then(res => console.log(res.data))
  // }
  
  const handleSubmit = () => {
    axios.post('http://localhost:3001/registrations', {user: userinfo}, {withCredentials: true})
    .then((res) => {
      if (res.data.status === 'created') {
        props.handleSuccessfulAuth(res.data);
      }
    })
    .catch(e => {
      console.log("registration error", e);
    })
  }
  
  const HandleChange = (event) => {
    setUserinfo({...userinfo, [event.target.name]: event.target.value})
  }
  // const passwordHandleChange = (event) => {
  //   setUserinfo({...userinfo, password: event.target.value})
  //   // setUserinfo({password: event.target.value})
  // }
  // const passwordConfirmationHandleChange = (event) => {
  //   setUserinfo({...userinfo, password_confirmation: event.target.value})
  //   // setUserinfo({password_confirmation: event.target.value})
  // }
  
  return (
    <>
      <div>
        <input type="email" name="email" placeholder="Email" value={userinfo.email} onChange={HandleChange} required></input>
        <input type="password" name="password" placeholder="Password" value={userinfo.password} onChange={HandleChange} required></input>
        <input type="password" name="password_confirmation" placeholder="Password Confirmation" value={userinfo.password_confirmation} onChange={HandleChange} required></input>
        <button onClick={() => {handleSubmit()}} type='submit'>Register</button>
      </div>
    </>
  );
};

