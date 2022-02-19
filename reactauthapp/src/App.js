import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const userInitialState = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {}
  }

  const [user, setUser] = useState(userInitialState);
  
  const checkLoginStatus = () => {
    axios.get("http://localhost:3001/logged_in", {withCredentials: true})
    .then(res => {
      if (res.data.logged_in && user.loggedInStatus === "NOT_LOGGED_IN") {
        setUser({
          loggedInStatus: "LOGGED_IN",
          user: res.data.user
        })
      } else if (!res.data.logged_in && user.loggedInStatus === "LOGGED_IN") {
        setUser({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(e => {
      console.error(e);
    })
  }

  const handleLogin = (data) => {
    setUser({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  checkLoginStatus();

  return (
    <div className='app'>
      <BrowserRouter>
        <Switch>
          <Route
            exact 
            path={"/"} 
            render={props => (
              <Home {...props} handleLogin={handleLogin} checkLoginStatus={checkLoginStatus} loggedInStatus={user.loggedInStatus} />
            )}
           />
          <Route 
            exact 
            path={"/dashboard"} 
            render={props => (
              <Dashboard {...props} loggedInStatus={user.loggedInStatus} />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
