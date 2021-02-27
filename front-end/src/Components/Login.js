import React, { useState, useEffect } from 'react';
import './Login-stylesheet.css'





export default function LoginForm() {
  // const [form, setForm] = useState(loginForm)
  const loginForm = {
    username: "",
    password: ""
  }
  
  const {form, update, submit} = props

  const [login, setLogin] = useState(loginForm);

  const onChange = event => {
    const {name, value} = event.target
    setLogin({...login, [name]: value})
  }

  const onSubmit = event => {
    event.preventDefault()
    const newLogin = {username:login.username.trim(),password:login.password.trim()}
    
  }

  let headerImg = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwynnlocations.com%2Flocation%2Flobby%2Fluma-lobby-gym%2F&psig=AOvVaw29x4eahrk6zrF4jqooXNYj&ust=1614394673148000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiwkvrGhu8CFQAAAAAdAAAAABAJ";    
    return (
        <div className="Login">
          <header className="Login-header">
            <h1>Login</h1>
            <img src={headerImg} alt="gym lobby" />
          </header>

          <form>
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

