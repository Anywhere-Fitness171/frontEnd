import React, { useState } from 'react';
import './Login-stylesheet.css';
import axios from 'axios';
import {axiosWithAuth} from '../helpers/axiosWithAuth'; 
import {useHistory} from 'react-router-dom';




export default function LoginForm() {
  // const [form, setForm] = useState(loginForm)
  let history = useHistory();
  const loginForm = {
    username: "",
    password: ""
  }
  
  const [login, setLogin] = useState(loginForm);

  const onChange = event => {
    const {name, value} = event.target
    setLogin({...login, [name]: value})
  }

  const onSubmit = event => {
    event.preventDefault()
    const newLogin = {username:login.username.trim(),password:login.password.trim()}
    axios.post("https://anywhere-fitness-171.herokuapp.com/api/users/login/", newLogin)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('anywhere-fitness-token',response.data.token);
        localStorage.setItem('anywhere-fitness-userid',response.data.userId);
        axiosWithAuth().get(`/users/${response.data.userId}`)
          .then((response) => {
            localStorage.setItem('user-type',response.data.role);
            setLogin(loginForm);
            history.push('/class');
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  let headerImg = null;
    return (
        <div className="Login">
          <header className="Login-header">
            <h1>Login</h1>
            <img src={headerImg} alt="gym lobby" />
          </header>

          <form onSubmit={onSubmit}>
            <div className="Login-inputs">
              <label>
                Username
                  <input 
                  type="text"
                  name="username"
                  value= {login.username}
                  onChange = {onChange}
                  />
              </label>
              <label>
                Password
                  <input 
                  type="password" 
                  name="password"
                  value= {login.password}
                  onChange = {onChange}
                  />
              </label>
            </div>
            <div className="submit-button">
              <button>Submit</button>
            </div>
          </form>
        </div>
      );
}

